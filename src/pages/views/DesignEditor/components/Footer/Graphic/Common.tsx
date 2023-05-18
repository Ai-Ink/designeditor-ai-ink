import React from 'react';
import {Box, Button, Slider, Input, Tooltip} from '@chakra-ui/react';
import {
  Layers,
  Expand,
  Compress,
  RemoveCircleOutline,
  AddCircleOutline,
  Refresh,
  Undo,
  Redo,
  TimePast,
} from 'react-icons/io5';

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

const Common = () => {
  const zoomMin = 10;
  const zoomMax = 240;
  const [options, setOptions] = React.useState({
    zoomRatio: 20,
    zoomRatioTemp: 20,
  });
  const editor = useEditor();
  const zoomRatio = useZoomRatio();

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
          <Layers size={20} />
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
          <Expand size={16} />
        </Button>
        <Button
          variant="unstyled"
          size="sm"
          onClick={() => editor.zoom.zoomToFit()}
        >
          <Compress size={16} />
        </Button>
        <Box>
          <Tooltip label="Zoom Out" placement="bottom" hasArrow>
            <Button
              variant="unstyled"
              size="sm"
              onClick={() => editor.zoom.zoomOut()}
            >
              <RemoveCircleOutline size={24} />
            </Button>
          </Tooltip>
        </Box>
        <Slider
          style={{width: '140px'}}
          value={[options.zoomRatio]}
          onChange={({value}) =>
            applyZoomRatio('zoomRatio', {target: {value: value[0]}})
          }
          min={zoomMin}
          max={zoomMax}
        />
        <Box>
          <Tooltip label="Zoom In" placement="bottom" hasArrow>
            <Button
              variant="unstyled"
              size="sm"
              onClick={() => editor.zoom.zoomIn()}
            >
              <AddCircleOutline size={24} />
            </Button>
          </Tooltip>
        </Box>
        <Input
          type="number"
          endAdornment="%"
          style={{
            backgroundColor: '#ffffff',
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
            paddingRight: 0,
          }}
          size="xs"
          max={zoomMax}
          min={zoomMin}
          onChange={(e) =>
            handleChange('zoomRatioTemp', parseFloat(e.target.value))
          }
          onKeyUp={(e) => applyZoomRatio('zoomRatio', e)}
          value={options.zoomRatioTemp}
        />
      </div>
      <div
        style={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}
      >
        <Button variant="unstyled" size="sm">
          <Refresh size={16} />
        </Button>
        <Button variant="unstyled" size="sm">
          <Undo size={22} />
        </Button>
        <Button variant="unstyled" size="sm">
          <Redo size={22} />
        </Button>
        <Button variant="unstyled" size="sm">
          <TimePast size={16} />
        </Button>
      </div>
    </Container>
  );
};

export default Common;
