import React from 'react';
import {
  Box,
  Button,
  Slider,
  Input,
  Tooltip,
  InputGroup,
  InputRightAddon,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import Icons from '@/components/Icons';
import {useEditor, useZoomRatio} from '@/canvascore/react';

const Container = ({children}) => {
  return (
    <Box
      h="50px"
      bg="white"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

interface Options {
  zoomRatio: number;
  zoomRatioTemp: number;
}

const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
};

const Common = () => {
  const zoomMin = 10;
  const zoomMax = 240;
  const [options, setOptions] = React.useState({
    zoomRatio: 20,
    zoomRatioTemp: 20,
  });
  const editor = useEditor();
  const zoomRatio = useZoomRatio();

  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    setOptions({...options, zoomRatio: Math.round(zoomRatio * 100)});
  }, [zoomRatio]);

  const handleChange = (type, value) => {
    if (editor) {
      if (type.includes('emp')) {
        setOptions({...options, zoomRatioTemp: value});
      }
    }
  };

  const applyZoomRatio = (type, e) => {
    const value = e.target.value;
    if (editor) {
      if (value === '') {
        setOptions({
          ...options,
          zoomRatio: options.zoomRatio,
          zoomRatioTemp: options.zoomRatio,
        });
      } else {
        let parsedValue = parseFloat(value);

        if (parsedValue < 0) {
          editor.zoom.zoomToRatio(zoomMin / 100);
        } else if (parsedValue > zoomMax) {
          editor.zoom.zoomToRatio(zoomMax / 100);
        } else {
          editor.zoom.zoomToRatio(parsedValue / 100);
        }
      }
    }
  };

  return (
    <Container>
      <div>
        <Button variant="unstyled" size="sm">
          <Icons.Layers size={20} color="black" />
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button variant="unstyled" size="sm">
          <Icons.Expand size={16} color="black" />
        </Button>
        <Button
          variant="unstyled"
          size="sm"
          onClick={() => editor.zoom.zoomToFit()}
        >
          <Icons.Compress size={16} color="black" />
        </Button>
        <Box display="flex" alignItems="center">
          <Box>
            <Tooltip label="Zoom Out" placement="bottom" hasArrow>
              <Button
                variant="unstyled"
                size="md"
                onClick={() => editor.zoom.zoomOut()}
              >
                <Icons.RemoveCircleOutline size={24} color="black" />
              </Button>
            </Tooltip>
          </Box>
          {/* <Slider
          style={{width: '140px'}}
          value={[options.zoomRatio]}
          onChange={({value}) =>
            applyZoomRatio('zoomRatio', {target: {value: value[0]}})
          }
          min={zoomMin}
          max={zoomMax}
        /> */}
          <Box width="200px" mr="1">
            <Slider
              id="slider"
              value={options.zoomRatio}
              min={zoomMin}
              max={zoomMax}
              colorScheme="teal"
              onChange={(value) =>
                applyZoomRatio('zoomRatio', {target: {value: value[0]}})
              }
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
                25%
              </SliderMark>
              <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
                50%
              </SliderMark>
              <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
                75%
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="teal.500"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={`${sliderValue}%`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </Box>

          <Box>
            <Tooltip label="Zoom In" placement="bottom" hasArrow>
              <Button
                variant="unstyled"
                size="sm"
                onClick={() => editor.zoom.zoomIn()}
              >
                <Icons.AddCircleOutline size={24} color="black" />
              </Button>
            </Tooltip>
          </Box>
          {/* <InputGroup>
            <Input
              type="number"
              style={{
                backgroundColor: 'white',
                color: 'black',
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                borderBottomColor: 'rgba(0,0,0,0.15)',
                borderTopColor: 'rgba(0,0,0,0.15)',
                borderRightColor: 'rgba(0,0,0,0.15)',
                borderLeftColor: 'rgba(0,0,0,0.15)',
                borderTopWidth: '1px',
                borderBottomWidth: '1px',
                borderRightWidth: '1px',
                borderLeftWidth: '1px',
                height: '20px',
                width: '52px',
              }}
              size="medium"
              max={zoomMax}
              min={zoomMin}
              onChange={(e) =>
                handleChange('zoomRatioTemp', parseFloat(e.target.value))
              }
              onKeyUp={(e) => applyZoomRatio('zoomRatio', e)}
              value={options.zoomRatioTemp}
            />
            <InputRightAddon
              children="%"
              style={{
                backgroundColor: 'gray',
                color: 'black',
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                borderBottomColor: 'rgba(0,0,0,0.15)',
                borderTopColor: 'rgba(0,0,0,0.15)',
                borderRightColor: 'rgba(0,0,0,0.15)',
                borderLeftColor: 'rgba(0,0,0,0.15)',
                borderTopWidth: '1px',
                borderBottomWidth: '1px',
                borderRightWidth: '1px',
                borderLeftWidth: '1px',
                height: '20px',
                width: '52px',
              }}
              size="xs"
            />
          </InputGroup> */}
        </Box>
      </div>
      <div
        style={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}
      >
        <Button variant="unstyled" size="sm">
          <Icons.Refresh size={16} color="black" />
        </Button>
        <Button variant="unstyled" size="sm">
          <Icons.Undo size={22} color="black" />
        </Button>
        <Button variant="unstyled" size="sm">
          <Icons.Redo size={22} color="black" />
        </Button>
        <Button variant="unstyled" size="sm">
          <Icons.TimePast size={16} color="black" />
        </Button>
      </div>
    </Container>
  );
};

export default Common;
