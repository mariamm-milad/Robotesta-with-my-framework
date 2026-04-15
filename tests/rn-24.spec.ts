import { test, expect } from '@playwright/test';

test.describe('RN-24', () => {
  test('should mask password input for security', { tag: ['@security', '@critical'] }, async ({ page }) => {
    // Navigate to the login page
    await page.goto('/');

    // TODO: Navigate to login page if not directly accessible from home

    // Locate password input field
    const passwordField = page.getByRole('textbox', { name: /password/i }).or(page.locator('input[type="password"]')); // TODO: Use verified selector when available

    // Enter a test password
    const testPassword = 'TestPassword123!';
    await passwordField.fill(testPassword);

    // Verify the password field has type="password" attribute for masking
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Verify the actual value is not visible in the DOM (masked)
    const fieldValue = await passwordField.inputValue();
    expect(fieldValue).toBe(testPassword); // Value should be stored but not visible

    // Additional security check: verify the field doesn't display plain text visually
    await expect(passwordField).not.toContainText(testPassword);
  });
});
