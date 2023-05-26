import React from 'react';
import {
  Grid,
  FormControl,
  FormLabel,
  Select,
  Slider,
  Tag,
} from '@chakra-ui/react';
import {useTranslation} from 'next-i18next';

import Icon from '../components/icon/Icon';
import Fonts from '../components/font/fonts';

const fonts = Fonts.getFonts();

export default function MyForm({canvasRef, form, data}) {
  const {getFieldDecorator} = form;
  const {t} = useTranslation();

  return (
    <>
      <Grid templateColumns="1fr" gap={4}>
        <FormControl>
          <FormLabel>Font Family</FormLabel>
          {getFieldDecorator('fontFamily', {
            initialValue: data.fontFamily,
          })(
            <Select>
              {Object.keys(fonts).map((font) => (
                <optgroup key={font} label={font.toUpperCase()}>
                  {sortBy(fonts[font], ['name']).map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>,
          )}
        </FormControl>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl>
          <FormLabel>Font Size</FormLabel>
          {getFieldDecorator('fontSize', {
            initialValue: data.fontSize || '32',
          })(
            <Select>
              {Array.from({length: 60}, (v, k) => (
                <option key={k} value={`${k + 1}`}>
                  {k + 1}
                </option>
              ))}
            </Select>,
          )}
        </FormControl>
        <FormControl>
          {getFieldDecorator('fontWeight', {
            valuePropName: 'checked',
            initialValue: data.fontWeight === 'bold',
          })(
            <Tag.CheckableTag className="rde-action-tag">
              <Icon name="bold" />
            </Tag.CheckableTag>,
          )}
        </FormControl>
        <FormControl>
          {getFieldDecorator('fontStyle', {
            valuePropName: 'checked',
            initialValue: data.fontStyle === 'italic',
          })(
            <Tag.CheckableTag className="rde-action-tag">
              <Icon name="italic" />
            </Tag.CheckableTag>,
          )}
        </FormControl>
        <FormControl>
          {getFieldDecorator('linethrough', {
            valuePropName: 'checked',
            initialValue: data.linethrough,
          })(
            <Tag.CheckableTag className="rde-action-tag">
              <Icon name="strikethrough" />
            </Tag.CheckableTag>,
          )}
        </FormControl>
        <FormControl>
          {getFieldDecorator('underline', {
            valuePropName: 'checked',
            initialValue: data.underline,
          })(
            <Tag.CheckableTag className="rde-action-tag">
              <Icon name="underline" />
            </Tag.CheckableTag>,
          )}
        </FormControl>
        <FormControl>
          {getFieldDecorator('textAlign.left', {
            valuePropName: 'checked',
            initialValue: data.textAlign === 'left',
          })(
            <Tag.CheckableTag className="rde-action-tag">
              <Icon name="align-left" />
            </Tag.CheckableTag>,
          )}
        </FormControl>
        <FormControl>
          {getFieldDecorator('textAlign.center', {
            valuePropName: 'checked',
            initialValue: data.textAlign === 'center',
          })(
            <Tag.CheckableTag className="rde-action-tag">
              <Icon name="align-center" />
            </Tag.CheckableTag>,
          )}
        </FormControl>
        <FormControl>
          {getFieldDecorator('textAlign.right', {
            valuePropName: 'checked',
            initialValue: data.textAlign === 'right',
          })(
            <Tag.CheckableTag className="rde-action-tag">
              <Icon name="align-right" />
            </Tag.CheckableTag>,
          )}
        </FormControl>
        <FormControl>
          {getFieldDecorator('textAlign.justify', {
            valuePropName: 'checked',
            initialValue: data.textAlign === 'justify',
          })(
            <Tag.CheckableTag className="rde-action-tag">
              <Icon name="align-justify" />
            </Tag.CheckableTag>,
          )}
        </FormControl>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl>
          <FormLabel>Line Height</FormLabel>
          {getFieldDecorator('lineHeight', {
            rules: [
              {
                type: 'number',
              },
            ],
            initialValue: data.lineHeight,
          })(<Slider min={0} max={100} />)}
        </FormControl>
        <FormControl>
          <FormLabel>Char Spacing</FormLabel>
          {getFieldDecorator('charSpacing', {
            rules: [
              {
                type: 'number',
              },
            ],
            initialValue: data.charSpacing,
          })(<Slider min={0} max={100} />)}
        </FormControl>
      </Grid>
    </>
  );
}
