import { type Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async GoTo(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
