import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import {Button, Modal, FormControl, Input, Grid, Box} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';
import i18n from 'i18next';

import Icon from './Icon';
import icons from './icons.json';

const IconChooser = ({onChange, icon: defaultIcon}) => {
  const [icon, setIcon] = useState(defaultIcon);
  const [textSearch, setTextSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [filteredIcons, setFilteredIcons] = useState([]);

  useEffect(() => {
    setIcon(defaultIcon);
  }, [defaultIcon]);

  const onOk = () => {
    if (onChange) {
      onChange(icon);
    }
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onClick = () => {
    setVisible(true);
  };

  const onClickIcon = (selectedIcon) => {
    setIcon(selectedIcon);
    if (onChange) {
      onChange(selectedIcon);
    }
    setVisible(false);
  };

  const onSearch = debounce((value) => {
    setTextSearch(value);
  }, 500);

  const getPrefix = (style) => {
    let prefix = 'fas';
    if (style === 'brands') {
      prefix = 'fab';
    } else if (style === 'regular') {
      prefix = 'far';
    }
    return prefix;
  };

  const getIcons = (textSearch) => {
    const lowerCase = textSearch.toLowerCase();
    return Object.keys(icons)
      .filter(
        (icon) =>
          icon.includes(lowerCase) ||
          icons[icon].search.terms.some((term) => term.includes(lowerCase)),
      )
      .map((icon) => ({[icon]: icons[icon]}));
  };

  const label = (
    <>
      <span style={{marginRight: 8}}>{i18n.t('common.icon')}</span>
      <Icon
        name={Object.keys(icon)[0]}
        prefix={getPrefix(icon[Object.keys(icon)[0]].styles[0])}
      />
    </>
  );

  setFilteredIcons(getIcons(textSearch));
  const filteredIconsLength = filteredIcons.length;
  const title = (
    <Box padding="0 24px">
      <Input
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        placeholder={i18n.t('imagemap.marker.search-icon', {
          length: filteredIconsLength,
        })}
      />
    </Box>
  );

  return (
    <>
      <FormControl>
        <FormControl.Label>{label}</FormControl.Label>
        <Button onClick={onClick}>
          {i18n.t('imagemap.marker.choose-icon')}
        </Button>
      </FormControl>
      <Modal
        isOpen={visible}
        onClose={onCancel}
        size="xl"
        title={title}
        scrollBehavior="inside"
      >
        <Grid templateColumns="repeat(8, 1fr)" gap={4} p={4}>
          {filteredIcons.map((ic) => {
            const name = Object.keys(ic)[0];
            const metadata = ic[name];
            const prefix = getPrefix(metadata.styles[0]);
            return (
              <Box
                key={name}
                onClick={() => onClickIcon(ic)}
                className="rde-icon-container"
                cursor="pointer"
                textAlign="center"
              >
                <Box className="rde-icon-top">
                  <Icon name={name} size={3} prefix={prefix} />
                </Box>
                <Box className="rde-icon-bottom">{name}</Box>
              </Box>
            );
          })}
        </Grid>
        <Modal.Footer>
          <Button onClick={onOk} colorScheme="blue" leftIcon={<CheckIcon />}>
            {i18n.t('common.ok')}
          </Button>
          <Button onClick={onCancel} variant="ghost">
            {i18n.t('common.cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

IconChooser.propTypes = {
  onChange: PropTypes.func,
  icon: PropTypes.any,
};

IconChooser.defaultProps = {
  icon: {'map-marker-alt': icons['map-marker-alt']},
};

export default IconChooser;
