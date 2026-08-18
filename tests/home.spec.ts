import { test, expect } from '@playwright/test';

test('la página principal se carga correctamente', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await expect(page).toHaveTitle('Swag Labs');

});