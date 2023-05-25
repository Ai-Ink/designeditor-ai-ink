import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon as ChakraIcon} from '@chakra-ui/react';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    size: PropTypes.number,
    innerName: PropTypes.string,
    innerColor: PropTypes.string,
    innerStyle: PropTypes.object,
    innerClassName: PropTypes.string,
    innerSize: PropTypes.number,
    prefix: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    name: null,
    color: '',
    style: {},
    className: '',
    size: 1,
    innerName: null,
    innerColor: '',
    innerStyle: {},
    innerClassName: '',
    innerSize: 1,
    prefix: 'fas',
  };

  render() {
    const {
      name,
      color,
      style,
      className,
      size,
      innerName,
      innerColor,
      innerStyle,
      innerClassName,
      innerSize,
      prefix,
      onClick,
    } = this.props;

    const iconStyle = {
      fontSize: `${size}em`,
      color,
      ...style,
    };

    const innerIconStyle = {
      fontSize: `${innerSize}em`,
      color: innerColor,
      ...innerStyle,
    };

    return (
      <ChakraIcon
        as={name}
        className={`${prefix} ${className}`}
        style={iconStyle}
        onClick={onClick}
      >
        {innerName && (
          <ChakraIcon
            as={innerName}
            className={`${prefix} ${innerClassName}`}
            style={innerIconStyle}
          />
        )}
      </ChakraIcon>
    );
  }
}

export default Icon;
