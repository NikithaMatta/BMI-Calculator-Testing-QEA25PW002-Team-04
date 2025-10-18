import { test } from '@playwright/test';
import { AboutPage } from '../pages/about';
import {
  validateAboutPageAppearance,
  validateWhatIsBMISection,
  validateWhyIsBMIImportantSection
} from '../keywords/aboutKeywords';
import { captureScreenshot } from '../utils/screenshotUtil';

test.describe('BMI About Page Functional Tests', () => {
  let page;
  let about: AboutPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    about = new AboutPage(page);
    await about.goto();
    await about.gotoAbout();
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

  test('BMI_TC018_AboutAppearance @smoke', async () => {
    await validateAboutPageAppearance(page);
  });

  test('BMI_TC019_AboutBMI @regression', async () => {
    await validateWhatIsBMISection(page);
  });

  test('BMI_TC020_ImportanceBMI @regression', async () => {
    await validateWhyIsBMIImportantSection(page);
  });
});
