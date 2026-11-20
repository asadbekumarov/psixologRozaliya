const fs = require('fs');

let html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Reels and Trainings</title></head><body style="background:#1a1a1a;color:#eee;font-family:sans-serif;padding:20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;">';
['reels/reel-1.jpg', 'reels/reel-2.jpg', 'reels/reel-3.jpg', 'reels/reel-4.jpg', 'training/training-1.jpg', 'training/training-2.jpg', 'training/training-3.jpg'].forEach(img => {
  html += `<div style="background:#222;padding:8px;border-radius:8px;text-align:center;">
    <img src="/images/${img}" style="width:100%;height:220px;object-fit:cover;border-radius:4px;">
    <div style="margin-top:6px;font-size:12px;">${img}</div>
  </div>`;
});
html += '</body></html>';
fs.writeFileSync('public/reels-preview.html', html);
