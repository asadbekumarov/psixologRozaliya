const { chromium } = require('playwright');
const http = require('http');

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1. Check HTTP status of /og-image.png
  console.log('--- 1. Testing /og-image.png HTTP response ---');
  await new Promise((resolve, reject) => {
    http.get('http://localhost:3000/og-image.png', (res) => {
      console.log('Status /og-image.png:', res.statusCode, res.headers['content-type']);
      if (res.statusCode === 200) resolve();
      else reject(new Error('Non-200 status'));
    }).on('error', reject);
  });

  // 2. Check meta tags on all 3 locales
  const page = await browser.newPage();
  for (const locale of ['uz', 'ru', 'en']) {
    console.log(`\n--- 2. Checking SEO Metadata on /${locale} ---`);
    await page.goto(`http://localhost:3000/${locale}`, { waitUntil: 'load' });

    const seoData = await page.evaluate(() => {
      const getMeta = (prop, isName = false) => {
        const el = document.querySelector(isName ? `meta[name="${prop}"]` : `meta[property="${prop}"]`);
        return el ? el.getAttribute('content') : null;
      };

      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      const ldJsonEl = document.querySelector('script[type="application/ld+json"]');
      let ldJson = null;
      if (ldJsonEl) {
        try { ldJson = JSON.parse(ldJsonEl.textContent || '{}'); } catch(e) {}
      }

      return {
        title: document.title,
        description: getMeta('description', true),
        keywords: getMeta('keywords', true),
        ogTitle: getMeta('og:title'),
        ogDescription: getMeta('og:description'),
        ogImage: getMeta('og:image'),
        ogUrl: getMeta('og:url'),
        twitterCard: getMeta('twitter:card', true),
        twitterImage: getMeta('twitter:image', true),
        canonical,
        ldJsonValid: Boolean(ldJson && ldJson.name),
        ldJsonImage: ldJson?.image
      };
    });

    console.log(`Title: ${seoData.title}`);
    console.log(`Description: ${seoData.description?.slice(0, 80)}...`);
    console.log(`OG Image: ${seoData.ogImage}`);
    console.log(`Twitter Image: ${seoData.twitterImage}`);
    console.log(`Canonical: ${seoData.canonical}`);
    console.log(`Schema.org Valid: ${seoData.ldJsonValid} (Image: ${seoData.ldJsonImage})`);
  }

  await browser.close();
  console.log('\n✅ SEO verification completed successfully!');
})();
