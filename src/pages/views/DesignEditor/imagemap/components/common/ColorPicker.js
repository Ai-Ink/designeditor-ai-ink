import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Popover, Button} from '@chakra-ui/react';
import {ChromePicker} from 'react-color';

const ColorPicker = ({valueType, value, onChange}) => {
  const [color, setColor] = useState(value || 'rgba(255, 255, 255, 1)');

  const handleColorChange = (newColor) => {
    let updatedColor;
    if (valueType === 'string') {
      updatedColor = `rgba(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b}, ${newColor.rgb.a})`;
    } else {
      updatedColor = newColor.rgb;
    }
    setColor(updatedColor);
    onChange(updatedColor);
  };

  const getBackgroundColor = (color) => {
    if (typeof color === 'string') {
      return color;
    }
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  };

  return (
    <Popover
      trigger="click"
      placement="bottom-start"
      gutter={6}
      content={<ChromePicker color={color} onChange={handleColorChange} />}
      closeOnBlur
    >
      <Button
        bg={getBackgroundColor(color)}
        borderRadius="50%"
        width="30px"
        height="30px"
        p={0}
      />
    </Popover>
  );
};

ColorPicker.propTypes = {
  valueType: PropTypes.oneOf(['string', 'object']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  valueType: 'string',
  value: '',
};

export default ColorPicker;
