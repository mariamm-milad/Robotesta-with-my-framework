import { test, expect } from '@playwright/test';

test.describe('RN-24', () => {
  test('Successful login with valid email and password redirects to dashboard', { tag: ['@functional', '@critical', '@login'] }, async ({ page }) => {
    // Navigate to the login page
    await page.goto('/');

    // Wait for login form to be visible
    const emailField = page.locator('input[type="email"], input[name="email"], #email');
    const passwordField = page.locator('input[type="password"], input[name="password"], #password');
    const loginButton = page.getByRole('button', { name: /login|sign in/i });

    await emailField.waitFor({ state: 'visible' });

    // Enter valid credentials
    await emailField.fill(process.env.TEST_USER_EMAIL!);
    await passwordField.fill(process.env.TEST_USER_PASSWORD!);

    // Click login button
    await loginButton.click();

    // Verify successful redirect to dashboard
    await page.waitForURL(/\/dashboard/i);

    // Additional verification that we're on the dashboard
    await expect(page).toHaveURL(/\/dashboard/i);

    // Verify dashboard elements are visible to confirm successful login
    // TODO: Add specific dashboard element verification once UI is stable
  });
});
