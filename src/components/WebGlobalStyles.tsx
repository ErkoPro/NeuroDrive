import React, { useEffect } from 'react';
import { Platform } from 'react-native';

const GLOBAL_CSS = `
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #050810 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
}

#root {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.06) 0%, transparent 60%), #050810;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #050810; }
::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.3); border-radius: 4px; }
`;

export function WebGlobalStyles() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;

    document.documentElement.style.background = '#050810';
    document.body.style.background = '#050810';

    let link = document.getElementById('inter-font') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = 'inter-font';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    let style = document.getElementById('neurodrive-global') as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = 'neurodrive-global';
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);

  return null;
}
