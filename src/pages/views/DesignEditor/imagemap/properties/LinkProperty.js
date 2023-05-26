import React from 'react';
import {useForm} from 'react-hook-form';
import {FormLabel, Switch, Select, Input} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

export default function LinkForm({canvasRef, data}) {
  const {register, handleSubmit} = useForm();
  const {t} = useTranslation();

  const onSubmit = (formData) => {
    console.log(formData); // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>{t('imagemap.link.link-enabled')}</FormLabel>
      <Switch
        {...register('link.enabled', {required: true})}
        size="sm"
        defaultChecked={data.link.enabled}
      />

      {data.link.enabled && (
        <>
          <FormLabel>{t('common.state')}</FormLabel>
          <Select
            defaultValue={data.link.state || 'current'}
            {...register('link.state')}
          >
            <option value="current">{t('common.current')}</option>
            <option value="new">{t('common.new')}</option>
          </Select>

          <FormLabel>{t('common.url')}</FormLabel>
          <Input
            defaultValue={data.link.url || ''}
            {...register('link.url', {required: true})}
          />
        </>
      )}

      <button type="submit">{t('common.submit')}</button>
    </form>
  );
}
