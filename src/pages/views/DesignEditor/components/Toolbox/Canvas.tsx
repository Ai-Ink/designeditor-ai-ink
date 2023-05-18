import React from 'react';
import {Box} from '@chakra-ui/react';
import Common from './Common';
import useAppContext from '~/hooks/useAppContext';
import {useActiveObject, useEditor} from '@layerhub-io/react';

const Canvas = () => {
  const [state, setState] = React.useState({fill: '#000000'});
  const {setActiveSubMenu} = useAppContext();
  const editor = useEditor();
  const activeObject = useActiveObject() as any;

  React.useEffect(() => {
    if (editor) {
      setState({fill: editor.canvas.backgroundColor as string});
    }
  }, [editor]);

  React.useEffect(() => {
    let watcher = async () => {
      setState({fill: editor.canvas.backgroundColor as string});
    };
    if (editor) {
      editor.on('canvas:updated', watcher);
    }
    return () => {
      if (editor) {
        editor.off('canvas:updated', watcher);
      }
    };
  }, [editor, activeObject]);

  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      padding="0 12px"
      justifyContent="space-between"
    >
      <Box flex={1} display="flex" alignItems="center">
        <Box onClick={() => setActiveSubMenu('CanvasFill')}>
          <Box
            height="24px"
            width="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            backgroundColor={state.fill}
            border="1px solid #dedede"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Canvas;
