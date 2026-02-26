const fs = require('fs');
const path = require('path');

const widths = [300, 450, 250, 400, 350, 500, 280, 420, 320, 380];
const height = 300; // Fixed height for proportion

const dirs = [
    path.join(__dirname, 'public/img/evidencia/fila1'),
    path.join(__dirname, 'public/img/evidencia/fila2')
];

dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

dirs.forEach((dir, dirIdx) => {
    widths.forEach((w, i) => {
        const color = dirIdx === 0 ? '4ade80' : '60a5fa'; // green for fila1, blue for fila2
        const svg = `<svg width="${w}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${color}" rx="24"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#ffffff" font-weight="bold">Prueba ${dirIdx + 1}.${i + 1}</text>
    </svg>`;
        fs.writeFileSync(path.join(dir, `img_${i + 1}.svg`), svg);
    });
});
console.log('Images generated successfully!');
