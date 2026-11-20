const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const outDir = path.join(process.cwd(), 'screenshots', 'final_audit');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Desktop 1440x900
  console.log('Capturing Desktop...');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/uz', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  // Slow scroll to trigger reveals
  await page.evaluate(async () => {
    const distance = 350;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise(r => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  // Capture hero
  const heroEl = page.locator('#hero');
  await heroEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await heroEl.screenshot({ path: path.join(outDir, '01_desktop_hero.png') });

  // Capture expert
  const expertEl = page.locator('#ekspert');
  await expertEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expertEl.screenshot({ path: path.join(outDir, '02_desktop_expert.png') });

  // Capture gallery
  const galleryEl = page.locator('#galereya');
  await galleryEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await galleryEl.screenshot({ path: path.join(outDir, '03_desktop_gallery.png') });

  // Capture testimonials
  const resultsEl = page.locator('#natijalar');
  await resultsEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await resultsEl.screenshot({ path: path.join(outDir, '04_desktop_testimonials.png') });

  // Switch to Reels tab and capture
  const reelsTabBtn = resultsEl.locator('button:has-text("Videolar")');
  if (await reelsTabBtn.count() > 0) {
    await reelsTabBtn.click();
    await page.waitForTimeout(500);
    await resultsEl.screenshot({ path: path.join(outDir, '05_desktop_reels.png') });
  }

  // Capture CTA cards
  const ctaEl = page.locator('#qabul');
  await ctaEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await ctaEl.screenshot({ path: path.join(outDir, '06_desktop_cta.png') });

  await page.close();

  // 2. Mobile 390x844
  console.log('Capturing Mobile...');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000/uz', { waitUntil: 'load' });
  await mobilePage.waitForTimeout(2000);

  // Slow scroll
  await mobilePage.evaluate(async () => {
    const distance = 350;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise(r => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await mobilePage.waitForTimeout(1500);

  const mHeroEl = mobilePage.locator('#hero');
  await mHeroEl.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);
  await mHeroEl.screenshot({ path: path.join(outDir, '07_mobile_hero.png') });

  const mExpertEl = mobilePage.locator('#ekspert');
  await mExpertEl.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);
  await mExpertEl.screenshot({ path: path.join(outDir, '08_mobile_expert.png') });

  const mCtaEl = mobilePage.locator('#qabul');
  await mCtaEl.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);
  await mCtaEl.screenshot({ path: path.join(outDir, '09_mobile_cta.png') });

  await mobilePage.close();
  await browser.close();
  console.log('Final verification screenshots captured successfully!');
})();
