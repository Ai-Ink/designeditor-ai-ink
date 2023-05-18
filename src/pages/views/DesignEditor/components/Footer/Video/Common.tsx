import React, {useState, useEffect} from 'react';
import {Box, Button} from '@chakra-ui/react';
import Icons from '@/components/Icons';
import {useZoomRatio} from '@layerhub-io/react';
import {useTimer} from '@layerhub-io/use-timer';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';

const Common = () => {
  const {time} = useTimer();
  const {maxTime} = useDesignEditorContext();
  const [options, setOptions] = useState({
    zoomRatio: 20,
  });
  const zoomRatio = useZoomRatio();

  useEffect(() => {
    setOptions({...options, zoomRatio: Math.round(zoomRatio * 100)});
  }, [zoomRatio]);

  return (
    <Box
      height="50px"
      background="#ffffff"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        className={css({
          display: 'flex',
          fontWeight: 500,
          fontSize: '15px',
          alignItems: 'center',
        })}
      >
        <Button variant="unstyled">
          <Icons.Layers size={20} color="black" />
        </Button>
        <Box>
          {new Date(time).toISOString().slice(14, 19)} /{' '}
          {new Date(maxTime).toISOString().slice(14, 19)}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Button variant="unstyled">{options.zoomRatio}</Button>
        <Button variant="unstyled">
          <Icons.Refresh size={16} color="black" />
        </Button>
        <Button variant="unstyled">
          <Icons.Undo size={22} color="black" />
        </Button>
        <Button variant="unstyled">
          <Icons.Redo size={22} color="black" />
        </Button>
        <Button variant="unstyled">
          <Icons.TimePast size={16} color="black" />
        </Button>
      </Box>
    </Box>
  );
};

export default Common;
