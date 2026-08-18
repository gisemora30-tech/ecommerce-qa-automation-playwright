import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('el usuario agrega un producto al carrito', async ({ page }) => {
    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    await page
        .getByRole('button', { name: 'Add to cart', exact: true })
        .first()
        .click();

    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(
    page.locator('[data-test="shopping-cart-badge"]')
).toHaveText('1');
});