import { test, expect } from "./helpers";

test.describe("Admin panel", () => {
  test("admin dashboard renders", async ({ page }) => {
    await page.goto("/admin");

    await expect(page.getByRole("heading", { name: "Panel de administracion" })).toBeVisible();
    await expect(page.getByText("Total preguntas")).toBeVisible();
    await expect(page.getByText("Total tests")).toBeVisible();
    await expect(page.getByText("Total usuarios")).toBeVisible();
    await expect(page.getByText("Preguntas validadas")).toBeVisible();

    // Quick access links
    await expect(page.getByText("Accesos rapidos")).toBeVisible();
    await expect(page.getByRole("link", { name: /Preguntas/ }).first()).toBeVisible();
  });

  test("admin sub-pages load", async ({ page }) => {
    await page.goto("/admin/preguntas");
    await expect(page.getByRole("heading", { name: /Gestion de preguntas/ })).toBeVisible();

    await page.goto("/admin/tests");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/admin/materiales");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/admin/usuarios");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("admin has mobile navigation", async ({ page }, testInfo) => {
    if (testInfo.project.name === "desktop") {
      test.skip();
    }
    await page.goto("/admin");

    // Hamburger menu should be visible on mobile
    const menuButton = page.getByRole("button", { name: "Abrir menu de administracion" });
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // All admin links present
    await expect(dialog.getByRole("link", { name: "Panel" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Preguntas" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Tests" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Materiales" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Usuarios" })).toBeVisible();

    // Navigate via mobile menu
    await dialog.getByRole("link", { name: "Preguntas" }).click();
    await expect(page).toHaveURL("/admin/preguntas");
    // Menu should close after navigation
    await expect(dialog).not.toBeVisible();
  });

  test("admin has back link to dashboard", async ({ page }) => {
    await page.goto("/admin");
    const backLink = page.getByRole("link", { name: "Volver" });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/dashboard");
  });
});
