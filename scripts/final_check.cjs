const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('Testing Desktop http://localhost:3000/uz ...');
  await page.goto('http://localhost:3000/uz', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  // Scroll to load all dynamic sections
  await page.evaluate(async () => {
    const distance = 400;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise(r => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(1500);

  // Check images
  const brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter(img => img.complete && img.naturalWidth === 0)
      .map(img => img.src);
  });

  console.log('Broken images count:', brokenImages.length);

  // Test Mobile
  console.log('Testing Mobile http://localhost:3000/uz (390x844) ...');
  const mPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mPage.goto('http://localhost:3000/uz', { waitUntil: 'load' });
  await mPage.waitForTimeout(2000);

  const hasHScroll = await mPage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Mobile horizontal overflow:', hasHScroll);

  // Test Modal on Mobile via Hero button
  console.log('Testing Consultation Modal open...');
  const ctaBtn = mPage.locator('#hero button:has-text("Konsultatsiyaga yozilish")').first();
  await ctaBtn.click();
  await mPage.waitForTimeout(600);
  const modal = await mPage.locator('[role="dialog"]').count();
  console.log('Modal opened successfully:', modal > 0);

  console.log('\n--- Final Test Summary ---');
  console.log('Console errors:', consoleErrors.length);
  console.log('Broken images:', brokenImages.length);
  console.log('Mobile horizontal overflow:', hasHScroll ? 'FAIL (overflow detected)' : 'PASS (no overflow)');
  console.log('Consultation Modal dialog:', modal > 0 ? 'PASS' : 'FAIL');

  await browser.close();
})();
