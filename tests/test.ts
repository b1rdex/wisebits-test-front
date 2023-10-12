import { expect, test } from '@playwright/test';

// todo: can be required from config.ts
const AUTOLOAD_NEXT_POST_TIMEOUT = 30_000 + 5_000;

test('it works', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('heading', { name: 'Coffeegram' })).toBeVisible();

	await expect(page.getByTestId('post-card')).toBeVisible();
	await expect(page.getByTestId('post-card')).toHaveCount(1);
});

test('it loads new posts by click', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByTestId('post-card')).toHaveCount(1);
	await page.getByRole('button', { name: 'Load more' }).click();
	await expect(page.getByTestId('post-card')).toHaveCount(2);
});

test('it loads new posts automatically', async ({ page }, testInfo) => {
	testInfo.slow(true, 'waits 30s to load new post');
	await page.goto('/');

	await expect(page.getByTestId('post-card')).toHaveCount(1);
	await expect(page.getByTestId('post-card')).toHaveCount(2, {
		timeout: AUTOLOAD_NEXT_POST_TIMEOUT,
	});
});
