import ReactDOM from 'react-dom/client';
import Provider from './Provider';
import Router from './Router';
import Container from './Container';
import './styles/styles.css';
import {useEffect, useState} from 'react';
import {ChakraProvider} from '@chakra-ui/react';

// 1. Import the extendTheme function
import {extendTheme} from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

export const theme = extendTheme({colors});

function MyApp({Component, pageProps}) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? (
    <ChakraProvider theme={theme}>
      <Provider>
        <Container>
          <Router />
        </Container>
      </Provider>
    </ChakraProvider>
  ) : null;
}

export default MyApp;
