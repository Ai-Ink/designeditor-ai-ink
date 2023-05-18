import React, {useState} from 'react';
import {Box, Button} from '@chakra-ui/react';
import {DesignType} from '@/interfaces/DesignEditor';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';
import Video from '@/components/Icons/Video';
import Images from '@/components/Icons/Images';
import Presentation from '@/components/Icons/Presentation';

const SelectEditor = () => {
  const [selectedEditor, setSelectedEditor] = useState<DesignType>('GRAPHIC');
  const {setEditorType} = useDesignEditorContext();

  return (
    <Box
      height="100vh"
      width="100vw"
      bg="#ffffff"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Box display="flex" gap="2rem">
          <Box
            onClick={() => setSelectedEditor('GRAPHIC')}
            height="180px"
            width="180px"
            bg={selectedEditor === 'GRAPHIC' ? '#000000' : 'rgb(231, 236, 239)'}
            color={selectedEditor === 'GRAPHIC' ? '#ffffff' : '#333333'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            flexDirection="column"
            gap="0.5rem"
          >
            <Images size={34} color="red" />
            <Box>Graphic</Box>
          </Box>
          <Box
            onClick={() => setSelectedEditor('PRESENTATION')}
            height="180px"
            width="180px"
            bg={
              selectedEditor === 'PRESENTATION'
                ? '#000000'
                : 'rgb(231, 236, 239)'
            }
            color={selectedEditor === 'PRESENTATION' ? '#ffffff' : '#333333'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            flexDirection="column"
            gap="0.5rem"
          >
            <Presentation size={36} color="red" />
            <Box>Presentation</Box>
          </Box>
          <Box
            onClick={() => setSelectedEditor('VIDEO')}
            height="180px"
            width="180px"
            bg={selectedEditor === 'VIDEO' ? '#000000' : 'rgb(231, 236, 239)'}
            color={selectedEditor === 'VIDEO' ? '#ffffff' : '#333333'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            flexDirection="column"
            gap="0.5rem"
          >
            <Video size={36} color="red" />
            <Box>Video</Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="2rem"
        >
          <Button
            width="180px"
            color="white"
            bgColor="black"
            onClick={() => setEditorType(selectedEditor)}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectEditor;
