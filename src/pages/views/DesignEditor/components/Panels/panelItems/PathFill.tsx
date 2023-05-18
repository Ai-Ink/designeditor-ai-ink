import React from 'react';
import {Box} from '@chakra-ui/react';
import Scrollable from '@/components/Scrollable';
import {HexColorPicker} from 'react-colorful';
import {DeleteIcon} from '@chakra-ui/icons';
import {throttle} from 'lodash';
import {useActiveObject, useEditor} from '@/canvascore/react';

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

const PathFill = () => {
  const [color, setColor] = React.useState('#b32aa9');
  const activeObject = useActiveObject();
  const editor = useEditor();

  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      editor.objects.update({fill: color});
    }

    setColor(color);
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
        <Box>Path Fill</Box>
        <Box cursor="pointer" display="flex">
          <DeleteIcon boxSize={6} />
        </Box>
      </Box>
      <Scrollable>
        <Box padding="0 1.5rem">
          <HexColorPicker onChange={updateObjectFill} style={{width: '100%'}} />
          <Box>
            <Box padding="0.75rem 0" fontWeight={500} fontSize="14px">
              Preset colors
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(6, 1fr)"
              gap="0.25rem"
            >
              {PRESET_COLORS.map((color, index) => (
                <Box
                  key={index}
                  cursor="pointer"
                  onClick={() => updateObjectFill(color)}
                  backgroundColor={color}
                  height="38px"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Scrollable>
    </Box>
  );
};

export default PathFill;
