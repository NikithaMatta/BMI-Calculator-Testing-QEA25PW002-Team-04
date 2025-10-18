import { Page, expect } from '@playwright/test';
import { BmiCalculator } from '../pages/calculator';
import content from '../data/calculatorContent.json';

export async function validateCorrectBMI(page: Page) {
  const bmi = new BmiCalculator(page);
  await bmi.enterHeight(content.normalInput.height);
  await bmi.selectHeightUnit(content.normalInput.heightUnit);
  await bmi.enterWeight(content.normalInput.weight);
  await bmi.selectWeightUnit(content.normalInput.weightUnit);
  await bmi.clickCalculate();
  expect(await bmi.getResult()).toContain('normal');
}

export async function validateEmptyFieldsError(page: Page) {
  const bmi = new BmiCalculator(page);
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain(content.messages.empty);
    await dialog.dismiss();
  });
  await bmi.enterHeight('');
  await bmi.enterWeight('');
  await bmi.clickCalculate();
}

export async function validateInvalidFieldsError(page: Page) {
  const bmi = new BmiCalculator(page);
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain(content.messages.invalid);
    await dialog.dismiss();
  });
  await bmi.enterHeight('-170');
  await bmi.enterWeight('-65');
  await bmi.clickCalculate();
}

export async function validateResetFunctionality(page: Page) {
  const bmi = new BmiCalculator(page);
  await bmi.selectHeightUnit('in');
  await bmi.selectWeightUnit('lb');
  await bmi.enterHeight('67');
  await bmi.enterWeight('143');
  await bmi.clickCalculate();
  await bmi.clickReset();
  expect(await bmi.getHeightValue()).toBe('');
  expect(await bmi.getWeightValue()).toBe('');
}

export async function validateBMIClassification(page: Page, type: 'normal' | 'underweight' | 'overweight') {
  const bmi = new BmiCalculator(page);
  const input = content[`${type}Input`];
  await bmi.enterHeight(input.height);
  await bmi.selectHeightUnit(input.heightUnit);
  await bmi.enterWeight(input.weight);
  await bmi.selectWeightUnit(input.weightUnit);
  await bmi.clickCalculate();
  const result = await bmi.getResult();
  expect(result).toContain(type);
  expect(result).toContain('Exercises');
  expect(result).toContain('Diet');
}

export async function validateEdgeCaseThresholds(page: Page) {
  const bmi = new BmiCalculator(page);
  const edge = content.edgeCases.underweight;
  await bmi.enterHeight(edge.height);
  await bmi.selectHeightUnit('in');
  await bmi.enterWeight(edge.weightLow);
  await bmi.selectWeightUnit('lb')
  await bmi.clickCalculate();
  expect(await bmi.getResult()).toContain('underweight');
  await bmi.enterWeight(edge.weightHigh);
  await bmi.clickCalculate();
  expect(await bmi.getResult()).toContain('underweight');
}

export async function validateNormalThreshold(page: Page) {
  const bmi = new BmiCalculator(page);
  const edge = content.edgeCases.normal;
  await bmi.enterHeight(edge.height);
  await bmi.enterWeight(edge.weightLow);
  await bmi.clickCalculate();
  expect(await bmi.getResult()).toContain('normal');
  await bmi.enterWeight(edge.weightHigh);
  await bmi.clickCalculate();
  expect(await bmi.getResult()).toContain('normal');
}

export async function validateMaxLimitAlert(page: Page) {
  const bmi = new BmiCalculator(page);
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain(content.messages.maxLimit);
    await dialog.dismiss();
  });
  await bmi.enterHeight(content.limits.maxHeight);
  await bmi.enterWeight(content.limits.maxWeight);
  await bmi.clickCalculate();
}

export async function validateMinLimitError(page: Page) {
  const bmi = new BmiCalculator(page);
  let dialogShown = false;

  page.once('dialog', async dialog => {
    dialogShown = true;
    expect(dialog.message()).toContain(content.messages.minLimit);
    await dialog.dismiss();
  });

  await bmi.selectHeightUnit('in');
  await bmi.selectWeightUnit('lb');
  await bmi.enterHeight(content.limits.minHeight);
  await bmi.enterWeight(content.limits.minWeight);
  await bmi.clickCalculate();

  expect(dialogShown).toBe(true);
}

export async function validateCalculatorLayout(page: Page) {
  const bmi = new BmiCalculator(page);
  const title = await page.textContent('h2');
  expect(title).toBe(content.layoutTitle);
  await expect(page.locator('#height')).toBeVisible();
  await expect(page.locator('#heightUnit')).toBeVisible();
  await expect(page.locator('#weight')).toBeVisible();
  await expect(page.locator('#weightUnit')).toBeVisible();
  await expect(page.locator('//button[text()="Calculate BMI"]')).toBeVisible();
  await expect(page.locator('//button[text()="Reset"]')).toBeVisible();
  await expect(page.locator('#resultBox')).toBeVisible();
}

export async function validateResultContent(page: Page) {
  const bmi = new BmiCalculator(page);
  await bmi.enterHeight(content.normalInput.height);
  await bmi.selectHeightUnit(content.normalInput.heightUnit);
  await bmi.enterWeight(content.normalInput.weight);
  await bmi.selectWeightUnit(content.normalInput.weightUnit);
  await bmi.clickCalculate();
  const resultText = await bmi.getResult();
  expect(resultText).toContain('Your BMI:');
}
