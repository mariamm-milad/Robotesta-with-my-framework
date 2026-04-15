import { test, expect } from '@playwright/test';

test.describe('RN-72', () => {
  test('should open Edit User popup as Admin', { tag: ['@functional', '@critical'] }, async ({ page }) => {
    // Login as Admin user
    await page.goto('/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'email' }).fill(process.env.TEST_USER_EMAIL!);
    await page.getByRole('textbox', { name: 'password' }).fill(process.env.TEST_USER_PASSWORD!);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Navigate to Users page
    await page.waitForURL(/\/dashboard/i);
    await page.getByRole('link', { name: 'Users' }).click();
    await page.waitForURL(/\/users/i);

    // Locate a user in the list and click the Pencil icon in Actions column
    const userRow = page.getByRole('row').first();
    const pencilIcon = userRow.getByRole('button', { name: 'Edit' }).or(userRow.locator('[data-testid="edit-user-button"]')).or(userRow.locator('.pencil-icon, .edit-icon'));
    await pencilIcon.click();

    // Verify Edit User popup opens
    const editUserPopup = page.getByRole('dialog', { name: 'Edit User' }).or(page.locator('[data-testid="edit-user-popup"]')).or(page.locator('.edit-user-modal, .popup'));
    await expect(editUserPopup).toBeVisible();

    // Verify popup contains expected elements
    await expect(editUserPopup.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(editUserPopup.getByRole('combobox', { name: 'Role' })).toBeVisible();
    await expect(editUserPopup.getByRole('button', { name: 'Ok' })).toBeVisible();
    await expect(editUserPopup.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });
});
