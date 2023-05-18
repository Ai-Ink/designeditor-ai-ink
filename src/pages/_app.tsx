import ReactDOM from 'react-dom/client';
import Provider from './Provider';
import Router from './Router';
import Container from './Container';
import './styles/styles.css';
import {useEffect, useState} from 'react';
import {CSSReset, ChakraProvider} from '@chakra-ui/react';

// 1. Import the extendTheme function
import {extendTheme} from '@chakra-ui/react';

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

function MyApp({Component, pageProps}) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Provider>
        <Container>
          <Router />
        </Container>
      </Provider>
    </ChakraProvider>
  ) : null;
}

export default MyApp;
