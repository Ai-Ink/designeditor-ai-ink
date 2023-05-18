import React, {useEffect, useState} from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {useActiveObject, useEditor} from '@layerhub-io/react';
import Common from './Common';
import Flip from './Shared/Flip';
import useAppContext from '~/hooks/useAppContext';

const Path = () => {
  const [state, setState] = useState({fill: '#000000'});
  const {setActiveSubMenu} = useAppContext();
  const editor = useEditor();
  const activeObject = useActiveObject();

  useEffect(() => {
    if (activeObject && activeObject.type === 'StaticPath') {
      setState({fill: activeObject.fill});
    }
  }, [activeObject]);

  useEffect(() => {
    let watcher = async () => {
      if (activeObject && activeObject.type === 'StaticPath') {
        setState({fill: activeObject.fill});
      }
    };
    if (editor) {
      editor.on('history:changed', watcher);
    }
    return () => {
      if (editor) {
        editor.off('history:changed', watcher);
      }
    };
  }, [editor, activeObject]);

  return (
    <Flex
      flex={1}
      alignItems="center"
      padding="0 12px"
      justifyContent="space-between"
    >
      <Flex alignItems="center">
        <Box onClick={() => setActiveSubMenu('PathFill')} cursor="pointer">
          <Box
            height="24px"
            width="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={state.fill}
            border="1px solid #dedede"
          />
        </Box>
        <Flip />
      </Flex>
      <Common />
    </Flex>
  );
};

export default Path;
