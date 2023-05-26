import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import {FormLabel, Modal, Button, Input} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

import Icon from '../icon/Icon';

const UrlModal = ({value, onChange}) => {
  const {register, handleSubmit} = useForm();
  const {t} = useTranslation();
  const [url, setUrl] = useState(value || '');
  const [tempUrl, setTempUrl] = useState('');
  const [visible, setVisible] = useState(false);

  const onOk = () => {
    onChange(tempUrl);
    setVisible(false);
    setUrl(tempUrl);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onClick = () => {
    setVisible(true);
  };

  const label = (
    <>
      <span style={{marginRight: 8}}>{t('common.url')}</span>
      <Button onClick={onClick} shape="circle" className="rde-action-btn">
        <Icon name="edit" />
      </Button>
    </>
  );

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <span style={{wordBreak: 'break-all'}}>{url}</span>

      <Modal isOpen={visible} onClose={onCancel}>
        <form onSubmit={handleSubmit(onOk)}>
          <FormLabel>{t('common.url')}</FormLabel>
          <Input
            defaultValue={url}
            onChange={(e) => {
              setTempUrl(e.target.value);
            }}
            {...register('tempUrl', {required: true})}
          />

          <Button type="submit">{t('common.ok')}</Button>
          <Button onClick={onCancel}>{t('common.cancel')}</Button>
        </form>
      </Modal>
    </>
  );
};

UrlModal.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default UrlModal;
