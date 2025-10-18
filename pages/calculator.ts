import { Page } from '@playwright/test';

export class BmiCalculator {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openCalculator() {
    await this.page.goto('https://bodymassindexcalculator1.netlify.app');
  }

  async clickStart() {
    await this.page.click('.start-btn');
  }

  async selectHeightUnit(unit: string) {
    await this.page.locator('#heightUnit').selectOption(unit);
  }

  async selectWeightUnit(unit: string) {
    await this.page.locator('#weightUnit').selectOption(unit);
  }

  async enterHeight(height: string) {
    await this.page.fill('#height', height);
  }

  async enterWeight(weight: string) {
    await this.page.fill('#weight', weight);
  }

  async clickCalculate() {
    await this.page.getByRole('button', { name: 'Calculate BMI' }).click();
  }

  async clickReset() {
    await this.page.click('//button[text()="Reset"]');
  }

  async getResult() {
    return await this.page.textContent('#resultBox') ?? '';
  }

  async getHeightValue() {
    return await this.page.getByPlaceholder('Enter height').inputValue();
  }

  async getWeightValue() {
    return await this.page.getByPlaceholder('Enter weight').inputValue();
  }
}
