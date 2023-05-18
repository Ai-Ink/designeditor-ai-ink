import React from 'react';
import {Box} from '@chakra-ui/react';
import {Input} from '@chakra-ui/react';
import {Slider} from '@chakra-ui/react';
import {Button} from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import {useState} from 'react';
import OpacityIcon from '@/components/Icons/Opacity';

const Opacity = () => {
  const [state, setState] = useState({
    opacity: 0,
    opacityTemp: 0,
  });

  const handleChange = (type, value) => {
    if (type.includes('emp')) {
      setState({...state, opacityTemp: value});
    }
  };

  const applyTextOpacity = (type, e) => {
    const value = e.target.value;
    if (value === '') {
      setState({...state, opacity: state.opacity, opacityTemp: state.opacity});
    } else {
      let parsedValue = parseFloat(value);
      if (parsedValue >= 100) {
        parsedValue = 100;
      }
      setState({...state, opacity: parsedValue, opacityTemp: parsedValue});
      editor.objects.update({opacity: parsedValue / 100});
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="unstyled" size="sm">
          <OpacityIcon size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Box width="200px" backgroundColor="#ffffff" padding="20px">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize="14px"
            >
              Opacity
              <Box width="52px" />
            </Box>
            <Box display="grid" gridTemplateColumns="1fr 40px" gap="1rem">
              <Slider
                min={0}
                max={100}
                value={state.opacity}
                onChange={(value) => applyTextOpacity('', {target: {value}})}
              />
              <Box display="flex" alignItems="center">
                <Input
                  size="sm"
                  type="number"
                  inputMode="decimal"
                  pattern="[0-9]*(.[0-9]+)?"
                  onChange={(e) =>
                    handleChange('opacityTemp', parseFloat(e.target.value))
                  }
                  onBlur={(e) => applyTextOpacity('opacity', e)}
                  value={state.opacityTemp}
                />
              </Box>
            </Box>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Opacity;
