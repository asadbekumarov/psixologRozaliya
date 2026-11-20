const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Helper to process image via HTML Canvas
  async function cropAndSaveWebP(sourceFilePath, outFilePath, targetW, targetH, cropOpts = {}) {
    const fileUrl = 'file:///' + path.resolve(sourceFilePath).replace(/\\/g, '/');
    await page.goto(fileUrl);
    
    const dataUrl = await page.evaluate(({ targetW, targetH, cropOpts }) => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      // Source crop box
      const targetRatio = targetW / targetH;
      let sW, sH, sX, sY;

      if (imgW / imgH > targetRatio) {
        // Image is wider than target
        sH = imgH;
        sW = imgH * targetRatio;
        sX = (imgW - sW) * (cropOpts.focalX ?? 0.5);
        sY = 0;
      } else {
        // Image is taller than target
        sW = imgW;
        sH = imgW / targetRatio;
        sX = 0;
        sY = (imgH - sH) * (cropOpts.focalY ?? 0.15); // focal point towards face
      }

      ctx.drawImage(img, sX, sY, sW, sH, 0, 0, targetW, targetH);
      return canvas.toDataURL('image/webp', 0.92);
    }, { targetW, targetH, cropOpts });

    const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
    fs.writeFileSync(outFilePath, Buffer.from(base64Data, 'base64'));
    console.log(`Saved ${outFilePath} (${targetW}x${targetH})`);
  }

  const portraitSrc = 'public/images/expert/dinna-portrait.jpg';

  // 1. Hero portrait (4:5 ratio, 960x1200)
  await cropAndSaveWebP(
    portraitSrc,
    'public/images/hero/rozaliya-hero.webp',
    960,
    1200,
    { focalY: 0.1 }
  );

  // 2. Expert portrait (3:4 ratio, 900x1200)
  await cropAndSaveWebP(
    portraitSrc,
    'public/images/expert/rozaliya-expert.webp',
    900,
    1200,
    { focalY: 0.05 }
  );

  // 3. Consultation card background: Use high-res delicate white roses (diagnostic-bg.webp)
  // or gallery-09 floral bouquet with rich softness instead of the text screenshot
  await cropAndSaveWebP(
    'public/images/gallery/gallery-09.webp',
    'public/images/cta/consultation-bg.webp',
    1200,
    800,
    { focalX: 0.5, focalY: 0.4 }
  );

  await browser.close();
  console.log('All image preparations complete!');
})();
