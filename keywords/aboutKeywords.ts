import { Page, expect } from '@playwright/test';
import content from '../data/aboutPageContent.json';

export async function validateAboutPageAppearance(page: Page) {
  const title = await page.textContent('h1');
  expect(title).toBe('About BMI');
  await expect(page.locator('strong', { hasText: 'What is BMI?' })).toBeVisible();
  await expect(page.locator('strong', { hasText: 'Why is BMI Important?' })).toBeVisible();
  const paragraphs = await page.locator('div.about-content p').count();
  expect(paragraphs).toBe(4);
}

export async function validateWhatIsBMISection(page: Page) {
  const expectedText = content.expectedTexts.whatIsBMI;
  await expect(page.locator(`text=${expectedText}`)).toBeVisible();
}

export async function validateWhyIsBMIImportantSection(page: Page) {
  const expectedText = content.expectedTexts.whyImportant;
  await expect(page.locator(`text=${expectedText}`)).toBeVisible();
}
