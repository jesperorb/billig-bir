import { test, expect } from "@playwright/test";

test.describe("Map Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/map");
	});

	test("page loads with map container", async ({ page }) => {
		// Verify map region renders
		await expect(page.getByRole("region", { name: "Map" })).toBeVisible();

		// Verify data loads by checking cheapest beer card appears
		await expect(
			page.getByRole("heading", { name: "Billigaste ölen" }),
		).toBeVisible({ timeout: 10000 });
	});

	test("filters sidebar shows filter controls", async ({ page }) => {
		await expect(page.getByRole("radio", { name: "Standard" })).toBeVisible();
		await expect(page.getByRole("radio", { name: "AW" })).toBeVisible();
		await expect(page.getByRole("radio", { name: "Kanna" })).toBeVisible();
		await expect(page.getByRole("slider")).toBeVisible();
		await expect(
			page.getByRole("checkbox", { name: "Uteservering" }),
		).toBeVisible();
		await expect(
			page.getByRole("checkbox", { name: "Eftermiddagssol" }),
		).toBeVisible();
		await expect(
			page.getByRole("textbox", { name: "Stadsdelar" }),
		).toBeVisible();
	});

	test("district filter filters results", async ({ page }) => {
		// Wait for data to load
		await expect(
			page.getByRole("heading", { name: "Billigaste ölen" }),
		).toBeVisible({ timeout: 10000 });

		const districtInput = page.getByRole("textbox", { name: "Stadsdelar" });
		await districtInput.click();
		await page.getByRole("option", { name: "Nacka" }).click();

		// After filtering to Nacka, the cheapest beer card should update
		// to show a Nacka location (Bistro Sickla at 78kr is cheapest in Nacka)
		await expect(page.getByText("Bistro Sickla")).toBeVisible({
			timeout: 5000,
		});
	});
});
