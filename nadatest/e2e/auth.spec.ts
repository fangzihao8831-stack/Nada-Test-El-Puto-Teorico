import { test, expect } from "./helpers";

test.describe("Login page", () => {
  test("renders form with all fields", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByText("Iniciar sesion").first()).toBeVisible();
    await expect(page.getByText("Accede a tu cuenta de Nadatest")).toBeVisible();

    // Form fields
    await expect(page.getByLabel("Correo electronico")).toBeVisible();
    await expect(page.getByLabel("Contrasena")).toBeVisible();

    // Buttons
    await expect(page.getByRole("button", { name: "Iniciar sesion" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Continuar con Google" })).toBeVisible();

    // Google button has aria-label
    await expect(page.getByRole("button", { name: "Continuar con Google" })).toHaveAttribute(
      "aria-label",
      "Continuar con Google"
    );

    // Link to register
    await expect(page.getByRole("link", { name: "Registrate" })).toHaveAttribute("href", "/register");
  });

  test("inputs accept text", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Correo electronico").fill("test@example.com");
    await page.getByLabel("Contrasena").fill("password123");

    await expect(page.getByLabel("Correo electronico")).toHaveValue("test@example.com");
    await expect(page.getByLabel("Contrasena")).toHaveValue("password123");
  });
});

test.describe("Register page", () => {
  test("renders form with all fields", async ({ page }) => {
    await page.goto("/register");

    await expect(page.getByText("Crear cuenta").first()).toBeVisible();

    // Form fields
    await expect(page.getByLabel("Nombre")).toBeVisible();
    await expect(page.getByLabel("Correo electronico")).toBeVisible();
    await expect(page.getByLabel("Contrasena", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Confirmar contrasena")).toBeVisible();

    // Buttons
    await expect(page.getByRole("button", { name: "Crear cuenta" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Continuar con Google" })).toHaveAttribute(
      "aria-label",
      "Continuar con Google"
    );

    // Link to login
    await expect(page.getByRole("link", { name: "Inicia sesion" })).toHaveAttribute("href", "/login");
  });

  test("navigates between login and register", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: "Registrate" }).click();
    await expect(page).toHaveURL("/register");

    await page.getByRole("link", { name: "Inicia sesion" }).click();
    await expect(page).toHaveURL("/login");
  });
});
