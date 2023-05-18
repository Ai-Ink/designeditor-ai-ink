import React from 'react';
import {Box} from '@chakra-ui/react';
import {useEditor, useZoomRatio} from '@layerhub-io/react';
import {useTimer} from '@layerhub-io/use-timer';
import Controller from './Controler';
import useDesignEditorPages from '~/hooks/useDesignEditorScenes';

const Playback = () => {
  const editor = useEditor();
  const controller = React.useRef<Controller>();
  const frameBoundingRect = editor.frame.getBoundingClientRect();
  const [initialized, setInitialized] = React.useState(false);
  const zoomRatio = useZoomRatio() as number;
  const {start, time} = useTimer();
  const pages = useDesignEditorPages();

  const loadFrames = React.useCallback(async () => {
    const currentTemplate = editor.scene.exportToJSON();

    let refTime = 0;
    const templates = pages.map((page) => {
      const currentTemplate = editor.scene.exportToJSON();
      if (page.id === currentTemplate.id) {
        return {...currentTemplate, duration: page.duration};
      }
      return page;
    });

    let clips = [];
    for (const template of templates) {
      const layers = await editor.scene.exportLayers(template);
      const timedLayers = layers.map((layer) => {
        return {
          ...layer,
          display: {
            from: refTime,
            to: refTime + template.duration!,
          },
        };
      });
      clips.push({
        duration: template.duration!,
        layers: timedLayers,
      });

      refTime += template.duration!;
    }

    const videoTemplate = {
      name: currentTemplate.name,
      frame: currentTemplate.frame,
      clips: clips,
    };

    const layers = await editor.scene.exportLayers(currentTemplate);

    controller.current = new Controller('scenify_playback_container', {
      data: layers,
      template: videoTemplate,
      zoomRatio,
    });

    let interval: any;
    interval = setInterval(() => {
      if (controller.current?.initialized) {
        clearInterval(interval);
        setInitialized(true);
      }
    }, 50);
  }, [editor, pages, zoomRatio]);

  React.useEffect(() => {
    if (initialized && time && controller.current) {
      controller.current.render(time);
    }
  }, [time, initialized, controller]);

  React.useEffect(() => {
    if (editor) {
      loadFrames();
    }
  }, [editor, loadFrames]);

  React.useEffect(() => {
    if (controller.current && initialized) {
      controller.current!.play();
      start();
    }
  }, [initialized, controller, start]);

  return (
    <Box
      display="flex"
      flex={1}
      background="#f1f2f6"
      width="100%"
      height="100%"
      position="absolute"
      zIndex={4}
    >
      <Box height="100%" width="100%" position="relative">
        <Box
          id="scenify_playback_container"
          height={`${frameBoundingRect.height}px`}
          width={`${frameBoundingRect.width}px`}
          position="absolute"
          top={`${frameBoundingRect.top}px`}
          left={`${frameBoundingRect.left}px`}
          zIndex={1000}
        ></Box>
      </Box>
    </Box>
  );
};

export default Playback;
