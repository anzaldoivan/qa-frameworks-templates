import { test as base, expect } from "@playwright/test";
import { AllureReporter, allure } from "allure-playwright";
import sharp from "sharp";

// Extend the base test to include Allure Reporter
const test = base.extend<{ allure: AllureReporter }>({
  /* eslint-disable-next-line */
  allure: async ({}, use) => {
    const config = {}; // Add any necessary configuration here
    const reporter = new AllureReporter(config);
    await use(reporter);
  },
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === "failed") {
    const screenshot = await page.screenshot();

    // Compress the screenshot using sharp
    const compressedScreenshotBuffer = await sharp(screenshot)
      .resize({ width: 800 }) // Optional: Resize to a specific width
      .jpeg({ quality: 70 }) // Compress to JPEG with 70% quality
      .toBuffer();

    await allure.attachment(
      `${testInfo.title}`,
      compressedScreenshotBuffer,
      "image/jpeg",
    );
  }
});

export { test, expect };
