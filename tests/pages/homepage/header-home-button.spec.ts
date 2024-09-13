import { test , expect } from '@playwright/test';
import { HomePage } from 'pages/homepage/HomePage';

test.describe(`Header Home Button Validations`, () => {
    test(`Home redirects to the homepage`, async ({ page }) => {
        const homePage = new HomePage(page);
        const header = homePage.header;
        await homePage.GoTo(homePage.urlHomepage);
        await header.ClickHome();

        await expect(page.url()).toBe(homePage.urlHomepage);
    });
});