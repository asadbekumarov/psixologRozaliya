const fs = require('fs');

let html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Gallery</title></head><body style="background:#1a1a1a;color:#eee;font-family:sans-serif;padding:20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;">';
for (let i = 1; i <= 26; i++) {
  const num = String(i).padStart(2, '0');
  html += `<div style="background:#222;padding:8px;border-radius:8px;text-align:center;">
    <img src="/images/gallery/gallery-${num}.webp" style="width:100%;height:180px;object-fit:cover;border-radius:4px;">
    <div style="margin-top:6px;font-size:12px;">gallery-${num}.webp</div>
  </div>`;
}
html += '</body></html>';
fs.writeFileSync('public/gallery-preview.html', html);
console.log('Created public/gallery-preview.html');
