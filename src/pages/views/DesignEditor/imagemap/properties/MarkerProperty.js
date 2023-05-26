import React from 'react';
import {FormControl} from '@chakra-ui/react';
import IconChooser from '../components/icon/IconChooser';
import {ChakraProvider} from '@chakra-ui/react';

const MarkerProperty = ({canvasRef, form, data}) => {
  const {getFieldDecorator} = form;

  return (
    <>
      <FormControl>
        {getFieldDecorator('icon', {
          initialValue: data.icon,
        })(
          <ChakraProvider>
            <IconChooser icon={data.icon} />
          </ChakraProvider>,
        )}
      </FormControl>
    </>
  );
};

export default MarkerProperty;
