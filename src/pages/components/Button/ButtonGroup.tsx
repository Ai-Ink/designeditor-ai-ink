import {Stack} from '@chakra-ui/react';

const ButtonGroup = ({children, ...rest}) => (
  <Stack direction="row" spacing={2} {...rest}>
    {children}
  </Stack>
);

export default ButtonGroup;
