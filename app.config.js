export default {
  expo: {
    name: 'NeuroDrive',
    slug: 'NeuroDrive',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      bundler: 'metro',
      favicon: './assets/favicon.png',
      name: 'NeuroDrive',
      shortName: 'NeuroDrive',
      description: 'AI-powered driver safety ecosystem',
      themeColor: '#0A0E17',
      backgroundColor: '#0A0E17',
    },
  },
};
