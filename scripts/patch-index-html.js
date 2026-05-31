const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.warn('dist/index.html not found, skipping patch');
  process.exit(0);
}

let html = fs.readFileSync(indexPath, 'utf8');

const darkStyles = `
    <style id="neurodrive-dark">
      html, body { background: #050810 !important; margin: 0; padding: 0; height: 100%; }
      #root { min-height: 100vh; background: radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.06) 0%, transparent 60%), #050810; }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
`;

if (!html.includes('neurodrive-dark')) {
  html = html.replace('</head>', `${darkStyles}</head>`);
  fs.writeFileSync(indexPath, html);
  console.log('Patched dist/index.html with dark theme styles');
}
