import {Box} from '@chakra-ui/react';
import Scrollbars from '@layerhub-io/react-custom-scrollbar';
import React from 'react';

export default function ({
  children,
  autoHide,
}: {
  children: React.ReactNode;
  autoHide?: boolean;
}) {
  return (
    <Box flex={1} position="relative">
      <Box height="100%" width="100%" position="absolute" overflow="hidden">
        <Scrollbars autoHide={autoHide}>{children}</Scrollbars>
      </Box>
    </Box>
  );
}
