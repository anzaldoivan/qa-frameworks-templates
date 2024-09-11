import { test , expect } from '@playwright/test';
import { HomePage } from 'pages/homepage/HomePage';

test('has title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.GoTo(homePage.urlHomepage);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("UI Test Automation Playground");
});