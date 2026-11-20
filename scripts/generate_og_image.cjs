const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1
  });

  const portraitBuffer = fs.readFileSync('public/images/hero/rozaliya-hero.webp');
  const portraitBase64 = `data:image/webp;base64,${portraitBuffer.toString('base64')}`;

  const html = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: radial-gradient(ellipse 85% 75% at 85% 30%, rgba(200, 109, 81, 0.28) 0%, rgba(22, 56, 50, 0) 70%),
                  radial-gradient(ellipse 60% 50% at 15% 85%, rgba(200, 109, 81, 0.15) 0%, rgba(22, 56, 50, 0) 65%),
                  #163832;
      color: #F7F3EB;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      position: relative;
    }

    .border-frame {
      position: absolute;
      inset: 20px;
      border: 1px solid rgba(247, 243, 235, 0.12);
      border-radius: 24px;
      pointer-events: none;
      z-index: 30;
    }

    .container {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 56px 64px;
      position: relative;
      z-index: 10;
    }

    .left-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 48px;
    }

    .top-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .monogram {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1.5px solid rgba(200, 109, 81, 0.6);
      background: rgba(200, 109, 81, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 700;
      color: #F7F3EB;
      letter-spacing: 0.05em;
    }

    .kicker-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #E28C74;
      font-weight: 600;
    }

    .kicker-rule {
      width: 36px;
      height: 1px;
      background: rgba(200, 109, 81, 0.5);
    }

    .main-content {
      margin-top: auto;
      margin-bottom: auto;
      padding: 16px 0;
    }

    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: 54px;
      font-weight: 600;
      line-height: 1.08;
      letter-spacing: -0.02em;
      color: #FAF7F2;
      margin-bottom: 14px;
    }

    .quote-highlight {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 24px;
      color: #E28C74;
      line-height: 1.25;
      margin-bottom: 16px;
      font-weight: 400;
    }

    .hero-desc {
      font-size: 17px;
      line-height: 1.55;
      color: #D3CDC2;
      max-width: 580px;
      font-weight: 400;
    }

    .badges-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }

    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      padding: 7px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      color: #FAF7F2;
      letter-spacing: 0.02em;
    }

    .badge-pill.highlight {
      background: rgba(200, 109, 81, 0.2);
      border-color: rgba(200, 109, 81, 0.45);
      color: #F7D6CC;
    }

    .badge-pill.insta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #E28C74;
      background: rgba(200, 109, 81, 0.1);
      border-color: rgba(200, 109, 81, 0.3);
    }

    .right-col {
      width: 420px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .arch-backdrop {
      position: absolute;
      width: 360px;
      height: 480px;
      border-radius: 180px 180px 32px 32px;
      border: 1.5px solid rgba(226, 140, 116, 0.35);
      transform: translate(12px, 12px);
      z-index: 1;
    }

    .arch-frame {
      position: relative;
      width: 360px;
      height: 480px;
      border-radius: 180px 180px 32px 32px;
      overflow: hidden;
      border: 1.5px solid rgba(247, 243, 235, 0.3);
      box-shadow: 0 24px 50px rgba(0, 0, 0, 0.45);
      background: #1b423b;
      z-index: 2;
    }

    .arch-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
    }

    .arch-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(22, 56, 50, 0.95) 0%, rgba(22, 56, 50, 0.25) 30%, transparent 60%);
      pointer-events: none;
    }

    .arch-tag {
      position: absolute;
      bottom: 20px;
      left: 20px;
      right: 20px;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .arch-tag .name {
      color: #FAF7F2;
      font-family: 'Playfair Display', serif;
      font-size: 14px;
      letter-spacing: 0.04em;
    }

    .arch-tag .status {
      color: #E28C74;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #E28C74;
    }
  </style>
</head>
<body>
  <div class="border-frame"></div>
  <div class="container">
    <div class="left-col">
      <div class="top-brand">
        <div class="monogram">RG</div>
        <div class="kicker-pill">
          <span>KBT Psixolog · Oila & Bola Tarbiyasi</span>
          <div class="kicker-rule"></div>
        </div>
      </div>

      <div class="main-content">
        <h1 class="hero-title">Rozaliya Gabdulhakova</h1>
        <div class="quote-highlight">«Ilm va qadriyatlar uyg'unligida qalb xotirjamligi»</div>
        <p class="hero-desc">
          KBT (kognitiv-xulq-atvor terapiyasi) asosida ayollar va onalar uchun oilaviy munosabatlar hamda farzand tarbiyasi bo'yicha individual konsultatsiyalar va mualliflik kurslari.
        </p>
      </div>

      <div class="badges-row">
        <div class="badge-pill highlight">✦ 8+ yil tajriba</div>
        <div class="badge-pill">✦ 100% maxfiylik</div>
        <div class="badge-pill">✦ Toshkent & Onlayn</div>
        <div class="badge-pill insta">@psixolog_rozaliya</div>
      </div>
    </div>

    <div class="right-col">
      <div class="arch-backdrop"></div>
      <div class="arch-frame">
        <img class="arch-img" src="${portraitBase64}" alt="Rozaliya Gabdulhakova">
        <div class="arch-gradient"></div>
        <div class="arch-tag">
          <span class="name">Rozaliya G.</span>
          <span class="status"><span class="status-dot"></span> Qabul ochiq</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Output paths
  const ogRoot = path.resolve('public/og-image.png');
  const ogBrandPng = path.resolve('public/images/brand/og-image.png');
  const ogBrandJpg = path.resolve('public/images/brand/og-image.jpg');

  await page.screenshot({ path: ogRoot, type: 'png' });
  await page.screenshot({ path: ogBrandPng, type: 'png' });
  await page.screenshot({ path: ogBrandJpg, type: 'jpeg', quality: 90 });

  console.log('✅ Generated pristine OpenGraph images with embedded portrait:');
  console.log(' - ' + ogRoot);
  console.log(' - ' + ogBrandPng);
  console.log(' - ' + ogBrandJpg);

  await browser.close();
})();
