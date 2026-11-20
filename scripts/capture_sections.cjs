const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const outDir = path.join(process.cwd(), 'screenshots', 'section_audit');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const vp of [{ name: 'desktop', w: 1440, h: 900 }, { name: 'mobile', w: 390, h: 844 }]) {
    console.log(`Processing ${vp.name}...`);
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    await page.goto('http://localhost:3000/uz', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // scroll through to trigger all reveals
    await page.evaluate(async () => {
      const distance = 350;
      while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise(r => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1500);

    const sections = [
      { id: 'nav', selector: 'header' },
      { id: 'hero', selector: '#hero' },
      { id: 'ticker', selector: '[aria-label="Topics Ticker"]' },
      { id: 'services', selector: '#xizmatlar' },
      { id: 'stages', selector: '#bosqichlar' },
      { id: 'expert', selector: '#ekspert' },
      { id: 'gallery', selector: '#galereya' },
      { id: 'results', selector: '#natijalar' },
      { id: 'cta', selector: '#qabul' },
      { id: 'faq', selector: '#faq' },
      { id: 'contact', selector: '#aloqa' },
      { id: 'footer', selector: 'footer' }
    ];

    for (const s of sections) {
      const el = page.locator(s.selector).first();
      if (await el.count() > 0) {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await el.screenshot({ path: path.join(outDir, `${vp.name}_${s.id}.png`) });
        console.log(`Saved ${vp.name}_${s.id}.png`);
      }
    }
    await page.close();
  }
  await browser.close();
  console.log('Done capturing all section screenshots!');
})();
