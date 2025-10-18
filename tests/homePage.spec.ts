import { test } from '@playwright/test';
import { HomePage } from '../pages/home';
import {
  validateWelcomeMessage,
  validateCalculatorNavigation,
  validateAboutNavigation,
  validateStartButtonFunctionality
} from '../keywords/homeKeywords';
import { captureScreenshot } from '../utils/screenshotUtil';

test.describe('BMI Home Page Functional Tests', () => {
  let page;
  let home: HomePage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    home = new HomePage(page);
    await home.goto();
  });

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await captureScreenshot(page, `${testInfo.title}.png`, testInfo);
      console.log(`Test failed: ${testInfo.title}`);
    } else {
      console.log(`Test passed: ${testInfo.title}`);
    }
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('BMI_TC001_CalculatorLinkNavigation @navigation @smoke', async () => {
    await validateCalculatorNavigation(page);
  });

  test('BMI_TC002_AboutLinkNavigation @navigation @smoke', async () => {
    await validateAboutNavigation(page);
  });

  test('BMI_TC003_WelcomeMessageVisibility @smoke', async () => {
    await validateWelcomeMessage(page);
  });

  test('BMI_TC004_StartButtonFunctionality @navigation @smoke', async () => {
    await validateStartButtonFunctionality(page);
  });
});
