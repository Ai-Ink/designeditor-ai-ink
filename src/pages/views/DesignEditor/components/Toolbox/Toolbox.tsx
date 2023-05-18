import React, {useEffect, useState} from 'react';
import {useActiveObject, useEditor} from '@/canvascore/react';
import getSelectionType from '@/utils/get-selection-type';
import {Box} from '@chakra-ui/react';
import Items from './Items';
import useAppContext from '@/hooks/useAppContext';
import {ILayer} from '@/canvascore/types';

const DEFAULT_TOOLBOX = 'Canvas';

const Toolbox = () => {
  const [state, setState] = useState({toolbox: 'Text'});
  const {setActiveSubMenu} = useAppContext();
  const activeObject = useActiveObject() as ILayer;
  const editor = useEditor();

  useEffect(() => {
    const selectionType = getSelectionType(activeObject);
    if (selectionType) {
      if (selectionType.length > 1) {
        setState({toolbox: 'Multiple'});
      } else {
        setState({toolbox: selectionType[0]});
      }
    } else {
      setState({toolbox: DEFAULT_TOOLBOX});
      setActiveSubMenu('');
    }
  }, [activeObject]);

  useEffect(() => {
    let watcher = async () => {
      if (activeObject) {
        const selectionType = getSelectionType(activeObject);

        if (selectionType.length > 1) {
          setState({toolbox: 'Multiple'});
        } else {
          setState({toolbox: selectionType[0]});
        }
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

  const Component = Items[state.toolbox];

  return (
    <Box boxShadow="rgb(0 0 0 / 15%) 0px 1px 1px" height="50px" display="flex">
      {Component ? <Component /> : state.toolbox}
    </Box>
  );
};

export default Toolbox;
