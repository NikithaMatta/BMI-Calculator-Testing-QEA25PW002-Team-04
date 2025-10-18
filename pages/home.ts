import { Page } from '@playwright/test';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://bodymassindexcalculator1.netlify.app/');
  }

  async clickCalculatorLink() {
    await this.page.click('//a[text()="Calculator"]');
  }

  async clickAboutLink() {
    await this.page.click('a[href="/about"]');
  }

  async clickHomeLink() {
    await this.page.getByText('Home').click();
  }

  async clickStartButton() {
    await this.page.click('button.start-btn');
  }
}
