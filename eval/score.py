#!/usr/bin/env python3
"""Eval harness for lukeinglis.me personal website.

Dimensions:
  Hygiene: tests, lint, type_check, coverage
  Growth: capability_surface, observability

Output format:
    {"results": [{"name": str, "score": float, "weight": float, "passed": bool, "details": str}, ...]}
"""

import json
import os
import re
import subprocess
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent


def run_cmd(cmd: list[str], timeout: int = 120) -> subprocess.CompletedProcess:
    return subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=timeout,
        cwd=PROJECT_ROOT,
    )


def eval_tests() -> dict:
    """Run Vitest unit tests."""
    try:
        result = run_cmd(["npx", "vitest", "run", "--reporter=json"], timeout=120)
        output = result.stdout + result.stderr

        try:
            json_start = output.find("{")
            if json_start >= 0:
                data = json.loads(output[json_start:])
                total = data.get("numTotalTests", 0)
                passed_count = data.get("numPassedTests", 0)
                failed = data.get("numFailedTests", 0)
                if total > 0:
                    score = passed_count / total
                else:
                    score = 0.0
                details = f"{passed_count}/{total} passed, {failed} failed"
                return {
                    "name": "tests",
                    "score": round(score, 3),
                    "weight": 0.2,
                    "passed": failed == 0 and total > 0,
                    "details": details,
                }
        except (json.JSONDecodeError, KeyError):
            pass

        is_pass = result.returncode == 0
        return {
            "name": "tests",
            "score": 1.0 if is_pass else 0.0,
            "weight": 0.2,
            "passed": is_pass,
            "details": output.strip()[-500:],
        }
    except subprocess.TimeoutExpired:
        return {
            "name": "tests",
            "score": 0.0,
            "weight": 0.2,
            "passed": False,
            "details": "Timed out after 120s",
        }


def eval_lint() -> dict:
    """Run ESLint."""
    try:
        result = run_cmd(["npx", "eslint", "."], timeout=120)
        error_lines = [
            ln
            for ln in (result.stdout + result.stderr).splitlines()
            if ln.strip() and ("error" in ln.lower())
        ]
        if result.returncode == 0:
            score = 1.0
        else:
            score = max(0.0, 1.0 - len(error_lines) * 0.1)
        return {
            "name": "lint",
            "score": round(score, 3),
            "weight": 0.15,
            "passed": result.returncode == 0,
            "details": (result.stdout or result.stderr).strip()[-500:],
        }
    except subprocess.TimeoutExpired:
        return {
            "name": "lint",
            "score": 0.0,
            "weight": 0.15,
            "passed": False,
            "details": "Timed out after 120s",
        }


def eval_type_check() -> dict:
    """Run TypeScript type checker."""
    try:
        result = run_cmd(["npx", "tsc", "--noEmit"], timeout=120)
        error_lines = [
            ln
            for ln in (result.stdout + result.stderr).splitlines()
            if "error TS" in ln
        ]
        if result.returncode == 0:
            score = 1.0
        else:
            score = max(0.0, 1.0 - len(error_lines) * 0.05)
        return {
            "name": "type_check",
            "score": round(score, 3),
            "weight": 0.15,
            "passed": result.returncode == 0,
            "details": f"{len(error_lines)} type errors"
            if error_lines
            else "No type errors",
        }
    except subprocess.TimeoutExpired:
        return {
            "name": "type_check",
            "score": 0.0,
            "weight": 0.15,
            "passed": False,
            "details": "Timed out after 120s",
        }


def eval_coverage() -> dict:
    """Check test coverage via Vitest."""
    try:
        result = run_cmd(
            ["npx", "vitest", "run", "--coverage", "--reporter=json"],
            timeout=120,
        )

        coverage_json = PROJECT_ROOT / "coverage" / "coverage-summary.json"
        if coverage_json.exists():
            data = json.loads(coverage_json.read_text())
            total = data.get("total", {})
            lines_pct = total.get("lines", {}).get("pct", 0) / 100
            branches_pct = total.get("branches", {}).get("pct", 0) / 100
            score = (lines_pct + branches_pct) / 2
            details = f"lines={lines_pct:.0%}, branches={branches_pct:.0%}"
        else:
            score = 0.0 if result.returncode != 0 else 0.1
            details = "Coverage report not generated"

        return {
            "name": "coverage",
            "score": round(score, 3),
            "weight": 0.1,
            "passed": score >= 0.3,
            "details": details,
        }
    except subprocess.TimeoutExpired:
        return {
            "name": "coverage",
            "score": 0.0,
            "weight": 0.1,
            "passed": False,
            "details": "Timed out after 120s",
        }


