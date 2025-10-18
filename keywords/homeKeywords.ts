import { Page, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import content from '../data/homePageContent.json';

export async function validateWelcomeMessage(page: Page) {
  await expect(page.getByRole('heading', { name: content.expectedTexts.welcomeMessage })).toBeVisible();
}

export async function validateCalculatorNavigation(page: Page) {
  const home = new HomePage(page);
  await home.clickCalculatorLink();
  await expect(page).toHaveURL(new RegExp(content.urls.calculator));
}

export async function validateAboutNavigation(page: Page) {
  const home = new HomePage(page);
  await home.clickAboutLink();
  await expect(page).toHaveURL(new RegExp(content.urls.about));
}

export async function validateStartButtonFunctionality(page: Page) {
  const home = new HomePage(page);
  await home.clickStartButton();
  await expect(page).toHaveURL(new RegExp(content.urls.calculator));
}
