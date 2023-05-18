import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import {HexColorPicker} from 'react-colorful';
import Common from './Common';
import {useActiveObject} from '@layerhub-io/react';
import {groupBy} from 'lodash';
import Flip from './Shared/Flip';

const Vector = () => {
  const [state, setState] = useState({colors: [], colorMap: {}});
  const vectorPaths = useRef({});
  const activeObject = useActiveObject();

  useEffect(() => {
    if (activeObject && activeObject.type === 'StaticVector') {
      const objects = activeObject._objects[0]._objects;
      const objectColors = groupBy(objects, 'fill');
      vectorPaths.current = objectColors;
      setState({
        ...state,
        colors: Object.keys(objectColors),
        colorMap: activeObject.colorMap,
      });
    }
  }, [activeObject]);

  const changeBackgroundColor = (prev, next) => {
    const objectRef = activeObject;
    objectRef.updateLayerColor(prev, next);
    setState({
      ...state,
      colorMap: {
        ...state.colorMap,
        [prev]: next,
      },
    });
  };

  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      padding="0 12px"
      justifyContent="space-between"
    >
      <Box>
        <Box display="flex" alignItems="center" gap="0.5rem">
          <Box display="flex" alignItems="center" gap="0.5rem">
            {Object.keys(state.colorMap).map((c, index) => {
              return (
                <Popover key={index}>
                  <PopoverTrigger>
                    <Box>
                      <Box
                        height="24px"
                        width="24px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        backgroundColor={state.colorMap[c]}
                        border="1px solid #dedede"
                      />
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                      <Box
                        padding="1rem"
                        background="#ffffff"
                        width="200px"
                        display="flex"
                        flexDirection="column"
                        gap="1rem"
                        textAlign="center"
                      >
                        <HexColorPicker
                          onChange={(color) => {
                            changeBackgroundColor(c, color);
                          }}
                        />
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              );
            })}
          </Box>
          <Flip />
        </Box>
      </Box>
      <Common />
    </Box>
  );
};

export default Vector;
