import React from 'react';
import {Box} from '@chakra-ui/react';
import Common from './Common';
import Scenes from './Scenes';

const Container = ({children}) => {
  return <Box bg="white">{children}</Box>;
};

const Graphic = () => {
  return (
    <Container>
      <Scenes />
      <Common />
    </Container>
  );
};

export default Graphic;
