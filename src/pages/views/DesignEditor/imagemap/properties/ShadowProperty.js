import React from 'react';
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Switch as ChakraSwitch,
  Slider as ChakraSlider,
} from '@chakra-ui/react';
import {useTranslation} from 'next-i18next';

import ColorPicker from '../components/common/ColorPicker';

export default function MyForm({canvasRef, form, data}) {
  const {getFieldDecorator} = form;
  const {t} = useTranslation();

  const enabled = data.shadow ? data.shadow.enabled || false : false;

  return (
    <ChakraProvider>
      <>
        <FormControl>
          <FormLabel>{t('imagemap.shadow.shadow-enabled')}</FormLabel>
          {getFieldDecorator('shadow.enabled', {
            valuePropName: 'checked',
            initialValue: enabled,
          })(<ChakraSwitch size="sm" />)}
        </FormControl>
        {enabled && (
          <>
            <FormControl>
              <FormLabel>{t('common.color')}</FormLabel>
              {getFieldDecorator('shadow.color', {
                initialValue: data.shadow.color || 'rgba(0, 0, 0, 0)',
              })(<ColorPicker />)}
            </FormControl>
            <FormControl>
              <FormLabel>{t('common.blur')}</FormLabel>
              {getFieldDecorator('shadow.blur', {
                rules: [
                  {
                    type: 'number',
                    min: 0,
                    max: 100,
                  },
                ],
                initialValue: data.shadow.blur || 15,
              })(
                <ChakraSlider min={0} max={100}>
                  <ChakraSlider.Track>
                    <ChakraSlider.FilledTrack />
                  </ChakraSlider.Track>
                  <ChakraSlider.Thumb />
                </ChakraSlider>,
              )}
            </FormControl>
            <FormControl>
              <FormLabel>{t('imagemap.shadow.offset-x')}</FormLabel>
              {getFieldDecorator('shadow.offsetX', {
                rules: [
                  {
                    type: 'number',
                    min: 0,
                    max: 100,
                  },
                ],
                initialValue: data.shadow.offsetX || 10,
              })(
                <ChakraSlider min={0} max={100}>
                  <ChakraSlider.Track>
                    <ChakraSlider.FilledTrack />
                  </ChakraSlider.Track>
                  <ChakraSlider.Thumb />
                </ChakraSlider>,
              )}
            </FormControl>
            <FormControl>
              <FormLabel>{t('imagemap.shadow.offset-y')}</FormLabel>
              {getFieldDecorator('shadow.offsetY', {
                rules: [
                  {
                    type: 'number',
                    min: 0,
                    max: 100,
                  },
                ],
                initialValue: data.shadow.offsetY || 10,
              })(
                <ChakraSlider min={0} max={100}>
                  <ChakraSlider.Track>
                    <ChakraSlider.FilledTrack />
                  </ChakraSlider.Track>
                  <ChakraSlider.Thumb />
                </ChakraSlider>,
              )}
            </FormControl>
          </>
        )}
      </>
    </ChakraProvider>
  );
}
