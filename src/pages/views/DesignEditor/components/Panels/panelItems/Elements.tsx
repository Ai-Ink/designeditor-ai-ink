import React from 'react';
import {useEditor} from '@layerhub-io/react';
import {useStyletron} from 'styletron-react';
import {Box, Button} from '@chakra-ui/react';
import {AngleDoubleLeftIcon} from '@chakra-ui/icons';
import Scrollable from '@/components/Scrollable';
import {graphics} from '@/constants/mock-data';
import useSetIsSidebarOpen from '@/hooks/useSetIsSidebarOpen';
import SVGItem from './SVGItem';
import SVGItemsGrid from './SVGItemsGrid';

const Elements = () => {
  const [css] = useStyletron();
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
          <AngleDoubleLeftIcon boxSize={4} />
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
  const [css] = useStyletron();
  return (
    <div
      onClick={onClick}
      className={css({
        position: 'relative',
        background: '#f8f8fb',
        cursor: 'pointer',
        borderRadius: '8px',
        overflow: 'hidden',
        ':hover': {
          opacity: 1,
          background: 'rgb(233,233,233)',
        },
      })}
    >
      <img
        src={preview}
        className={css({
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          verticalAlign: 'middle',
        })}
      />
    </div>
  );
};

export default Elements;
