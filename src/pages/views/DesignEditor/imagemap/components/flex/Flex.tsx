import {Box, BoxProps} from '@chakra-ui/react';
import Item from './Item';

interface FlexProps extends BoxProps {
  flexDirection?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
  flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap';
  flexFlow?: string;
  justifyContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
  alignContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'stretch';
  alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
  order?: number;
  flexGrow?: number | string;
  flexShrink?: number | string;
  flexBasis?: number | string;
  flex?: number | string;
}

const Flex: React.FC<FlexProps> = (props) => {
  const {
    flexDirection,
    flexWrap,
    flexFlow,
    justifyContent,
    alignItems,
    alignContent,
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
    display: 'flex',
    flexDirection,
    flexWrap,
    flexFlow,
    justifyContent,
    alignItems,
    alignContent,
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

Flex.Item = Item;

export default Flex;
