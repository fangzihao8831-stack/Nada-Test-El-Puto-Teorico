import { test, expect } from "./helpers";

test.describe("Landing page", () => {
  test("renders hero, features, steps, and footer", async ({ page }) => {
    await page.goto("/");

    // Header
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByText("Nadatest").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Iniciar sesion" })).toBeVisible();

    // Hero
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Prepara tu examen teorico");
    await expect(page.getByRole("link", { name: "Examen de prueba" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Registrate" }).first()).toBeVisible();

    // Features section
    await expect(page.getByText("Tests reales")).toBeVisible();
    await expect(page.getByText("Modo examen y estudio")).toBeVisible();
    await expect(page.getByText("Progreso y fallos")).toBeVisible();

    // Steps
    await expect(page.getByText("Como funciona")).toBeVisible();
    await expect(page.getByText("Paso 1")).toBeVisible();
    await expect(page.getByText("Paso 4")).toBeVisible();

    // Final CTA
    await expect(page.getByText("Listo para empezar?")).toBeVisible();
    await expect(page.getByRole("link", { name: "Crear cuenta gratis" })).toBeVisible();

    // Footer
    await expect(page.getByText("Basado en el temario oficial")).toBeVisible();
  });

  test("skip-to-content link exists", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: "Ir al contenido principal" });
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  test("CTA links navigate correctly", async ({ page }) => {
    await page.goto("/");

    // Demo link
    const demoLink = page.getByRole("link", { name: "Examen de prueba" });
    await expect(demoLink).toHaveAttribute("href", "/demo");

    // Register link
    const registerLink = page.getByRole("link", { name: "Registrate" }).first();
    await expect(registerLink).toHaveAttribute("href", "/register");

    // Login link
    const loginLink = page.getByRole("link", { name: "Iniciar sesion" });
    await expect(loginLink).toHaveAttribute("href", "/login");
  });
});
