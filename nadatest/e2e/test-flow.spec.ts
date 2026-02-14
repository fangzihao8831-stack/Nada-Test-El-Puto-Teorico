import { test, expect } from "./helpers";

test.describe("Test taking flow (estudio mode)", () => {
  test("loads test page with question 1", async ({ page }, testInfo) => {
    await page.goto("/test/1?mode=estudio");

    // Header
    await expect(page.getByText("Modo estudio")).toBeVisible();
    // Desktop header shows answered count "0/30"; mobile bar shows question position "1/30"
    if (testInfo.project.name === "desktop") {
      await expect(page.getByText("0/30")).toBeVisible();
    } else {
      await expect(page.getByText("1/30")).toBeVisible();
    }

    // Question content — desktop layout is nth(0), mobile layout is nth(1) in DOM
    const nth = testInfo.project.name === "desktop" ? 0 : 1;
    await expect(page.getByText("Maniobras").nth(nth)).toBeVisible();

    // Answer options visible
    await expect(page.getByRole("button", { name: /^A\s/ }).first()).toBeVisible();

    // Navigation
    await expect(page.getByRole("button", { name: "SIGUIENTE" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Finalizar test" })).toBeVisible();

    // Question grid: 30 buttons
    await expect(page.getByRole("button", { name: "01" })).toBeVisible();
    await expect(page.getByRole("button", { name: "30" })).toBeVisible();
  });

  test("can answer a question and see feedback", async ({ page }, testInfo) => {
    await page.goto("/test/1?mode=estudio");

    // Select answer B
    await page.getByRole("button", { name: /^B\s/ }).first().click();

    // Both layouts render feedback — desktop is nth(0), mobile is nth(1) in DOM
    const nth = testInfo.project.name === "desktop" ? 0 : 1;

    // Should see feedback (Correcto or Incorrecto)
    await expect(
      page.getByText("Correcto").nth(nth).or(page.getByText("Incorrecto").nth(nth))
    ).toBeVisible({ timeout: 5000 });

    // Progress should update to 1/30
    await expect(page.getByText("1/30").nth(nth)).toBeVisible();
  });

  test("can navigate between questions", async ({ page }) => {
    await page.goto("/test/1?mode=estudio");

    // Click SIGUIENTE
    await page.getByRole("button", { name: "SIGUIENTE" }).click();

    // Should be on question 2 — check the question number span inside a paragraph
    await expect(page.locator("main p span.text-primary").first()).toContainText("2.");

    // Click question 5 in grid
    await page.getByRole("button", { name: "05" }).click();
    await expect(page.locator("main p span.text-primary").first()).toContainText("5.");
  });

  test("can finish test and see results", async ({ page }) => {
    await page.goto("/test/1?mode=estudio");

    // Answer first 3 questions quickly
    for (let i = 0; i < 3; i++) {
      await page.getByRole("button", { name: /^A\s/ }).first().click();
      if (i < 2) {
        await page.getByRole("button", { name: "SIGUIENTE" }).click();
      }
    }

    // Click finish
    await page.getByRole("button", { name: "Finalizar test" }).click();

    // Should navigate to results page
    await page.waitForURL(/resultado/);

    // Results page content
    await expect(page.getByText(/\/30/)).toBeVisible();
  });
});

test.describe("Test taking flow (examen mode)", () => {
  test("loads with exam badge and countdown timer", async ({ page }) => {
    await page.goto("/test/1?mode=examen");

    await expect(page.getByText("Modo examen")).toBeVisible();
    // Timer should show ~30:00 (starts counting down)
    await expect(page.getByText(/\d{2}:\d{2}/)).toBeVisible();
  });

  test("answers are not shown immediately in exam mode", async ({ page }) => {
    await page.goto("/test/1?mode=examen");

    // Select an answer
    await page.getByRole("button", { name: /^A\s/ }).first().click();

    // Should NOT see feedback text
    await expect(page.getByText("Correcto")).not.toBeVisible();
    await expect(page.getByText("Incorrecto")).not.toBeVisible();

    // No hint button in exam mode
    await expect(page.getByRole("button", { name: "Ver pista" })).not.toBeVisible();
  });
});

test.describe("Demo test flow", () => {
  test("demo page loads and works", async ({ page }) => {
    await page.goto("/demo");

    // Should show study mode
    await expect(page.getByText("Modo estudio")).toBeVisible();

    // Should have questions and grid
    await expect(page.getByRole("button", { name: "01" })).toBeVisible();
    await expect(page.getByRole("button", { name: "30" })).toBeVisible();
  });

  test("demo finish navigates to demo results", async ({ page }) => {
    await page.goto("/demo");

    // Answer one question and finish
    await page.getByRole("button", { name: /^A\s/ }).first().click();
    await page.getByRole("button", { name: "Finalizar test" }).click();

    await page.waitForURL(/demo\/resultado/);
    await expect(page.getByText(/\/30/)).toBeVisible();
  });
});
