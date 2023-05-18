import React from 'react';
import {Box, ChakraProvider} from '@chakra-ui/react';
import Common from './Common';
import Scenes from './Scenes';

const Container = (props) => {
  return <Box bg="white" {...props} />;
};

const Presentation = () => {
  return (
    <ChakraProvider>
      <Container>
        <Scenes />
        <Common />
      </Container>
    </ChakraProvider>
  );
};

export default Presentation;
