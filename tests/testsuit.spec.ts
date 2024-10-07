import { test, expect } from '@playwright/test';

test.describe('Front-end tests', () => {

  test.describe('Test suite 01', () => {
    test('Create a client', async ({ page }) => {
      await page.goto('http://localhost:3000'); // Ensure the correct port number
      await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
      await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    });
  });

});

test.describe('Back-end tests', () => {
  test('Create a client', async ({ request }) => {
    // Send a POST request to the backend login API
    const response = await request.post('http://localhost:3000/api/login', {
      data: {
        "username": `${process.env.TEST_USERNAME}`,
        "password": `${process.env.TEST_PASSWORD}`
      }
    });

    // Assert that the response is OK (status 2xx)
    expect(response.ok()).toBeTruthy();

  });
});
