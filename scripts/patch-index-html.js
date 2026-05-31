const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.warn('dist/index.html not found, skipping patch');
  process.exit(0);
}

let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace(/<style id="neurodrive-dark">[\s\S]*?<\/style>/g, '');
html = html.replace(/<link rel="preconnect" href="https:\/\/fonts.googleapis.com" \/>/g, '');
html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>/g, '');

const injection = `
    <style id="neurodrive-dark">
      html, body {
        background: #050810 !important;
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: auto;
      }
      body { overflow: auto !important; }
      #root {
        display: flex !important;
        flex-direction: column !important;
        flex: 1 !important;
        min-height: 100vh !important;
        height: 100% !important;
        width: 100% !important;
        max-width: 480px;
        margin: 0 auto;
        background: radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.06) 0%, transparent 60%), #050810;
      }
      #root > div {
        display: flex !important;
        flex-direction: column !important;
        flex: 1 !important;
        min-height: 100vh !important;
        width: 100% !important;
      }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
`;

html = html.replace('</head>', `${injection}</head>`);
fs.writeFileSync(indexPath, html);
console.log('Patched dist/index.html');
