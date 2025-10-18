import { Page } from '@playwright/test';

export class AboutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://bodymassindexcalculator1.netlify.app/');
  }

  async gotoAbout() {
    await this.page.click('a[href="/about"]');
  }
}
