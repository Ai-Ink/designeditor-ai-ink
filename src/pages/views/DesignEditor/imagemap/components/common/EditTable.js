import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Table,
  Modal,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {CloseIcon, EditIcon, PlusIcon} from '@chakra-ui/icons';
import {Flex} from '@chakra-ui/layout';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import Icon from '../icon/Icon';

const EditTable = ({userProperty, onChange}) => {
  const [tempKey, setTempKey] = useState('');
  const [originKey, setOriginKey] = useState('');
  const [tempValue, setTempValue] = useState('');
  const [current, setCurrent] = useState('add');
  const [validateStatus, setValidateStatus] = useState('');
  const [help, setHelp] = useState('');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {handleSubmit, register, reset} = useForm();
  const {t} = useTranslation();

  const getDataSource = (userProperty) => {
    return Object.keys(userProperty).map((key) => {
      return {
        key,
        value: userProperty[key],
      };
    });
  };

  const handleOk = () => {
    if (validateStatus === 'error') {
      return;
    }
    if (current === 'modify') {
      delete userProperty[originKey];
    }
    const updatedUserProperty = {...userProperty, [tempKey]: tempValue};
    if (onChange) {
      onChange(updatedUserProperty);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleChangeKey = (value) => {
    let newValidateStatus = 'success';
    let newHelp = '';
    if (
      (current === 'add' &&
        Object.keys(userProperty).some((p) => p === value)) ||
      (current === 'modify' && originKey !== value && userProperty[value])
    ) {
      newValidateStatus = 'error';
      newHelp = t('validation.already-property', {arg: t('common.key')});
    } else if (!value.length) {
      newValidateStatus = 'error';
      newHelp = t('validation.enter-property', {arg: t('common.key')});
    } else {
      newValidateStatus = 'success';
      newHelp = '';
    }
    setTempKey(value);
    setValidateStatus(newValidateStatus);
    setHelp(newHelp);
  };

  const handleAdd = () => {
    setTempKey('');
    setTempValue('');
    setCurrent('add');
    setValidateStatus('');
    setHelp('');
    onOpen();
  };

  const handleEdit = (key) => {
    setTempKey(key);
    setOriginKey(key);
    setTempValue(userProperty[key]);
    setCurrent('modify');
    setValidateStatus('');
    setHelp('');
    onOpen();
  };

  const handleDelete = (key) => {
    delete userProperty[key];
  };

  const handleClear = () => {
    // Clear userProperty
  };

  const onSubmit = (data) => {
    console.log(data);
    handleOk();
  };

  const columns = [
    {
      title: t('common.key'),
      dataIndex: 'key',
    },
    {
      title: t('common.value'),
      dataIndex: 'value',
    },
    {
      title: '',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div>
            <Button
              className="rde-action-btn"
              shape="circle"
              onClick={() => {
                handleEdit(record.key);
              }}
            >
              <EditIcon />
            </Button>
            <Button
              className="rde-action-btn"
              shape="circle"
              onClick={() => {
                handleDelete(record.key);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <VStack align="stretch">
      <Flex justifyContent="flex-end">
        <Button className="rde-action-btn" shape="circle" onClick={handleAdd}>
          <PlusIcon />
        </Button>
        <Button className="rde-action-btn" shape="circle" onClick={handleClear}>
          <CloseIcon />
        </Button>
      </Flex>
      <Table
        size="small"
        pagination={{
          pageSize: 5,
        }}
        columns={columns}
        dataSource={getDataSource(userProperty)}
      />
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalContent>
          <ModalHeader>{t('common.key')}</ModalHeader>
          <ModalBody>
            <FormControl
              id="key"
              isRequired
              isInvalid={validateStatus === 'error'}
            >
              <FormLabel>{t('common.key')}</FormLabel>
              <Input
                {...register('key')}
                defaultValue={tempKey}
                value={tempKey}
                onChange={(e) => {
                  handleChangeKey(e.target.value);
                }}
              />
              {validateStatus === 'error' && (
                <FormHelperText color="red">{help}</FormHelperText>
              )}
            </FormControl>
            <FormControl id="value">
              <FormLabel>{t('common.value')}</FormLabel>
              <Input
                {...register('value')}
                defaultValue={tempValue}
                value={tempValue}
                onChange={(e) => {
                  setTempValue(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
              {t('common.ok')}
            </Button>
            <Button variant="ghost" onClick={handleCancel}>
              {t('common.cancel')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

EditTable.propTypes = {
  userProperty: PropTypes.object,
  onChange: PropTypes.func,
};

EditTable.defaultProps = {
  userProperty: {},
};

export default EditTable;
