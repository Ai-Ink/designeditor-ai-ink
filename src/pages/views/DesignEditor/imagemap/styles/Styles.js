import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Box, Flex} from '@chakra-ui/react';
import i18n from 'i18next';

import StyleList from './StyleList';
import StyleModal from './StyleModal';
import Icon from '../components/icon/Icon';

function Styles({styles, onChangeStyles}) {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({});
  const [validateTitle, setValidateTitle] = useState({
    validateStatus: '',
    help: '',
  });
  const [current, setCurrent] = useState('add');

  const onOk = () => {
    if (validateTitle.validateStatus === 'error') {
      return;
    }
    if (!style.title) {
      setValidateTitle(onValid());
      return;
    }
    if (current === 'add') {
      if (Object.keys(style).length === 1) {
        modalRef.validateFields((err, values) => {
          setStyle((prevStyle) => ({...prevStyle, ...values}));
        });
      }
      onChangeStyles([...styles, style]);
    } else {
      const updatedStyles = [...styles];
      updatedStyles.splice(index, 1, style);
      onChangeStyles(updatedStyles);
    }
    setVisible(false);
    setStyle({});
  };

  const onCancel = () => {
    setVisible(false);
    setStyle({});
    setValidateTitle({
      validateStatus: '',
      help: '',
    });
  };

  const onAdd = () => {
    setVisible(true);
    setStyle({});
    setValidateTitle({
      validateStatus: '',
      help: '',
    });
    setCurrent('add');
  };

  const onEdit = (style, index) => {
    setVisible(true);
    setStyle(style);
    setValidateTitle({
      validateStatus: '',
      help: '',
    });
    setCurrent('modify');
    setIndex(index);
  };

  const onDelete = (index) => {
    const updatedStyles = [...styles];
    updatedStyles.splice(index, 1);
    onChangeStyles(updatedStyles);
  };

  const onClear = () => {
    onChangeStyles([]);
  };

  const onChange = (props, changedValues, allValues) => {
    const field = Object.keys(changedValues)[0];
    const isTitle = field === 'title';
    if (isTitle) {
      setValidateTitle(onValid(changedValues[field]));
    }
    setStyle((prevStyle) => ({...prevStyle, title: style.title, ...allValues}));
  };

  const onValid = (value) => {
    if (!value || !value.length) {
      return {
        validateStatus: 'error',
        help: i18n.t('validation.enter-property', {
          arg: i18n.t('common.title'),
        }),
      };
    }
    const exist = styles.some((style) => style.title === value);
    if (!exist) {
      return {
        validateStatus: 'success',
        help: '',
      };
    }
    return {
      validateStatus: 'error',
      help: i18n.t('validation.already-property', {
        arg: i18n.t('common.title'),
      }),
    };
  };

  return (
    <Form>
      <Box>
        <Flex justifyContent="flex-end" style={{padding: 8}}>
          <Button className="rde-action-btn" shape="circle" onClick={onAdd}>
            <Icon name="plus" />
          </Button>
          <Button className="rde-action-btn" shape="circle" onClick={onClear}>
            <Icon name="times" />
          </Button>
          <StyleModal
            ref={(c) => {
              modalRef = c;
            }}
            validateTitle={validateTitle}
            visible={visible}
            onOk={onOk}
            style={style}
            onCancel={onCancel}
            onChange={onChange}
            onValid={onValid}
          />
        </Flex>
        <StyleList styles={styles} onEdit={onEdit} onDelete={onDelete} />
      </Box>
    </Form>
  );
}

Styles.propTypes = {
  styles: PropTypes.array,
  onChangeStyles: PropTypes.func,
};

Styles.defaultProps = {
  styles: [],
};

export default Styles;
