import React from 'react';
import {
  FormControl,
  FormLabel,
  Slider,
  Select,
  InputNumber,
  Grid,
} from '@chakra-ui/react';
import {useTranslation} from 'next-i18next';

import ColorPicker from '../components/common/ColorPicker';

export default function MyForm({canvasRef, form, data}) {
  const {getFieldDecorator} = form;
  const {t} = useTranslation();

  return (
    <>
      <FormControl>
        <FormLabel>{t('imagemap.style.fill-color')}</FormLabel>
        {getFieldDecorator('fill', {
          initialValue: data.fill || 'rgba(0, 0, 0, 1)',
        })(<ColorPicker />)}
      </FormControl>
      <FormControl>
        <FormLabel>{t('common.opacity')}</FormLabel>
        {getFieldDecorator('opacity', {
          rules: [
            {
              type: 'number',
              min: 0,
              max: 1,
            },
          ],
          initialValue: data.opacity || 1,
        })(<Slider min={0} max={1} step={0.1} />)}
      </FormControl>
      <FormControl>
        <FormLabel>{t('imagemap.style.stroke-color')}</FormLabel>
        {getFieldDecorator('stroke', {
          initialValue: data.stroke || 'rgba(255, 255, 255, 0)',
        })(<ColorPicker />)}
      </FormControl>
      <FormControl>
        <FormLabel>{t('imagemap.style.stroke-width')}</FormLabel>
        {getFieldDecorator('strokeWidth', {
          initialValue: data.strokeWidth || 1,
        })(
          <Select>
            {Array.from({length: 12}, (v, k) => {
              const value = k + 1;
              return (
                <Select.Option key={value} value={value}>
                  {value}
                </Select.Option>
              );
            })}
          </Select>,
        )}
      </FormControl>
      {data.type === 'rect' && (
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <FormControl>
            <FormLabel>{t('imagemap.style.rx')}</FormLabel>
            {getFieldDecorator('rx', {
              initialValue: data.rx || 0,
            })(<InputNumber min={0} />)}
          </FormControl>
          <FormControl>
            <FormLabel>{t('imagemap.style.ry')}</FormLabel>
            {getFieldDecorator('ry', {
              initialValue: data.ry || 0,
            })(<InputNumber min={0} />)}
          </FormControl>
        </Grid>
      )}
    </>
  );
}
