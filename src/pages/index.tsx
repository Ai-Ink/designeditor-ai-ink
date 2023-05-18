import React from 'react';
import {Button} from '@chakra-ui/react';

export const sum = (a, b) => a + b;

const Index = () => {
  return (
    <div>
      <Button onClick={() => console.log('hey')}>Hello</Button>
      <p style={{color: 'blue'}}>Styled by hook</p>
    </div>
  );
};

export default Index;
