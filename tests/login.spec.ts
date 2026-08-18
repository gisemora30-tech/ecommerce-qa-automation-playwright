import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('el usuario inicia sesión correctamente', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
});

test('muestra un error con credenciales incorrectas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('usuario_invalido', 'clave_invalida');

    await expect(
        page.getByText(
            'Epic sadface: Username and password do not match any user in this service'
        )
    ).toBeVisible();
});

test('muestra error cuando los campos están vacíos', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', '');

    await expect(
        page.getByText('Epic sadface: Username is required')
    ).toBeVisible();
});

test('muestra error para un usuario bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(
        page.getByText(
            'Epic sadface: Sorry, this user has been locked out.'
        )
    ).toBeVisible();
});