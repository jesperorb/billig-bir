import { test, expect } from "@playwright/test";

test.describe("Submission Form", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/map");
		await expect(page.locator(".mapboxgl-map")).toBeVisible({ timeout: 10000 });
	});

	test("opens submission dialog", async ({ page }) => {
		await page.getByRole("button", { name: "Mer" }).click();
		const merDialog = page.getByRole("dialog", { name: "Mer" });
		await expect(merDialog).toBeVisible();

		await merDialog.getByRole("button", { name: /Föreslå ny plats/ }).click();

		await expect(
			page.getByRole("dialog", { name: "Föreslå ny plats" }),
		).toBeVisible();
	});

	test("shows validation errors on empty submit", async ({ page }) => {
		// Open submission form
		await page.getByRole("button", { name: "Mer" }).click();
		const merDialog = page.getByRole("dialog", { name: "Mer" });
		await merDialog.getByRole("button", { name: /Föreslå ny plats/ }).click();
		await expect(
			page.getByRole("dialog", { name: "Föreslå ny plats" }),
		).toBeVisible();

		await page.getByRole("button", { name: "Skicka" }).click();

		await expect(page.getByText("Fyll i namn på plats")).toBeVisible();
	});

	test("fills and submits form successfully", async ({ page }) => {
		await page.getByRole("button", { name: "Mer" }).click();
		const merDialog = page.getByRole("dialog", { name: "Mer" });
		await merDialog.getByRole("button", { name: /Föreslå ny plats/ }).click();
		const drawer = page.getByRole("dialog", { name: "Föreslå ny plats" });
		await expect(drawer).toBeVisible();

		await drawer.getByRole("textbox", { name: "Platsnamn" }).fill("Test Pub");
		await drawer.getByRole("textbox", { name: "Ölmärke" }).fill("Gränges");
		await drawer.getByRole("textbox", { name: "Stadsdelar" }).click();
		await page.getByRole("option").first().click();

		await drawer.getByRole("button", { name: "Skicka" }).click();

		await expect(page.getByText("Något gick fel")).toBeVisible({
			timeout: 5000,
		});
	});
});
