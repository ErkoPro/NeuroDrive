import React, { useEffect } from 'react';
import { Platform } from 'react-native';

const GLOBAL_CSS = `
:root {
  --bg-primary: #050810;
  --bg-secondary: #0A0F1E;
  --bg-card: #0D1526;
  --accent-blue: #0EA5E9;
  --accent-cyan: #06B6D4;
  --text-primary: #F0F4FF;
  --text-secondary: #8B9CC8;
  --border: rgba(255,255,255,0.06);
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #050810;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
}

#root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.06) 0%, transparent 60%), #050810;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #050810;
}
::-webkit-scrollbar-thumb {
  background: rgba(14, 165, 233, 0.3);
  border-radius: 4px;
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
