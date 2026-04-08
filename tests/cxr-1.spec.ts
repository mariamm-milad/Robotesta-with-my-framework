import { test, expect } from '@playwright/test';

test.describe('CXR-1', () => {
  test('should redirect to dashboard after successful login', { tag: ['@functional', '@high-priority', '@login'] }, async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');

    // Enter valid email address
    await page.fill('input[type="email"], input[placeholder*="email"], #email', process.env.TEST_USER_EMAIL!);

    // Enter correct password
    await page.fill('input[type="password"], #password', process.env.TEST_USER_PASSWORD!);

    // Click the Sign in button
    const startTime = Date.now();
    await page.click('button[type="submit"], button:has-text("Sign in"), .sign-in-button');

    // Wait for redirect to dashboard and verify timing
    await page.waitForURL(/\/dashboard/i, { timeout: 2000 });
    const redirectTime = Date.now() - startTime;

    // Verify redirect happened within 2 seconds
    expect(redirectTime).toBeLessThan(2000);

    // Verify we're on the dashboard page
    expect(page.url()).toMatch(/\/dashboard/i);

    // Verify dashboard content is displayed (projects and data)
    await expect(page.locator('.dashboard, [data-testid="dashboard"], .projects, .user-projects')).toBeVisible({ timeout: 5000 });
  });
});
