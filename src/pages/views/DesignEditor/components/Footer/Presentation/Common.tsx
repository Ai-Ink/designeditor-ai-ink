import React from 'react';
import {styled} from '@chakra-ui/react';
import {Theme} from '@chakra-ui/react';
import {Button, Slider, Input, Box} from '@chakra-ui/react';
import {useEditor, useZoomRatio} from '@/canvascore/react';
import {Tooltip} from '@chakra-ui/react';
import {
  BiLayer,
  BiExpand,
  BiCompress,
  BiMinusCircle,
  BiPlusCircle,
  BiRefresh,
  BiUndo,
  BiRedo,
  BiTime,
} from 'react-icons/bi';

const Container = styled('div', {
  baseStyle: ({$theme}) => ({
    height: '50px',
    background: $theme.colors.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
});

interface Options {
  zoomRatio: number;
  zoomRatioTemp: number;
}

const Common = () => {
  const zoomMin = 10;
  const zoomMax = 240;
  const [options, setOptions] = React.useState<Options>({
    zoomRatio: 20,
    zoomRatioTemp: 20,
  });
  const editor = useEditor();
  const zoomRatio: number = useZoomRatio();

  React.useEffect(() => {
    setOptions({...options, zoomRatio: Math.round(zoomRatio * 100)});
  }, [zoomRatio]);

  const handleChange = (type: string, value: number) => {
    if (editor) {
      if (type.includes('emp')) {
        setOptions({...options, zoomRatioTemp: value});
      }
    }
  };

  const applyZoomRatio = (type: string, e: any) => {
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
      <Box>
        <Button variant="ghost" size="sm">
          <BiLayer size={20} />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button variant="ghost" size="sm">
          <BiExpand size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.zoom.zoomToFit()}
        >
          <BiCompress size={16} />
        </Button>
        <Box>
          <Tooltip label="Zoom Out" placement="bottom" hasArrow>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.zoom.zoomOut()}
            >
              <BiMinusCircle size={24} />
            </Button>
          </Tooltip>
        </Box>
        <Slider
          sx={{
            '.chakra-slider__thumb': {
              height: '12px',
              width: '12px',
              paddingLeft: 0,
            },
            '.chakra-slider__track': {
              paddingLeft: 0,
              paddingRight: 0,
            },
          }}
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
              variant="ghost"
              size="sm"
              onClick={() => editor.zoom.zoomIn()}
            >
              <BiPlusCircle size={24} />
            </Button>
          </Tooltip>
        </Box>
        <Input
          type="number"
          size="xs"
          max={zoomMax}
          min={zoomMin}
          onChange={(e) =>
            handleChange('zoomRatioTemp', parseFloat(e.target.value))
          }
          onKeyUp={(e) => applyZoomRatio('zoomRatio', e)}
          value={options.zoomRatioTemp}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="end">
        <Button variant="ghost" size="sm">
          <BiRefresh size={16} />
        </Button>
        <Button variant="ghost" size="sm">
          <BiUndo size={22} />
        </Button>
        <Button variant="ghost" size="sm">
          <BiRedo size={22} />
        </Button>
        <Button variant="ghost" size="sm">
          <BiTime size={16} />
        </Button>
      </Box>
    </Container>
  );
};

export default Common;
