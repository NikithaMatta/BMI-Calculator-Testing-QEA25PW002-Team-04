import { test } from '@playwright/test';
import { BmiCalculator } from '../pages/calculator';
import {
  validateCorrectBMI,
  validateEmptyFieldsError,
  validateInvalidFieldsError,
  validateResetFunctionality,
  validateBMIClassification,
  validateEdgeCaseThresholds,
  validateNormalThreshold,
  validateMaxLimitAlert,
  validateMinLimitError,
  validateCalculatorLayout,
  validateResultContent
} from '../keywords/calculatorKeywords';
import { captureScreenshot } from '../utils/screenshotUtil';


test.describe('BMI Calculator Functional Tests', () => {
  let page;
  let bmi: BmiCalculator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    bmi = new BmiCalculator(page);
    await bmi.openCalculator();
    await bmi.clickStart();
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

  test('BMI_TC005_CorrectBMI @regression', async () => {
    await validateCorrectBMI(page);
  });

  test('BMI_TC006_Empty @regression', async () => {
    await validateEmptyFieldsError(page);
  });

  test('BMI_TC007_Invalid @regression', async () => {
    await validateInvalidFieldsError(page);
  });

  test('BMI_TC008_Reset @regression', async () => {
    await validateResetFunctionality(page);
  });

  test('BMI_TC009_Normal @regression @parameterized', async () => {
    await validateBMIClassification(page, 'normal');
  });

  test('BMI_TC010_Underweight @regression @parameterized', async () => {
    await validateBMIClassification(page, 'underweight');
  });

  test('BMI_TC011_Overweight @regression @parameterized ', async () => {
    await validateBMIClassification(page, 'overweight');
  });

  test('BMI_TC012_UnderweightEdgeCase @regression', async () => {
    await validateEdgeCaseThresholds(page);
  });

  test('BMI_TC013_NormalEdgeCase @regression', async () => {
    await validateNormalThreshold(page);
  });

  test('BMI_TC014_HumanMaximumLimit @regression', async () => {
    await validateMaxLimitAlert(page);
  });

  test('BMI_TC015_HumanMinimumLimit @regression', async () => {
    await validateMinLimitError(page);
  });

  test('BMI_TC016_CalculatorAppearance @smoke @regression', async () => {
    await validateCalculatorLayout(page);
  });

  test('BMI_TC017_CalculatorResultContent', async () => {
    await validateResultContent(page);
  });

});
