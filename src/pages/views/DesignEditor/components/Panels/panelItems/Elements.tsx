import React from 'react';
import {useEditor} from '@/canvascore/react';
import {Box, Image} from '@chakra-ui/react';
import AngleDoubleLeft from '@/components/Icons/AngleDoubleLeft';
import Scrollable from '@/components/Scrollable';
import {graphics} from '@/constants/mock-data';
import useSetIsSidebarOpen from '@/hooks/useSetIsSidebarOpen';
import SVGItem from './SVGItem';
import SVGItemsGrid from './SVGItemsGrid';

const Elements = () => {
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();

  const addObject = React.useCallback(
    (item: any) => {
      if (editor) {
        editor.objects.add(item);
      }
    },
    [editor],
  );

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        <Box>Elements</Box>

        <Box
          onClick={() => setIsSidebarOpen(false)}
          cursor="pointer"
          display="flex"
        >
          <AngleDoubleLeft size={18} color="black" />
        </Box>
      </Box>
      <Scrollable>
        <Box>
          <Box
            display="grid"
            gap="8px"
            padding="1.5rem"
            gridTemplateColumns="repeat(4, 1fr)"
          >
            <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
              {graphics.map((graphic, index) => (
                <SVGItem
                  key={index}
                  id={index}
                  graphic={graphic}
                  addObject={addObject}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Scrollable>
    </Box>
  );
};

const ImageItem = ({
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
      bg="#f8f8fb"
      cursor="pointer"
      borderRadius="8px"
      overflow="hidden"
      _hover={{
        opacity: 1,
        background: 'rgb(233,233,233)',
      }}
    >
      <Image
        src={preview}
        w="100%"
        h="100%"
        objectFit="contain"
        pointerEvents="none"
        verticalAlign="middle"
      />
    </Box>
  );
};

export default Elements;
