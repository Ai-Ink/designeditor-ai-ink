import React from 'react';
import {useTimer} from '@layerhub-io/use-timer';
import {Box} from '@chakra-ui/react';
import {DesignEditorContext} from '@/contexts/DesignEditor';

const SCALE_FACTOR = 1;

const TimeMarker = () => {
  const {time, setTime, pause} = useTimer();

  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const {scenes, setDisplayPlayback, maxTime, setMaxTime} =
    React.useContext(DesignEditorContext);

  React.useEffect(() => {
    if (time * SCALE_FACTOR <= maxTime) {
      setPosition({...position, x: (time * SCALE_FACTOR) / 40, y: 0});
    } else {
      pause();
      setDisplayPlayback(false);
    }
  }, [time]);

  React.useEffect(() => {
    if (scenes) {
      const maxTime = scenes.reduce(function (previousVal, currentValue) {
        return previousVal + currentValue.duration!;
      }, 0);
      setMaxTime(maxTime);
    }
  }, [scenes]);

  const onStart = () => {
    const playHeadDomRef = document.getElementById(
      'EditorPlayHead',
    ) as HTMLDivElement;
    const initialX = playHeadDomRef.offsetLeft;
    const panelsListRef = document.getElementById(
      'EditorPanelList',
    ) as HTMLDivElement;
    const panelItemRef = document.getElementById(
      'EditorPanelItem',
    ) as HTMLDivElement;
    const playControlRef = document.getElementById(
      'EditorPlayControl',
    ) as HTMLDivElement;

    const panelItemsWidth =
      panelsListRef.getBoundingClientRect().width +
      panelItemRef.getBoundingClientRect().width +
      playControlRef.getBoundingClientRect().width;

    const onDrag = (ev: MouseEvent) => {
      let x = ev.clientX - initialX - panelItemsWidth;
      let newX = initialX + x * 40;
      if (newX + 2 <= 0 || newX >= maxTime) return;
      setTime(newX);
    };

    const onStop = () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', onStop);
    };

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onStop);
  };

  return (
    <Box
      onMouseDown={onStart}
      pos="absolute"
      zIndex="3"
      left={`${position.x}px`}
      top="-2px"
      w="2px"
      h="100%"
    >
      <Box
        id="EditorPlayHead"
        w="0"
        h="0"
        borderLeft="9px solid transparent"
        borderRight="9px solid transparent"
        borderTop="11px solid #333333"
        borderRadius="5px"
        transform="translate(-8px, -1px)"
      />

      <Box
        id="markerLine"
        h="84px"
        w="2px"
        bg="#333333"
        transform="translate(0, -2px)"
      />
    </Box>
  );
};

export default TimeMarker;
