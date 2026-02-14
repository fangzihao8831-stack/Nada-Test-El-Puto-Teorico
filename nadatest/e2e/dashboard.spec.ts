import { test, expect } from "./helpers";

test.describe("Dashboard", () => {
  test("renders stats, CTA, and recent tests", async ({ page }) => {
    await page.goto("/dashboard");

    // Welcome header
    await expect(page.getByRole("heading", { name: "Bienvenido a Nadatest" })).toBeVisible();

    // Stat cards
    await expect(page.getByText("Tests realizados")).toBeVisible();
    await expect(page.getByText("Nota media")).toBeVisible();
    await expect(page.getByText("Racha actual")).toBeVisible();
    await expect(page.getByText("Preguntas falladas")).toBeVisible();

    // CTA card
    await expect(page.getByText("Listo para practicar?")).toBeVisible();
    await expect(page.getByRole("link", { name: "Comenzar test" })).toHaveAttribute("href", "/test");

    // Recent tests
    await expect(page.getByText("Tests recientes")).toBeVisible();
    await expect(page.getByText("Test general #15")).toBeVisible();
    await expect(page.getByText("Aprobado").first()).toBeVisible();
    await expect(page.getByText("Suspendido")).toBeVisible();
  });

  test("main-content anchor exists for skip link", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("#main-content")).toBeAttached();
  });
});

test.describe("Dashboard sidebar navigation", () => {
  test("sidebar links are visible on desktop", async ({ page }, testInfo) => {
    if (testInfo.project.name === "mobile") {
      test.skip();
    }
    await page.goto("/dashboard");

    await expect(page.getByRole("complementary").getByRole("link", { name: "Inicio" })).toBeVisible();
    await expect(page.getByRole("complementary").getByRole("link", { name: "Tests" })).toBeVisible();
    await expect(page.getByRole("complementary").getByRole("link", { name: "Progreso" })).toBeVisible();
    await expect(page.getByRole("complementary").getByRole("link", { name: "Fallos" })).toBeVisible();
    await expect(page.getByRole("complementary").getByRole("link", { name: "Materiales" })).toBeVisible();
  });

  test("mobile menu opens on hamburger click", async ({ page }, testInfo) => {
    if (testInfo.project.name === "desktop") {
      test.skip();
    }
    await page.goto("/dashboard");

    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog").getByText("Nadatest")).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("link", { name: "Inicio" })).toBeVisible();
  });
});

test.describe("Dashboard sub-pages", () => {
  test("progreso page renders", async ({ page }) => {
    await page.goto("/progreso");
    await expect(page.getByRole("heading", { name: "Mi progreso" })).toBeVisible();
    await expect(page.getByText("Tests totales")).toBeVisible();
    await expect(page.getByText("Nota media")).toBeVisible();
    await expect(page.getByText("Progreso por temas")).toBeVisible();
  });

  test("fallos page renders", async ({ page }) => {
    await page.goto("/fallos");
    await expect(page.getByRole("heading", { name: "Preguntas falladas" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Practicar fallos" })).toBeVisible();
    await expect(page.getByText("Total de fallos")).toBeVisible();
  });

  test("test selection page renders with tabs", async ({ page }) => {
    await page.goto("/test");
    await expect(page.getByRole("heading", { name: "Realizar test" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Examen" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Estudio" })).toBeVisible();
  });
});
