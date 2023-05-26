import React from 'react';
import {FormControl} from '@chakra-ui/react';

const ElementProperty = {
  render(canvasRef, form, data) {
    const {getFieldDecorator} = form;
    if (!data) {
      return null;
    }
    return (
      <FormControl>
        <FormControl></FormControl>
      </FormControl>
    );
  },
};

export default ElementProperty;
