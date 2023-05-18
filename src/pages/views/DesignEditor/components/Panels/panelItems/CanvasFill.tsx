import React from 'react';
import {Box, Grid, GridItem} from '@chakra-ui/react';
import {HexColorPicker} from 'react-colorful';
import {DeleteIcon} from '@chakra-ui/icons';
import {throttle} from 'lodash';
import {useEditor} from '@/canvascore/react';

const PRESET_COLORS = [
  '#f44336',
  '#ff9800',
  '#ffee58',
  '#66bb6a',
  '#26a69a',
  '#03a9f4',
  '#3f51b5',
  '#673ab7',
  '#9c27b0',
  '#ec407a',
  '#8d6e63',
  '#d9d9d9',
];

const CanvasFill = () => {
  const editor = useEditor();

  const updateCanvasBackground = throttle((color) => {
    editor.canvas.setBackgroundColor(color);
  }, 100);

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        <Box>Canvas Fill</Box>

        <Box cursor="pointer" display="flex">
          <DeleteIcon boxSize={6} />
        </Box>
      </Box>
      <Box flex={1} overflowY="auto" padding="0 1.5rem">
        <HexColorPicker
          onChange={updateCanvasBackground}
          style={{width: '100%'}}
        />
        <Box>
          <Box padding="0.75rem 0" fontWeight={500} fontSize="14px">
            Preset colors
          </Box>
          <Grid templateColumns="repeat(6, 1fr)" gap="0.25rem">
            {PRESET_COLORS.map((color, index) => (
              <GridItem
                key={index}
                cursor="pointer"
                onClick={() => updateCanvasBackground(color)}
                backgroundColor={color}
                height="38px"
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CanvasFill;
