import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {useEditor} from '@layerhub-io/react';
import {Tooltip} from '@chakra-ui/react';
import {Button} from '@chakra-ui/react';
import UnlockedIcon from '@/components/Icons/Unlocked';

const Locked = () => {
  const editor = useEditor();

  return (
    <Flex
      flex={1}
      alignItems="center"
      padding="0 12px"
      justifyContent="flex-end"
    >
      <Tooltip label="Unlock" placement="bottom" hasArrow>
        <Button
          onClick={() => {
            editor.objects.unlock();
          }}
          size="sm"
          variant="ghost"
        >
          <UnlockedIcon size={24} color="black" />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default Locked;
