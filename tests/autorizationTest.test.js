const { test, expect, chromium } = require("@playwright/test");
const user = require("../user");

test("Authorization with valid data", async ({ page }) => {
  const browser = await chromium.launch({
    headless: false,
  });
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.login);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(user.password);
  await page.getByTestId('login-submit-btn').click();
  await expect(page.locator('.components-pages-Profile-Programs--title--Kw5NH'))
  .toHaveText('Мои курсы и профессии');
  await browser.close();
});

test("Authorization with invalid data", async ({ page }) => {
  const browser = await chromium.launch({
    headless: false,
  });
  await page.goto('https://netology.ru/');
  await page.locator('[placeholder="Email"]').fill(user.login);
  await page.locator('[placeholder="Пароль"]').fill(user.password);
  await page.locator('button:has-text("Войти")').click();
  await expect(page.locator('._-packages-ui-kit-components-v2-Input--error--fTLuj  div'))
  .toHaveText('Вы ввели неправильно логин или пароль');
  await browser.close();
});