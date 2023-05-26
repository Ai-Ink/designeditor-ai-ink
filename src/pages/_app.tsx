import Provider from './Provider';
import Router from './Router';
import Container from './Container';
import './styles/styles.css';
import {useEffect, useState} from 'react';

import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function MyApp({Component, pageProps}) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? (
    <Provider>
      <Container>
        <Router />
      </Container>
    </Provider>
  ) : null;
}

export default MyApp;
