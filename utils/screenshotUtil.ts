import { Page, TestInfo } from '@playwright/test';

export async function captureScreenshot(page: Page, name: string, testInfo: TestInfo) {
  const browserName = testInfo.project.name;
  await page.screenshot({ path: `screenshots/${browserName}/${name}`, fullPage: true });
  console.log('Screenshot saved');
}
