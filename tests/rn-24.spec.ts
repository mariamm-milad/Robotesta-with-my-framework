import { test, expect } from '@playwright/test';

test.describe('RN-24', () => {
  test('should mask password input for security', { tag: ['@security', '@critical'] }, async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');

    // Wait for login page to load
    await page.waitForSelector('h2.authentication-title');

    // Locate the password input field
    const passwordInput = page.getByPlaceholder('Enter Password');

    // Enter a test password
    const testPassword = 'SecurePassword123!';
    await passwordInput.fill(testPassword);

    // Verify the input type is 'password' (which ensures masking)
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Verify the actual value is stored but not visible (input value should be set but masked)
    await expect(passwordInput).toHaveValue(testPassword);

    // Additional verification: check that eye-invisible icon is present (indicates password is hidden)
    const eyeIcon = page.getByLabel('eye-invisible');
    await expect(eyeIcon).toBeVisible();
  });
});
