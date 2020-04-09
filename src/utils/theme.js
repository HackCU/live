import React from 'react';
import { ThemeProvider } from 'theme-ui';
import presetTheme from '@rebass/preset';

const theme = {
  ...presetTheme,
  useCustomProperties: true,
  initialColorMode: 'light',
  colors: {
    ...presetTheme.colors,
    text: '#000',
    textDark: '#f2f2f2',
    background: '#fff',
    primary: '#4285F4',
    secondary: '#22292c',
    tertiary: '#DB4437',
    modes: {
      dark: {
        text: '#fff',
        textDark: '#0d0d0d',
        background: '#353C51', // https://www.schemecolor.com/mojave-dark-mode-wallpaper.php,
        secondary: '#ddd6d3'
      }
    }
  },
  fonts: {
    ...presetTheme.fonts,
    heading: "'Biko', sans-serif",
    body: "'Roboto', sans-serif"
  },
  shadows: {
    ...presetTheme.shadows
    // list: '0px 0px 20px rgba(0, 0, 0, 0.1)'
  },
  variants: {
    ...presetTheme.variants,
    link: {
      ...presetTheme.link,
      textDecoration: 'none',
      color: 'primary'
    },
    darkCard: {
      p: 3,
      bg: 'secondary',
      boxShadow: 'card',
      color: 'text',
      borderRadius: '0 0 2px 2px'
    },
    outline: {
      border: '1px solid #e0e0e0'
    }
  },
  text: {
    // Heading and Text variants
    subtitle: {
      as: 'h2',
      fontSize: 5
    },
    cardTitle: {
      as: 'h3',
      fontWeight: 500
    }
  }
};

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);
