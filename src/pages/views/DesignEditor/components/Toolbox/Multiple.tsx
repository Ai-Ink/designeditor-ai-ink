import {Box, Flex} from '@chakra-ui/react';
import Common from './Common';

const Multiple = () => {
  return (
    <Flex
      flex={1}
      alignItems="center"
      padding="0 12px"
      justifyContent="space-between"
    >
      <Box>Multiple</Box>
      <Common />
    </Flex>
  );
};

export default Multiple;
