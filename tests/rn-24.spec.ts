import { test, expect } from '@playwright/test';

test.describe('RN-24', () => {
  test('Verify redirection to dashboard after successful login with registered email and password', { tag: ['@functional', '@critical', '@login'] }, async ({ page }) => {
    // Navigate to the login page
    await page.goto('/');

    // Enter registered email in the email input field
    await page.fill('input[type="email"], input[name="email"], #email', process.env.TEST_USER_EMAIL!);

    // Enter correct password in the password input field
    await page.fill('input[type="password"], input[name="password"], #password', process.env.TEST_USER_PASSWORD!);

    // Submit the login form
    await page.click('button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign In")');

    // Verify user is redirected to dashboard landing page
    await page.waitForURL(/\/dashboard/i, { timeout: 10000 });

    // Additional assertion to ensure dashboard content is loaded
    await expect(page).toHaveURL(/\/dashboard/i);

    // Verify dashboard page elements are visible
    await expect(page.locator('h1, .dashboard-title, [data-testid="dashboard-header"]').first()).toBeVisible();
  });
});
