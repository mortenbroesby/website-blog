import { test, expect } from "@playwright/test";

test("should navigate to the Blog page", async ({ page }) => {
  // Start from the index page
  await page.goto("/");

  // Find an element with the text 'Blog' and click on it
  await page.click("text=Blog");

  // The new url should be "/blog" (baseURL is used there)
  await expect(page).toHaveURL("/blog");

  // The new page should contain an h1 with "Blog"
  await expect(page.locator("h1")).toContainText("Blog");
});

test("should navigate to the Snippets page", async ({ page }) => {
  // Start from the index page
  await page.goto("/");

  // Find an element with the text 'Blog' and click on it
  await page.click("text=Snippets");

  // The new url should be "/snippets" (baseURL is used there)
  await expect(page).toHaveURL("/snippets");

  // The new page should contain an h1 with "Snippets"
  await expect(page.locator("h1")).toContainText("Snippets");
});
