import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import Scrollable from '@/components/Scrollable';
import {DeleteIcon} from '@chakra-ui/icons';
import {throttle} from 'lodash';
import {useActiveObject, useEditor} from '@/canvascore/react';
import {TEXT_EFFECTS} from '@/constants/design-editor';
import Outline from './Common/Outline';
import Shadow from './Common/Shadow';
import EffectPreviewCard from './EffectPreviewCard';

//stackoverflow.com/questions/19726778/create-valley-text-text-with-curve-in-fabric-js
// https://tympanus.net/Development/Arctext/
// https://stackoverflow.com/questions/8974364/how-can-i-draw-a-text-along-arc-path-with-html-5-canvas
// http://jsfiddle.net/Makallus/hyyvpp8g/
// Various SVG's for use: https://ninesummer.github.io/fabricjs.com/kitchensink

const JS_EFFECTS = {
  CircularText: {},
};

const CSS_EFFECTS = {
  NoEffect: {
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
  StrikeThrough: {
    linethrough: 'linethrough',
  },
  Sliced: {
    style: `background-color:powderblue;`,
  },
  // Sliced: {
  //   style: `
  //   .wrapper {
  //     display: grid;
  //     place-content: center;
  //     background-color: var(--background-color);
  //     min-height: 100vh;
  //     font-family: "Oswald", sans-serif;
  //     font-size: clamp(1.5rem, 1rem + 18vw, 15rem);
  //     font-weight: 700;
  //     text-transform: uppercase;
  //     color: var(--text-color);
  //     overflow: hidden;
  //   }

  //   .sliced-text {
  //     position: relative;
  //     z-index: 1;
  //   }

  //   .sliced-text:before,
  //   .sliced-text:after {
  //     content: attr(data-text);
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     overflow: hidden;
  //     color: var(--background-color);
  //     background: var(--text-color);
  //     z-index: -1;
  //     width: 50%;
  //     height: 100%;
  //     transform-origin: left center;
  //     transform-style: preserve-3d;
  //   }

  //   .sliced-text:before {
  //     transform: perspective(500px) rotateY(0deg);
  //     clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  //   }

  //   .sliced-text:after {
  //     transform: perspective(500px) rotateY(180deg);
  //     clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  //   }
  //   `,
  // },
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
      if (CSS_EFFECTS.hasOwnProperty(name)) {
        console.log('Found CSS Effect');
        const effect = CSS_EFFECTS[name];
        if (effect) {
          editor.objects.update(effect);
        }
      } else {
        const effect = JS_EFFECTS[name];
        if (effect) {
          console.log('Found JS Effect');
          editor.objects.applyJsEffect(effect);
        }
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
        <Box padding="0 1.5rem" display="grid" gap="0.2rem">
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            gap={4}
          >
            {TEXT_EFFECTS.map((effect, index) => (
              <Box style={{cursor: 'pointer'}} key={index}>
                <Box
                  onClick={() => applyEffect(effect.name)}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{
                    backgroundColor: 'rgb(255, 246, 247)',
                  }}
                >
                  <EffectPreviewCard effect={effect} />
                </Box>
              </Box>
            ))}
          </Box>
          {/* </Flex> */}
          {/* TODO: Check for these components and see the value */}
          <Box>
            <Outline />
            <Shadow />
          </Box>
        </Box>
      </Scrollable>
    </Box>
  );
};

export default TextEffects;
