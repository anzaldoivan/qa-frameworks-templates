import { type Locator, type Page } from '@playwright/test';
import { BasePage } from 'pages/common/BasePage';
import { Header } from 'pages/homepage/Header';
import { text } from 'stream/consumers';

export class HomePage extends BasePage {
  readonly header: Header;
  readonly urlHomepage: string;
  readonly searchBar: Locator;

  //a[@class='product-item-link']/*[contains(text(),'Balboa')]"


  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.urlHomepage = 'https://magento.softwaretestingboard.com/';
    this.searchBar = this.page.getByPlaceholder('Search entire store here...');
    this
  }

  async FillSearch(searchText: string): Promise<void> {
    await this.searchBar.fill(searchText);
  }

  async EnterSearch(): Promise<void> {
    await this.page.keyboard.press('Enter');
  }

  async SearchResults(text: string): Promise<void> {
    await this.page.keyboard.press('Enter');
  }
}
