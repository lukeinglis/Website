import { fetchGitHubRepos } from "@/lib/github";
import fallbackProjects from "@/content/projects.json";

export const revalidate = 3600;

export async function GET() {
  try {
    const repos = await fetchGitHubRepos();
    return Response.json(repos);
  } catch {
    return Response.json(fallbackProjects);
  }
}
