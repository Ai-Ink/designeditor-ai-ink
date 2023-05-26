import React from 'react';
import {
  FormLabel,
  Input,
  Slider,
  Grid,
  FormControl,
  InputNumber,
} from '@chakra-ui/react';

const CustomForm = {
  render(canvasRef, form, data) {
    const {getFieldDecorator} = form;
    return (
      <>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            {...getFieldDecorator('name', {
              initialValue: data.name,
            })}
          />
        </FormControl>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <FormControl>
            <FormLabel>Width</FormLabel>
            <InputNumber
              {...getFieldDecorator('width', {
                rules: [
                  {
                    required: true,
                    message: 'Please input width',
                  },
                ],
                initialValue: data.width * data.scaleX,
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Height</FormLabel>
            <InputNumber
              {...getFieldDecorator('height', {
                rules: [
                  {
                    required: true,
                    message: 'Please input height',
                  },
                ],
                initialValue: data.height * data.scaleY,
              })}
            />
          </FormControl>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <FormControl>
            <FormLabel>Left</FormLabel>
            <InputNumber
              {...getFieldDecorator('left', {
                rules: [
                  {
                    required: true,
                    message: 'Please input x position',
                  },
                ],
                initialValue: data.left,
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Top</FormLabel>
            <InputNumber
              {...getFieldDecorator('top', {
                rules: [
                  {
                    required: true,
                    message: 'Please input y position',
                  },
                ],
                initialValue: data.top,
              })}
            />
          </FormControl>
        </Grid>
        <FormControl>
          <FormLabel>Rotation</FormLabel>
          <Slider
            {...getFieldDecorator('angle', {
              rules: [
                {
                  type: 'number',
                  required: true,
                  message: 'Please input rotation',
                },
              ],
              initialValue: data.angle,
            })}
            min={0}
            max={360}
          />
        </FormControl>
      </>
    );
  },
};

export default CustomForm;
