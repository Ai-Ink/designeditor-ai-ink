import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  Button,
} from '@chakra-ui/react';
import i18n from 'i18next';

import FileUpload from './FileUpload';

function SVGModal({onOk, onCancel, visible}) {
  const [loadType, setLoadType] = useState('file');

  const handleChangeSvgType = (e) => {
    setLoadType(e.target.value);
  };

  const handleOk = () => {
    // Form validation logic goes here
    // Replace form.validateFields with the appropriate validation code
    // Example code for validating fields
    // if (values.svg instanceof Blob) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(values.svg);
    //   reader.onload = () => {
    //     onOk({ ...values, svg: reader.result });
    //   };
    // } else {
    //   onOk(values);
    // }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Modal isOpen={visible} onClose={handleCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{i18n.t('imagemap.svg.add-svg')}</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>{i18n.t('common.type')}</FormLabel>
            <RadioGroup onChange={handleChangeSvgType} value={loadType}>
              <Radio value="file">{i18n.t('common.file')}</Radio>
              <Radio value="svg">{i18n.t('common.svg')}</Radio>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>
              {loadType === 'svg'
                ? i18n.t('common.svg')
                : i18n.t('common.file')}
            </FormLabel>
            <FileUpload accept=".svg" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleOk}>
            {i18n.t('common.ok')}
          </Button>
          <Button variant="ghost" onClick={handleCancel}>
            {i18n.t('common.cancel')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

SVGModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  visible: PropTypes.bool.isRequired,
};

export default SVGModal;
