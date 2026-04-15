import { test, expect } from '@playwright/test';

test.describe('RN-24', () => {
  test('should redirect to dashboard after successful login', { tag: ['@functional', '@critical', '@login'] }, async ({ page }) => {
    // Navigate to login page
    await page.goto('/');

    // TODO: Navigate to login page if not already there

    // Enter registered email
    const emailInput = page.getByRole('textbox', { name: /email/i });
    await emailInput.fill(process.env.TEST_USER_EMAIL!);

    // Enter correct password
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    await passwordInput.fill(process.env.TEST_USER_PASSWORD!);

    // Submit the login form
    const loginButton = page.getByRole('button', { name: /login|sign in/i });
    await loginButton.click();

    // Verify redirection to dashboard
    await page.waitForURL(/\/dashboard/i);

    // Additional verification that dashboard content is loaded
    await expect(page).toHaveURL(/\/dashboard/i);

    // Verify dashboard elements are present
    await expect(page.getByLabel('robot')).toBeVisible();
  });
});
