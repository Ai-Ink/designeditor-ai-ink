import React from 'react';
import {FormLabel, FormControl, Radio, Box, Flex} from '@chakra-ui/react';
import {Input} from '@chakra-ui/react';
import i18n from 'i18next';

const MapProperty = ({canvasRef, form, data}) => {
  const {getFieldDecorator} = form;
  if (!data) {
    return null;
  }
  const layout = data.layout || 'fixed';

  return (
    <>
      <FormControl>
        <FormLabel>{i18n.t('common.name')}</FormLabel>
        {getFieldDecorator('name', {
          rules: [
            {
              required: false,
              message: i18n.t('validation.enter-arg', {
                arg: i18n.t('common.name'),
              }),
            },
          ],
          initialValue: data.name || '',
        })(<Input />)}
      </FormControl>
      <FormControl>
        <FormLabel>{i18n.t('common.layout')}</FormLabel>
        {getFieldDecorator('layout', {
          initialValue: layout,
        })(
          <Radio.Group size="sm">
            <Radio value="fixed">{i18n.t('common.fixed')}</Radio>
            <Radio value="responsive">{i18n.t('common.responsive')}</Radio>
            <Radio value="fullscreen">{i18n.t('common.fullscreen')}</Radio>
          </Radio.Group>,
        )}
      </FormControl>
      {layout === 'fixed' && (
        <Flex>
          <Box flex={1}>
            <FormControl>
              <FormLabel>{i18n.t('common.width')}</FormLabel>
              {getFieldDecorator('width', {
                rules: [
                  {
                    required: true,
                    message: i18n.t('validation.enter-arg', {
                      arg: i18n.t('common.width'),
                    }),
                  },
                ],
                initialValue: data.width * data.scaleX,
              })(<Input type="number" />)}
            </FormControl>
          </Box>
          <Box flex={1}>
            <FormControl>
              <FormLabel>{i18n.t('common.height')}</FormLabel>
              {getFieldDecorator('height', {
                rules: [
                  {
                    required: true,
                    message: i18n.t('validation.enter-arg', {
                      arg: i18n.t('common.height'),
                    }),
                  },
                ],
                initialValue: data.height * data.scaleY,
              })(<Input type="number" />)}
            </FormControl>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default MapProperty;
