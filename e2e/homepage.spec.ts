import { expect, test } from "@playwright/test";

test("homepage renders with correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Luke Inglis/);
});

test("homepage shows name heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Luke Inglis" }),
  ).toBeVisible();
});
