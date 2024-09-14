import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "pages/common/BasePage";

export class DashboardPage extends BasePage {
  readonly urlLoginpage: string;
  readonly buttonCategories: Locator;

  constructor(page: Page) {
    super(page);
    this.urlLoginpage =
      "https://club-administration.qa.qubika.com/#/auth/login";
    this.buttonCategories = this.page.locator(
      "xpath=//a[@class='nav-link' and contains(@href, '#/category-type')]",
    );
  }

  async GoToCategories(): Promise<void> {
    await this.buttonCategories.click();
  }
}
