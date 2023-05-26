import React from 'react';
import {FormControl, FormLabel, Switch} from '@chakra-ui/react';
import {useTranslation} from 'next-i18next';

export default function MyForm({canvasRef, form, data}) {
  const {getFieldDecorator} = form;
  const {t} = useTranslation();

  if (!data) {
    return null;
  }

  return (
    <FormControl>
      <FormLabel>{t('imagemap.tooltip.tooltip-enabled')}</FormLabel>
      {getFieldDecorator('tooltip.enabled', {
        rules: [{type: 'boolean'}],
        valuePropName: 'checked',
        initialValue: data.tooltip.enabled,
      })(<Switch size="sm" />)}
    </FormControl>
  );
}
