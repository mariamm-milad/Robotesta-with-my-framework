import { test, expect } from '@playwright/test';

test.describe('DCP-13', () => {
  test('should login with valid email and password - happy path', { tag: ['@functional', '@critical', '@login'] }, async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');
    await page.waitForSelector('h2.authentication-title');

    // Enter valid email in the email/username field
    await page.getByPlaceholder('Enter emailaddress').fill('testuser@example.com'); // TODO: Replace with actual test user email

    // Enter valid password in the password field
    await page.getByPlaceholder('Enter Password').fill('TestPassword123!'); // TODO: Replace with actual test user password

    // Click the 'Login' button
    await page.getByRole('button', { name: /login|sign in/i }).click(); // TODO: Update selector when login button is identified

    // Verify user is successfully logged in and redirected to dashboard
    await page.waitForURL(/\/dashboard/i);

    // Additional verification that user is on their personalized dashboard
    await expect(page).toHaveURL(/\/dashboard/i);
    await page.waitForSelector('[data-testid="dashboard"], .dashboard, #dashboard', { timeout: 10000 }); // TODO: Update with actual dashboard selector
  });
});
