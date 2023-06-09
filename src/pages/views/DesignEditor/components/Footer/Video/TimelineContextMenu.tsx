import React, {useRef} from 'react';
import {Box} from '@chakra-ui/react';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';
import {nanoid} from 'nanoid';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import {
  findSceneIndexByTime,
  getMaxTime,
} from '@/views/DesignEditor/utils/scenes';
import {useTimer} from '@layerhub-io/use-timer';
import {getDefaultTemplate} from '@/constants/design-editor';
import {useEditor, useFrame} from '@/canvascore/react';

const TimelineContextMenu = () => {
  const {time, setTime} = useTimer();
  const {
    scenes,
    setScenes,
    setContextMenuTimelineRequest,
    contextMenuTimelineRequest,
    setCurrentScene,
    setCurrentDesign,
  } = useDesignEditorContext();
  const ref = useRef(null);
  const editor = useEditor();
  const frame = useFrame();
  useOnClickOutside(ref, () => {
    setContextMenuTimelineRequest({
      ...contextMenuTimelineRequest,
      visible: false,
    });
  });

  const timelineItemsContainerBounds = document
    .getElementById('TimelineItemsContainer')
    ?.getBoundingClientRect() || {
    top: 0,
    left: 0,
  };

  const makeDeleteScene = async () => {
    const updatedScenes = scenes.filter(
      (scene) => scene.id !== contextMenuTimelineRequest.id,
    );

    const sceneIndexInTime = findSceneIndexByTime(updatedScenes, time);
    // Adjust time if deleted scene is current scene
    if (sceneIndexInTime < 0) {
      const maxTime = getMaxTime(updatedScenes);
      setTime(maxTime - 1);
    }
    setContextMenuTimelineRequest({
      ...contextMenuTimelineRequest,
      visible: false,
    });
    if (updatedScenes[0]) {
      setScenes(updatedScenes);
    } else {
      const defaultTemplate = getDefaultTemplate({
        width: frame.width,
        height: frame.height,
      });

      await editor.scene.importFromJSON(defaultTemplate);
      setCurrentDesign({
        id: nanoid(),
        frame: defaultTemplate.frame,
        metadata: {},
        name: 'Untitled Design',
        preview: '',
        scenes: [],
        type: 'VIDEO',
      });
      const initialDesign = editor.scene.exportToJSON();
      const preview = await editor.renderer.render(initialDesign);
      setCurrentScene({...initialDesign, preview: preview, duration: 5000});
      setScenes([{...initialDesign, preview: preview, duration: 5000}]);
    }
  };

  const makeAddScene = () => {};

  const makeDuplicateScene = () => {
    const currentScene = scenes.find(
      (scene) => scene.id === contextMenuTimelineRequest.id,
    );
    const updatedScenes = [...scenes, {...currentScene, id: nanoid()}];
    setScenes(updatedScenes);
    setContextMenuTimelineRequest({
      ...contextMenuTimelineRequest,
      visible: false,
    });
  };

  return (
    <Box
      ref={ref}
      width="160px"
      position="absolute"
      backgroundColor="#ffffff"
      boxShadow="0 0 0 1px rgba(64,87,109,0.07),0 2px 12px rgba(53,71,90,0.2)"
      zIndex={4}
      top={`${
        contextMenuTimelineRequest.top - timelineItemsContainerBounds.top - 80
      }px`}
      left={`${
        contextMenuTimelineRequest.left - timelineItemsContainerBounds.left
      }px`}
      padding="0.5rem 0"
    >
      <Box
        onClick={makeDuplicateScene}
        fontSize="14px"
        height="28px"
        display="flex"
        alignItems="center"
        padding="0 1rem"
        _hover={{
          backgroundColor: 'rgba(0,0,0,0.1)',
          cursor: 'pointer',
        }}
      >
        Duplicate Scene
      </Box>
      <Box
        onClick={makeDeleteScene}
        fontSize="14px"
        height="28px"
        display="flex"
        alignItems="center"
        padding="0 1rem"
        _hover={{
          backgroundColor: 'rgba(0,0,0,0.1)',
          cursor: 'pointer',
        }}
      >
        Delete Scene
      </Box>
    </Box>
  );
};

export default TimelineContextMenu;
