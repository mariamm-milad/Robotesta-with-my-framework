import { test, expect } from '@playwright/test';

test.describe('RN-65', () => {
  test('Create Jira issue from test case widget - happy path', { tag: ['@functional', '@critical'] }, async ({ page }) => {
    // Login to the application
    await page.goto('/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'email' }).fill(process.env.TEST_USER_EMAIL!);
    await page.getByRole('textbox', { name: 'password' }).fill(process.env.TEST_USER_PASSWORD!);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Navigate to test cases page with generated versions
    await page.waitForURL(/\/dashboard/i);
    await page.getByRole('link', { name: 'Test Cases' }).click(); // TODO: Verify exact navigation path

    // Locate test case widget with generated version
    const testCaseWidget = page.locator('[data-testid="test-case-widget"]').first(); // TODO: Use actual selector
    await testCaseWidget.waitFor();

    // Step 1: Verify 'Create Jira Issue' button is initially dimmed
    const createJiraButton = testCaseWidget.locator('[data-testid="create-jira-issue-button"]'); // TODO: Use actual selector
    await expect(createJiraButton).toBeVisible();
    await expect(createJiraButton).toHaveClass(/dimmed|disabled/);
    await expect(createJiraButton).toContainText('Create Jira Issue');

    // Step 2: Click the 'Create Jira Issue' action button
    await createJiraButton.click();

    // Step 3-6: Wait for Jira issue creation and verify success feedback
    const successMessage = page.locator('[data-testid="success-message"]'); // TODO: Use actual selector for success feedback
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText(/jira issue.*created.*successfully/i);

    // Step 7: Verify button changes from dimmed to green check mark
    await expect(createJiraButton).toHaveClass(/success|green/);
    await expect(createJiraButton).not.toHaveClass(/dimmed|disabled/);

    // Step 8: Verify button becomes unclickable
    await expect(createJiraButton).toBeDisabled();

    // Step 9: Verify button name changes to 'Parent Issue'
    await expect(createJiraButton).toContainText('Parent Issue');

    // Additional verification: Check that Jira issue details match
    const jiraIssueLink = testCaseWidget.locator('[data-testid="jira-issue-link"]');
    await expect(jiraIssueLink).toBeVisible();
  });
});
