import { test, expect } from "@playwright/test";

test.describe("Table Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/table");
		await expect(page.getByRole("table")).toBeVisible({ timeout: 10000 });
	});

	test("table loads with all locations", async ({ page }) => {
		const table = page.getByRole("table");
		await expect(table).toBeVisible();
	});

	test("search filters by name", async ({ page }) => {
		await page.getByRole("button", { name: "Filter" }).click();

		const searchInput = page.getByRole("textbox", { name: "Sök" });
		await searchInput.fill("Lobby");

		const dataRows = page.locator("tbody tr");
		await expect(dataRows).toHaveCount(1, { timeout: 5000 });
		await expect(page.getByRole("cell", { name: "The Lobby" })).toBeVisible();
	});

	test("column visibility toggle", async ({ page }) => {
		await page.getByRole("button", { name: "Filter" }).click();

		await expect(
			page.getByRole("columnheader", { name: "Ölmärke" }),
		).toBeVisible();

		await page.getByRole("button", { name: "Kolumner" }).click();
		await page.getByRole("menuitem").filter({ hasText: "Ölmärke" }).click();

		await expect(
			page.getByRole("columnheader", { name: "Ölmärke" }),
		).toBeHidden();
	});
});
