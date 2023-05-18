import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import Common from './Common';
import Flip from './Shared/Flip';

const Image = () => {
  return (
    <Flex
      flex={1}
      alignItems="center"
      padding="0 12px"
      justifyContent="space-between"
    >
      <Box>
        <Flip />
      </Box>
      <Common />
    </Flex>
  );
};

export default Image;
