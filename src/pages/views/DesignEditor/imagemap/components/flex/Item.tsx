import {Box, BoxProps} from '@chakra-ui/react';
import React from 'react';

export interface ItemProps extends BoxProps {
  alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
  order?: number;
  flexGrow?: number | string;
  flexShrink?: number | string;
  flexBasis?: number | string;
  flex?: number | string;
}

const Item: React.FC<ItemProps> = (props) => {
  const {
    alignSelf,
    order,
    flexGrow,
    flexShrink,
    flexBasis,
    flex,
    style,
    children,
    ...other
  } = props;

  const newStyle = {
    alignSelf,
    order,
    flexGrow,
    flexShrink,
    flexBasis,
    flex,
    ...style,
  };

  return (
    <Box {...other} style={newStyle}>
      {children}
    </Box>
  );
};

export default Item;
