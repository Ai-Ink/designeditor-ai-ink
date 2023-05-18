import React from 'react';
import {Box} from '@chakra-ui/react';

const EditorContainer = ({children}) => {
  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      flexDirection="column"
      bg="#FFFFFF"
      fontFamily="Poppins"
    >
      {children}
    </Box>
  );
};

export default EditorContainer;
