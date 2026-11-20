const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const consoleErrors = [];
  const failedRequests = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  page.on('response', resp => {
    if (resp.status() >= 400) {
      failedRequests.push({ url: resp.url(), status: resp.status() });
    }
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Scroll down smoothly to load lazy images & sections
  await page.evaluate(async () => {
    const distance = 400;
    const delay = 100;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise(r => setTimeout(r, delay));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);

  // Check all images
  const imgData = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      width: img.clientWidth,
      height: img.clientHeight
    }));
  });
  
  console.log('\n=== Console Errors (' + consoleErrors.length + ') ===');
  consoleErrors.forEach(err => console.log('  ❌ ' + err));
  
  console.log('\n=== Failed HTTP Requests (' + failedRequests.length + ') ===');
  failedRequests.forEach(r => console.log('  ❌ [' + r.status + '] ' + r.url));
  
  console.log('\n=== Images Analysis (' + imgData.length + ' total) ===');
  const brokenImgs = imgData.filter(i => i.complete && i.naturalWidth === 0);
  console.log('Broken images count: ' + brokenImgs.length);
  brokenImgs.forEach(i => console.log('  ⚠️ BROKEN: ' + i.src + ' (alt: ' + i.alt + ')'));
  
  const okImgs = imgData.filter(i => i.complete && i.naturalWidth > 0);
  console.log('Working images count: ' + okImgs.length);
  okImgs.forEach(i => console.log('  ✅ OK: ' + i.src.slice(-40) + ' | size: ' + i.width + 'x' + i.height + ' | natural: ' + i.naturalWidth + 'x' + i.naturalHeight));

  // Take screenshot
  const outDir = path.join(process.cwd(), 'screenshots', 'current_audit');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  await page.screenshot({ path: path.join(outDir, 'desktop_full.png'), fullPage: true });
  console.log('\nSaved fullpage screenshot to screenshots/current_audit/desktop_full.png');

  await browser.close();
})();
