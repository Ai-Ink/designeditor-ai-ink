import {
  Box,
  Grid,
  Slider,
  Switch,
  Tag,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import {Formik, Field, Form} from 'formik';
import {useTranslation} from 'react-i18next';

const ImageFilterProperty = ({canvasRef, data}) => {
  const {t} = useTranslation();

  const initialValues = {
    grayscale: !!data.filters[0],
    invert: !!data.filters[1],
    sepia: !!data.filters[3],
    brownie: !!data.filters[4],
    vintage: !!data.filters[9],
    blackwhite: !!data.filters[19],
    technicolor: !!data.filters[14],
    polaroid: !!data.filters[15],
    sharpen: !!data.filters[12],
    emboss: !!data.filters[13],
    gammaEnabled: !!data.filters[17],
    gammaR: data.filters[17] ? data.filters[17].gamma[0] : 1,
    gammaG: data.filters[17] ? data.filters[17].gamma[1] : 1,
    gammaB: data.filters[17] ? data.filters[17].gamma[2] : 1,
    brightnessEnabled: !!data.filters[5],
    brightness: data.filters[5] ? data.filters[5].brightness : 0.1,
    contrastEnabled: !!data.filters[6],
    contrast: data.filters[6] ? data.filters[6].contrast : 0,
    saturationEnabled: !!data.filters[7],
    saturation: data.filters[7] ? data.filters[7].saturation : 0,
    hueEnabled: !!data.filters[21],
    hue: data.filters[21] ? data.filters[21].rotation : 0,
    noiseEnabled: !!data.filters[8],
    noise: data.filters[8] ? data.filters[8].noise : 100,
    pixelateEnabled: !!data.filters[10],
    pixelate: data.filters[10] ? data.filters[10].blocksize : 4,
    blurEnabled: !!data.filters[11],
    blur: data.filters[11] ? data.filters[11].value : 0.1,
  };

  const handleSubmit = (values) => {
    // Handle form submission
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel>{t('imagemap.filter.grayscale')}</FormLabel>
              <Field name="grayscale">
                {({field}) => (
                  <Tag.CheckableTag className="rde-action-tag" {...field}>
                    {'G'}
                  </Tag.CheckableTag>
                )}
              </Field>
            </FormControl>

            {/* Convert the remaining Form.Item components in a similar way */}

            {/* Example with Slider component */}
            <FormControl>
              <FormLabel>{t('imagemap.filter.gamma')}</FormLabel>
              {/* <Field name="gammaEnabled">
                {({ field }) => (
                  <Tag.CheckableTag className="rde-action-tag."></Tag.CheckableTag>
                    <Switch {...field} />
                  )}
              </Field> */}

              {values.gammaEnabled && (
                <Grid templateColumns="1fr 1fr 1fr" gap={4}>
                  <Field name="gammaR">
                    {({field}) => (
                      <FormControl>
                        <FormLabel>{t('imagemap.filter.gammaR')}</FormLabel>
                        <Slider {...field} min={0} max={2} step={0.1} />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="gammaG">
                    {({field}) => (
                      <FormControl>
                        <FormLabel>{t('imagemap.filter.gammaG')}</FormLabel>
                        <Slider {...field} min={0} max={2} step={0.1} />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="gammaB">
                    {({field}) => (
                      <FormControl>
                        <FormLabel>{t('imagemap.filter.gammaB')}</FormLabel>
                        <Slider {...field} min={0} max={2} step={0.1} />
                      </FormControl>
                    )}
                  </Field>
                </Grid>
              )}
            </FormControl>

            {/* Add the remaining Slider components in a similar way */}
          </Grid>

          {/* Add a submit button */}
          <Box mt={4}>
            <Button type="submit">{t('imagemap.apply')}</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ImageFilterProperty;
