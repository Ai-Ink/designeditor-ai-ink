import React from 'react';
import {Box} from '@chakra-ui/react';
import {useTimer} from '@layerhub-io/use-timer';
import Pause from '@/components/Icons/Pause';
import PlaySolid from '@/components/Icons/PlaySolid';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';

const TimelineControl = () => {
  const {pause, status} = useTimer();
  const {setDisplayPlayback} = useDesignEditorContext();

  return (
    <Box id="EditorPlayControl" padding="0 1rem">
      <Box
        onClick={
          status === 'STOPPED' || status === 'PAUSED'
            ? () => {
                setDisplayPlayback(true);
              }
            : () => {
                pause();
                setDisplayPlayback(false);
              }
        }
        height="56px"
        width="56px"
        background="#ffffff"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 0 0 1px rgba(64,87,109,0.07),0 2px 12px rgba(53,71,90,0.2)"
      >
        {status === 'STOPPED' || status === 'PAUSED' ? (
          <PlaySolid size={24} />
        ) : (
          <Pause size={24} />
        )}
      </Box>
    </Box>
  );
};

export default TimelineControl;
