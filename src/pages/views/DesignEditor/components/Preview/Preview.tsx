import React from 'react';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import useEditorType from '~/hooks/useEditorType';
import {Box} from '@chakra-ui/react';
import Video from './Video';
import Presentation from './Presentation';
import Graphic from './Graphic';

interface ComponentProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const Preview = ({isOpen, setIsOpen}: ComponentProps) => {
  const editorType = useEditorType();

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDirection="column"
          height="100%"
          position="relative"
        >
          <Box
            position="absolute"
            flex={1}
            height="100%"
            width="100%"
            display="flex"
          >
            {editorType === 'GRAPHIC' && <Graphic />}
            {editorType === 'PRESENTATION' && <Presentation />}
            {editorType === 'VIDEO' && <Video />}
            {editorType === 'NONE' && <></>}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Preview;
