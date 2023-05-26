import React from 'react';
import {FormLabel, Radio, FormControl, Box} from '@chakra-ui/react';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import UrlModal from '../components/common/UrlModal';
import FileUpload from '../components/common/FileUpload';

const ImageProperty = ({canvasRef, data}) => {
  const {register} = useFormContext();
  const {t} = useTranslation();

  if (!data) {
    return null;
  }

  const imageLoadType = data.imageLoadType || 'file';

  return (
    <>
      <FormControl>
        <FormLabel>{t('imagemap.image.image-load-type')}</FormLabel>
        <Radio.Group
          defaultValue={imageLoadType}
          size="sm"
          {...register('imageLoadType')}
        >
          <Radio.Button value="file">
            {t('imagemap.image.file-upload')}
          </Radio.Button>
          <Radio.Button value="src">
            {t('imagemap.image.image-url')}
          </Radio.Button>
        </Radio.Group>
      </FormControl>

      {imageLoadType === 'file' ? (
        <FormControl>
          <FormLabel>{t('common.file')}</FormLabel>
          <FileUpload
            accept="image/*"
            {...register('file', {required: true})}
          />
        </FormControl>
      ) : (
        <FormControl>
          <UrlModal formContext={register} defaultValue={data.src} />
        </FormControl>
      )}
    </>
  );
};

export default ImageProperty;
