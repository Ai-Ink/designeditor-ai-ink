import React from 'react';
import {Provider as ScenifyProvider} from '@/canvascore/react';
import {store} from './store/store';
import {Provider as ReduxProvier} from 'react-redux';
import {AppProvider} from './contexts/AppContext';
import {DesignEditorProvider} from './contexts/DesignEditor';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import './translations';

// 1. Import the extendTheme function
import {CSSReset, ChakraProvider, extendTheme} from '@chakra-ui/react';

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
};

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  breakpoints,
  colors: {
    primary: {
      100: '#F5F7FA',
      200: '#E4E7EB',
      300: '#CBD2D9',
      400: '#9AA5B1',
      500: '#7B8794',
      600: '#616E7C',
      700: '#52606D',
      800: '#3E4C59',
      900: '#323F4B',
    },
    custom: {
      blackButtonText: '#FFFFFF',
      blackButtonBg: '#000000',
    },
  },
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
  },
});

const Provider = ({children}: {children: React.ReactNode}) => {
  return (
    <ReduxProvier store={store}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <DesignEditorProvider>
          <AppProvider>
            <ScenifyProvider>
              <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
            </ScenifyProvider>
          </AppProvider>
        </DesignEditorProvider>
      </ChakraProvider>
    </ReduxProvier>
  );
};

export default Provider;
