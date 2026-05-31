import React, { useEffect } from 'react';
import { Platform } from 'react-native';

const GLOBAL_CSS = `
:root {
  --bg-primary: #050810;
  --bg-secondary: #0A0F1E;
  --bg-card: #0D1526;
  --bg-card-hover: #111D35;
  --accent-blue: #0EA5E9;
  --accent-cyan: #06B6D4;
  --accent-glow: rgba(14, 165, 233, 0.15);
  --green: #10B981;
  --yellow: #F59E0B;
  --red: #EF4444;
  --text-primary: #F0F4FF;
  --text-secondary: #8B9CC8;
  --border: rgba(255,255,255,0.06);
  --border-accent: rgba(14, 165, 233, 0.3);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  height: 100%;
  background: var(--bg-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: var(--bg-primary);
}
::-webkit-scrollbar-thumb {
  background: rgba(14, 165, 233, 0.3);
  border-radius: 4px;
}

#root {
  display: flex;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.06) 0%, transparent 60%), #050810;
}

#root > div {
  width: 100%;
  max-width: 480px;
}

* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
`;

export function WebGlobalStyles() {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.id = 'neurodrive-global';
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);

    return () => {
      link.remove();
      style.remove();
    };
  }, []);

  return null;
}
