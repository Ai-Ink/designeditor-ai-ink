import React, {useCallback, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import FlipHorizontal from '~/components/Icons/FlipHorizontal';
import FlipVertical from '~/components/Icons/FlipVertical';
import {useActiveObject, useEditor} from '@layerhub-io/react';

const Flip = () => {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [state, setState] = useState({flipX: false, flipY: false});

  useEffect(() => {
    if (activeObject) {
      setState({
        flipX: activeObject.flipX,
        flipY: activeObject.flipY,
      });
    }
  }, [activeObject]);

  const flipHorizontally = useCallback(() => {
    editor.objects.update({flipX: !state.flipX});
    setState({...state, flipX: !state.flipX});
  }, [editor, state]);

  const flipVertically = useCallback(() => {
    editor.objects.update({flipY: !state.flipY});
    setState({...state, flipY: !state.flipY});
  }, [editor, state]);

  return (
    <Popover>
      <PopoverTrigger>
        <Tooltip label="Layers" placement="bottom" hasArrow>
          <Button size="sm" variant="ghost">
            Flip
          </Button>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Box width="180px" padding="12px" backgroundColor="#ffffff">
            <Box>
              <Button
                width="100%"
                justifyContent="flex-start"
                startIcon={<FlipHorizontal size={24} />}
                onClick={flipHorizontally}
                variant="ghost"
                size="sm"
              >
                Flip horizontally
              </Button>
            </Box>
            <Button
              width="100%"
              justifyContent="flex-start"
              startIcon={<FlipVertical size={24} />}
              onClick={flipVertically}
              variant="ghost"
              size="sm"
            >
              Flip vertically
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Flip;
