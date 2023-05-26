import React from 'react';
import {FormControl} from '@chakra-ui/react';
import UrlModal from '../../../components/common/UrlModal';

const CustomForm = {
  render(canvasRef, form, data) {
    const {getFieldDecorator} = form;
    if (!data) {
      return null;
    }
    return (
      <FormControl>
        {getFieldDecorator('src', {
          rules: [
            {
              required: true,
              message: 'Please select image',
            },
          ],
          initialValue: data.src,
        })(<UrlModal form={form} />)}
      </FormControl>
    );
  },
};

export default CustomForm;
