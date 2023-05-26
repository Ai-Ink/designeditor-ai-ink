import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip, Button} from '@chakra-ui/react';
import Icon from '@/components/Icons/CustomIcon';

const ButtonWithIcon = ({
  name,
  id,
  style,
  wrapperStyle,
  wrapperClassName,
  tooltipTitle,
  tooltipPlacement,
  className,
  icon,
  iconStyle,
  iconClassName,
  visible,
  shape,
  disabled,
  loading,
  type,
  children,
  onClick,
}) => {
  if (!visible) return null;

  return (
    <Tooltip label={tooltipTitle} placement={tooltipPlacement}>
      <span style={wrapperStyle} className={wrapperClassName}>
        <Button
          id={id}
          className={className}
          name={name}
          style={style}
          variant={type}
          isDisabled={disabled}
          isLoading={loading}
          onClick={onClick}
          size={shape}
        >
          {icon && (
            <Icon name={icon} style={iconStyle} className={iconClassName} />
          )}
          {children}
        </Button>
      </span>
    </Tooltip>
  );
};

ButtonWithIcon.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  wrapperClassName: PropTypes.string,
  tooltipTitle: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  iconStyle: PropTypes.object,
  iconClassName: PropTypes.string,
  iconAnimation: PropTypes.string,
  visible: PropTypes.bool,
  shape: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

ButtonWithIcon.defaultProps = {
  type: 'default',
  visible: true,
  disabled: false,
  loading: false,
};

export default ButtonWithIcon;
