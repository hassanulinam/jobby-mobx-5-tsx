import { test, expect } from "@playwright/test";
import loginResponse from "../cypress/fixtures/loginResponse.json";

test.describe("Login functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("https://apis.ccbp.in/login", async (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(loginResponse),
      });
    });

    await page.goto("http://localhost:3000/");
    await page.getByPlaceholder("Username").fill("rahul");
    await page.getByPlaceholder("Password").fill("rahul@2021");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("LOGIN PAGE", async ({ page }) => {
    await expect(page).toHaveURL("http://localhost:3000/");

    page.getByRole("heading", { name: "Find The Job That Fits Your Life" });

    await page.goto("http://localhost:3000/login");
    await expect(page).not.toHaveURL("http://localhost:3000/login");
  });

  test("jobs route", async ({ page }) => {
    await page.locator("select").selectOption("te");

    await page
      .getByRole("heading", {
        name: "మీ జీవితానికి సరిపోయే ఉద్యోగాన్ని కనుగొనండి",
      })
      .click();

    await page.getByRole("button", { name: "ఉద్యోగాలను కనుగొనండి" }).click();
    await expect(page).toHaveURL("http://localhost:3000/jobs");

    await page.getByRole("heading", { name: "ఉద్యోగం రకం" }).click();
    await expect(
      page.getByRole("heading", { name: "Rahul Attluri" })
    ).toBeVisible();
  });
});