def eval_capability_surface() -> dict:
    """Measure feature surface area: routes, components, API endpoints."""
    app_dir = PROJECT_ROOT / "app"
    if not app_dir.exists():
        return {
            "name": "capability_surface",
            "score": 0.0,
            "weight": 0.25,
            "passed": False,
            "details": "No app/ directory found",
        }

    pages = list(app_dir.rglob("page.tsx")) + list(app_dir.rglob("page.ts"))
    layouts = list(app_dir.rglob("layout.tsx")) + list(app_dir.rglob("layout.ts"))
    api_routes = list(app_dir.rglob("route.ts")) + list(app_dir.rglob("route.tsx"))

    components_dir = PROJECT_ROOT / "components"
    app_components = list(app_dir.rglob("*.tsx"))
    standalone_components = (
        list(components_dir.rglob("*.tsx")) if components_dir.exists() else []
    )
    total_components = len(app_components) + len(standalone_components)

    lib_dir = PROJECT_ROOT / "lib"
    lib_files = list(lib_dir.rglob("*.ts")) if lib_dir.exists() else []

    items = len(pages) + len(layouts) + len(api_routes) + total_components + len(lib_files)
    score = min(1.0, items / 20)

    details = (
        f"pages={len(pages)}, layouts={len(layouts)}, "
        f"api_routes={len(api_routes)}, components={total_components}, "
        f"lib_files={len(lib_files)}"
    )
    return {
        "name": "capability_surface",
        "score": round(score, 3),
        "weight": 0.25,
        "passed": score >= 0.1,
        "details": details,
    }


def eval_observability() -> dict:
    """Analyze observability: structured logging, error boundaries, monitoring."""
    skip = {
        "node_modules",
        ".next",
        ".git",
        ".factory",
        "eval",
        "dist",
        "build",
        "e2e",
    }

    log_patterns = [
        r"\bconsole\.\w+\(",
        r"\blogger\.\w+\(",
    ]
    struct_patterns = [r"\bpino\b", r"\bwinston\b", r"\bstructlog\b"]
    trace_patterns = [r"\bopentelemetry\b", r"trace", r"TraceContext"]

    sources = []
    for ext in ("*.ts", "*.tsx"):
        for f in PROJECT_ROOT.rglob(ext):
            if not any(p in f.parts for p in skip):
                sources.append(f)

    total_files = len(sources)
    logged_files = 0
    has_struct = False
    has_trace = False
    total_log = 0

    for src in sources:
        try:
            code = src.read_text(errors="replace")
        except OSError:
            continue

        file_has_log = False
        for pat in log_patterns:
            matches = re.findall(pat, code)
            total_log += len(matches)
            if matches:
                file_has_log = True
        if file_has_log:
            logged_files += 1

        for pat in struct_patterns:
            if re.search(pat, code):
                has_struct = True
        for pat in trace_patterns:
            if re.search(pat, code, re.IGNORECASE):
                has_trace = True

    if total_files == 0:
        return {
            "name": "observability",
            "score": 0.0,
            "weight": 0.15,
            "passed": True,
            "details": "No source files found to analyze",
        }

    cov = logged_files / total_files
    density = min(1.0, total_log / max(total_files, 1))
    score = 0.40 * cov + 0.25 * float(has_struct) + 0.20 * float(has_trace) + 0.15 * density

    details = (
        f"coverage={cov:.0%} ({logged_files}/{total_files}), "
        f"structured={'yes' if has_struct else 'no'}, "
        f"tracing={'yes' if has_trace else 'no'}, "
        f"density={density:.0%}"
    )
    return {
        "name": "observability",
        "score": round(score, 3),
        "weight": 0.15,
        "passed": score >= 0.1,
        "details": details,
    }


EVALS = [
    eval_tests,
    eval_lint,
    eval_type_check,
    eval_coverage,
    eval_capability_surface,
    eval_observability,
]


def main() -> None:
    results = [fn() for fn in EVALS]
    output = {"results": results}
    json.dump(output, sys.stdout, indent=2)
    print()


if __name__ == "__main__":
    main()
