import React from 'react';
import {FormControl} from '@chakra-ui/react';
import EditTable from '../components/common/EditTable';

export default function MyForm({canvasRef, form, data}) {
  const {getFieldDecorator} = form;

  return (
    <>
      <FormControl>
        {getFieldDecorator(
          'userProperty',
          {},
        )(<EditTable userProperty={data.userProperty} form={form} />)}
      </FormControl>
    </>
  );
}
