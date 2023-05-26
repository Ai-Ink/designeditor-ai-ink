import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@chakra-ui/react';

const CustomIcon = ({
  name,
  color,
  style,
  className,
  size,
  innerIcon,
  innerColor,
  innerClassName,
  innerSize,
  prefix,
  onClick,
}) => {
  const iconStyle = Object.assign({}, style, {
    fontSize: `${size}em`,
    color,
  });

  const renderIcon = (iconName, iconClassName, iconSize, iconColor) => {
    const IconComponent = React.createElement(Icon, {
      as: prefix,
      name: iconName,
      className: iconClassName,
      size: iconSize,
      color: iconColor,
      onClick,
    });
    return IconComponent;
  };

  let iconName = name;
  if (iconName.startsWith('icon-')) {
    iconName = iconName.substr('icon-'.length);
  }

  const iconHtml = renderIcon(iconName, className, size, color);
  let innerIconHtml = null;
  if (innerIcon) {
    innerIconHtml = renderIcon(
      innerIcon,
      innerClassName,
      innerSize,
      innerColor,
    );
  } else {
    return iconHtml;
  }

  return (
    <span className="fa-stack">
      {iconHtml}
      {innerIconHtml}
    </span>
  );
};

CustomIcon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.number,
  innerIcon: PropTypes.string,
  innerColor: PropTypes.string,
  innerClassName: PropTypes.string,
  innerSize: PropTypes.number,
  prefix: PropTypes.string,
  onClick: PropTypes.func,
};

CustomIcon.defaultProps = {
  name: null,
  color: '',
  className: '',
  size: 1,
  innerIcon: null,
  innerColor: '',
  innerClassName: '',
  innerSize: 1,
  prefix: 'Fa',
};

export default CustomIcon;
