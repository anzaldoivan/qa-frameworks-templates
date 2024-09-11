import { type Locator, type Page } from '@playwright/test';

export class Header {
  protected page: Page;
  protected headerLogo: Locator;
  protected buttonHome: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerLogo = page.getByRole('link', { name: 'UITAP' });
    this.buttonHome = page.getByRole('link', { name: 'Home' })
  }

  async ClickHome(): Promise<void> {
    await this.headerLogo.click();
  }
}
