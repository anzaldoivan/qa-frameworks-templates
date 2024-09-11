import { type Page } from '@playwright/test';
import { BasePage } from 'pages/common/BasePage';
import { Header } from 'pages/homepage/Header';

export class HomePage extends BasePage {
  readonly header: Header;
  readonly urlHomepage: string;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.urlHomepage = 'http://www.uitestingplayground.com/';
  }

  
}
