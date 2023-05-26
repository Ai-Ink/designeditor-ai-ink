import React from 'react';
import {FormControl, FormLabel, Switch} from '@chakra-ui/react';
import {useTranslation} from 'next-i18next';

export default function MyForm({canvasRef, form, data}) {
  const {getFieldDecorator} = form;
  const {t} = useTranslation();

  return (
    <>
      <FormControl>
        <FormLabel>{t('imagemap.trigger.trigger-enabled')}</FormLabel>
        {getFieldDecorator('trigger.enabled', {
          rules: [{type: 'boolean'}],
          valuePropName: 'checked',
          initialValue: data.trigger.enabled,
        })(<Switch size="sm" />)}
      </FormControl>
    </>
  );
}
