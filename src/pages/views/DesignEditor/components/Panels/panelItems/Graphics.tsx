import React from 'react';
import {Box, Button} from '@chakra-ui/react';
import AngleDoubleLeft from '@/components/Icons/AngleDoubleLeft';
import Scrollable from '@/components/Scrollable';
import {vectors} from '@/constants/mock-data';
import {useEditor} from '@/canvascore/react';
import useSetIsSidebarOpen from '@/hooks/useSetIsSidebarOpen';

const Graphics = () => {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: 'StaticVector',
          src: url,
        };
        editor.objects.add(options);
      }
    },
    [editor],
  );

  const handleDropFiles = (files: FileList) => {
    const file = files[0];
    const url = URL.createObjectURL(file);
    editor.objects.add({
      src: url,
      type: 'StaticVector',
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!);
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        <Box>Graphics</Box>
        <Box
          onClick={() => setIsSidebarOpen(false)}
          cursor="pointer"
          display="flex"
        >
          <AngleDoubleLeft size={18} />
        </Box>
      </Box>
      <Box padding="0 1.5rem">
        <Button onClick={handleInputFileRefClick} size="sm" width="100%">
          Computer
        </Button>
      </Box>
      <Scrollable>
        <input
          onChange={handleFileInput}
          type="file"
          id="file"
          ref={inputFileRef}
          style={{display: 'none'}}
        />
        <Box
          display="grid"
          gap="8px"
          padding="1.5rem"
          gridTemplateColumns="1fr 1fr"
        >
          {vectors.map((vector, index) => (
            <GraphicItem
              onClick={() => addObject(vector)}
              key={index}
              preview={vector}
            />
          ))}
        </Box>
      </Scrollable>
    </Box>
  );
};

const GraphicItem = ({
  preview,
  onClick,
}: {
  preview: any;
  onClick?: (option: any) => void;
}) => {
  return (
    <Box
      onClick={onClick}
      position="relative"
      height="84px"
      background="#f8f8fb"
      cursor="pointer"
      padding="12px"
      borderRadius="8px"
      overflow="hidden"
      _before={{
        content: "''",
        backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
        height: '100%',
        width: '100%',
        _hover: {
          opacity: 1,
        },
      }}
    >
      <img
        src={preview}
        width="100%"
        height="100%"
        objectFit="contain"
        pointerEvents="none"
        verticalAlign="middle"
      />
    </Box>
  );
};

export default Graphics;
