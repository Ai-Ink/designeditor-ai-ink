import React from 'react';
import {
  FormControl,
  FormLabel,
  Switch,
  Input,
  InputGroup,
  InputRightElement,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Grid,
} from '@chakra-ui/react';
import {useState} from 'react';
import i18n from 'i18next';

const GeneralProperty = {
  render(canvasRef, form, data) {
    const {getFieldProps} = form;
    const [width, setWidth] = useState(parseInt(data.width * data.scaleX, 10));
    const [height, setHeight] = useState(
      parseInt(data.height * data.scaleY, 10),
    );

    const handleWidthChange = (value) => {
      setWidth(value);
    };

    const handleHeightChange = (value) => {
      setHeight(value);
    };

    return (
      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="locked">{i18n.t('common.locked')}</FormLabel>
            <Switch
              id="locked"
              {...getFieldProps('locked', {initialValue: data.locked})}
              size="sm"
            />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="visible">{i18n.t('common.visible')}</FormLabel>
            <Switch
              id="visible"
              {...getFieldProps('visible', {initialValue: data.visible})}
              size="sm"
            />
          </FormControl>
        </Grid>

        <FormControl>
          <FormLabel htmlFor="name">{i18n.t('common.name')}</FormLabel>
          <Input
            id="name"
            {...getFieldProps('name', {initialValue: data.name})}
          />
        </FormControl>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <FormControl>
            <FormLabel htmlFor="width">{i18n.t('common.width')}</FormLabel>
            <InputGroup size="sm">
              <Input
                id="width"
                value={width}
                onChange={(e) =>
                  handleWidthChange(parseInt(e.target.value, 10))
                }
                {...getFieldProps('width', {
                  rules: [
                    {
                      type: 'number',
                      required: true,
                      message: 'Please input width',
                      min: 1,
                    },
                  ],
                  initialValue: parseInt(data.width * data.scaleX, 10),
                })}
              />
              <InputRightElement></InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="height">{i18n.t('common.height')}</FormLabel>
            <InputGroup size="sm">
              <Input
                id="height"
                value={height}
                onChange={(e) =>
                  handleHeightChange(parseInt(e.target.value, 10))
                }
                {...getFieldProps('height', {
                  rules: [
                    {
                      type: 'number',
                      required: true,
                      message: 'Please input height',
                      min: 1,
                    },
                  ],
                  initialValue: parseInt(data.height * data.scaleY, 10),
                })}
              />
              <InputRightElement children="px" />
            </InputGroup>
          </FormControl>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <FormControl>
            <FormLabel htmlFor="left">{i18n.t('common.left')}</FormLabel>
            <Input
              id="left"
              {...getFieldProps('left', {initialValue: data.left})}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="top">{i18n.t('common.top')}</FormLabel>
            <Input
              id="top"
              {...getFieldProps('top', {initialValue: data.top})}
            />
          </FormControl>
        </Grid>

        {data.superType === 'element' ? null : (
          <FormControl>
            <FormLabel htmlFor="angle">{i18n.t('common.angle')}</FormLabel>
            <Slider
              id="angle"
              min={0}
              max={360}
              {...getFieldProps('angle', {
                rules: [
                  {
                    type: 'number',
                    required: true,
                    message: 'Please input rotation',
                  },
                ],
                initialValue: data.angle,
              })}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
        )}
      </Box>
    );
  },
};

export default GeneralProperty;
