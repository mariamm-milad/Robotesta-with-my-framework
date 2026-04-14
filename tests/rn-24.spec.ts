import { test, expect } from '@playwright/test';

test.describe('RN-24', () => {
  test('Verify successful login with registered email and correct password redirects to dashboard', { tag: ['@functional', '@critical', '@login'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto();

    // Enter registered email in the Email field
    await page.fill('[data-testid="email"], input[type="email"], #email', process.env.TEST_USER_EMAIL);

    // Enter correct password in the Password field
    await page.fill('[data-testid="password"], input[type="password"], #password', process.env.TEST_USER_PASSWORD);

    // Click on the Submit button
    await page.click('[data-testid="submit"], button[type="submit"], input[type="submit"]');

    // Verify user is redirected to the dashboard landing page
    await page.waitForURL(/\/dashboard/i);

    // Additional assertion to confirm we're on the dashboard
    await expect(page).toHaveURL(/\/dashboard/i);
  });
});
