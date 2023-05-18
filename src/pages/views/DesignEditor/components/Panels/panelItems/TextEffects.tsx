import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import Scrollable from '@/components/Scrollable';
import {DeleteIcon} from '@chakra-ui/icons';
import {throttle} from 'lodash';
import {useActiveObject, useEditor} from '@layerhub-io/react';
import {TEXT_EFFECTS} from '@/constants/design-editor';
import Outline from './Common/Outline';
import Shadow from './Common/Shadow';

const EFFECTS = {
  None: {
    fill: '#333333',
    strokeWidth: 0,
    shadow: {
      blur: 2,
      color: '#afafaf',
      offsetX: 10,
      offsetY: 10,
      enabled: false,
    },
  },
  Shadow: {
    fill: '#333333',
    shadow: {
      blur: 2,
      color: '#afafaf',
      offsetX: 10,
      offsetY: 10,
      enabled: true,
    },
  },
  Lift: {
    fill: '#333333',
    shadow: {
      blur: 25,
      color: 'rgba(0,0,0,0.45)',
      offsetX: 0,
      offsetY: 0,
      enabled: true,
    },
  },
  Hollow: {
    stroke: '#000000',
    fill: null,
    strokeWidth: 2,
    shadow: {
      blur: 25,
      color: 'rgba(0,0,0,0.45)',
      offsetX: 0,
      offsetY: 0,
      enabled: false,
    },
  },
  Splice: {
    stroke: '#000000',
    fill: null,
    strokeWidth: 2,
    shadow: {
      blur: 0,
      color: '#afafaf',
      offsetX: 10,
      offsetY: 10,
      enabled: true,
    },
  },
  Neon: {
    stroke: '#e84393',
    fill: '#fd79a8',
    strokeWidth: 2,
    shadow: {
      blur: 25,
      color: '#fd79a8',
      offsetX: 0,
      offsetY: 0,
      enabled: true,
    },
  },
};

const TextEffects = () => {
  const [color, setColor] = React.useState('#b32aa9');
  const activeObject = useActiveObject();
  const editor = useEditor();

  const updateObjectFill = throttle((color) => {
    if (activeObject) {
      editor.objects.update({fill: color});
    }

    setColor(color);
  }, 100);

  const applyEffect = (name) => {
    if (editor) {
      const effect = EFFECTS[name];
      if (effect) {
        editor.objects.update(effect);
      }
    }
  };

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Flex
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        <Box>Effects</Box>
        <Box cursor="pointer" display="flex">
          <DeleteIcon boxSize={6} />
        </Box>
      </Flex>
      <Scrollable>
        <Box padding="0 1.5rem">
          <Flex gridTemplateColumns="repeat(3, 80px)" gap="0.5rem">
            {TEXT_EFFECTS.map((effect, index) => (
              <Box style={{cursor: 'pointer'}} key={index}>
                <Box
                  onClick={() => applyEffect(effect.name)}
                  border="1px solid #afafaf"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="80px"
                >
                  <img
                    style={{width: '70px'}}
                    src={effect.preview}
                    alt={effect.name}
                  />
                </Box>
                <Box textAlign="center" padding="0.5rem" fontSize="14px">
                  {effect.name}
                </Box>
              </Box>
            ))}
          </Flex>
          {/* <Box>
            <Outline />
            <Shadow />
          </Box> */}
        </Box>
      </Scrollable>
    </Box>
  );
};

export default TextEffects;
