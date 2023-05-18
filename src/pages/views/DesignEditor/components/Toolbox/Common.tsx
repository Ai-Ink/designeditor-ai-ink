import React from 'react';
import {Box, Button, Checkbox, Flex, Tooltip} from '@chakra-ui/react';
import {useActiveObject, useEditor} from '@layerhub-io/react';
import {StatefulPopover, Placement} from 'react-tiny-popover';
import DeleteIcon from '@/components/Icons/Delete';
import UnlockedIcon from '@/components/Icons/Unlocked';
import LockedIcon from '@/components/Icons/Locked';
import DuplicateIcon from '@/components/Icons/Duplicate';
import LayersIcon from '@/components/Icons/Layers';
import AlignCenterIcon from '@/components/Icons/AlignCenter';
import AlignLeftIcon from '@/components/Icons/AlignLeft';
import AlignRightIcon from '@/components/Icons/AlignRight';
import AlignTopIcon from '@/components/Icons/AlignTop';
import AlignMiddleIcon from '@/components/Icons/AlignMiddle';
import BringToFrontIcon from '@/components/Icons/BringToFront';
import SendToBackIcon from '@/components/Icons/SendToBack';
import Opacity from './Shared/Opacity';

const Common = () => {
  const [state, setState] = React.useState({isGroup: false, isMultiple: false});
  const activeObject = useActiveObject();

  const editor = useEditor();

  React.useEffect(() => {
    if (activeObject) {
      setState({
        isGroup: activeObject.type === 'group',
        isMultiple: activeObject.type === 'activeSelection',
      });
    }
  }, [activeObject]);

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject) {
        // @ts-ignore
        setState({
          isGroup: activeObject.type === 'group',
          isMultiple: activeObject.type === 'activeSelection',
        });
      }
    };
    if (editor) {
      editor.on('history:changed', watcher);
    }
    return () => {
      if (editor) {
        editor.off('history:changed', watcher);
      }
    };
  }, [editor, activeObject]);

  return (
    <Flex alignItems="center">
      {state.isGroup ? (
        <Button
          onClick={() => {
            editor.objects.ungroup();
            setState({...state, isGroup: false});
          }}
          size="sm"
          variant="ghost"
        >
          Ungroup
        </Button>
      ) : state.isMultiple ? (
        <Button
          onClick={() => {
            editor.objects.group();
            setState({...state, isGroup: true});
          }}
          size="sm"
          variant="ghost"
        >
          Group
        </Button>
      ) : null}

      {(state.isGroup || !state.isMultiple) && <CommonLayers />}

      <CommonAlign />
      <Opacity />
      <LockUnlock />
      <Tooltip label="Duplicate" placement="bottom">
        <Button
          onClick={() => editor.objects.clone()}
          size="xs"
          variant="ghost"
        >
          <DuplicateIcon size={22} />
        </Button>
      </Tooltip>
      <Tooltip label="Delete" placement="bottom">
        <Button
          onClick={() => editor.objects.remove()}
          size="xs"
          variant="ghost"
        >
          <DeleteIcon size={24} />
        </Button>
      </Tooltip>
    </Flex>
  );
};

const CommonLayers = () => {
  const editor = useEditor();
  const [checked, setChecked] = React.useState(true);
  const activeObject = useActiveObject();

  React.useEffect(() => {
    if (activeObject) {
      //  @ts-ignore
      setChecked(!!activeObject.clipPath);
    }
  }, [activeObject]);

  return (
    <StatefulPopover
      placement={Placement.BOTTOM_RIGHT}
      content={() => (
        <Box p="12px" backgroundColor="#ffffff">
          <Flex gridTemplateColumns="1fr 1fr" gridGap="8px">
            <Button
              startIcon={<BringToFrontIcon size={24} />}
              onClick={() => editor.objects.bringToFront()}
              size="xs"
              variant="ghost"
            >
              Bring to front
            </Button>
            <Button
              startIcon={<SendToBackIcon size={24} />}
              onClick={() => editor.objects.sendToBack()}
              size="xs"
              variant="ghost"
            >
              Send to back
            </Button>
          </Flex>

          <Flex
            display="flex"
            fontSize="12px"
            alignItems="center"
            gap="0.5rem"
            fontWeight={500}
            fontFamily="system-ui"
            padding="0.5rem 0.5rem"
            cursor="pointer"
            _hover={{
              background: 'rgb(244,245,246)',
            }}
          >
            <Checkbox
              size="sm"
              isChecked={checked}
              onChange={() => {
                editor.objects.update({clipToFrame: !checked});
                setChecked(!checked);
              }}
            />
            <Box>Clip to frame</Box>
          </Flex>
        </Box>
      )}
      returnFocus
      autoFocus
    >
      <Box>
        <Tooltip label="Layers" placement="bottom">
          <Button size="xs" variant="ghost">
            <LayersIcon size={19} />
          </Button>
        </Tooltip>
      </Box>
    </StatefulPopover>
  );
};

const CommonAlign = () => {
  const editor = useEditor();

  return (
    <StatefulPopover
      placement={Placement.BOTTOM_RIGHT}
      content={() => (
        <Box
          p="12px"
          backgroundColor="#ffffff"
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
          gridGap="8px"
        >
          <Button
            onClick={() => editor.objects.alignLeft()}
            size="xs"
            variant="ghost"
          >
            <AlignLeftIcon size={24} />
          </Button>
          <Button
            onClick={() => editor.objects.alignCenter()}
            size="xs"
            variant="ghost"
          >
            <AlignCenterIcon size={24} />
          </Button>
          <Button
            onClick={() => editor.objects.alignRight()}
            size="xs"
            variant="ghost"
          >
            <AlignRightIcon size={24} />
          </Button>
          <Button
            onClick={() => editor.objects.alignTop()}
            size="xs"
            variant="ghost"
          >
            <AlignTopIcon size={24} />
          </Button>
          <Button
            onClick={() => editor.objects.alignMiddle()}
            size="xs"
            variant="ghost"
          >
            <AlignMiddleIcon size={24} />
          </Button>
          <Button
            onClick={() => editor.objects.alignBottom()}
            size="xs"
            variant="ghost"
          >
            <AlignBottomIcon size={24} />
          </Button>
        </Box>
      )}
      returnFocus
      autoFocus
    >
      <Box>
        <Tooltip label="Align" placement="bottom">
          <Button size="xs" variant="ghost">
            <AlignCenterIcon size={24} />
          </Button>
        </Tooltip>
      </Box>
    </StatefulPopover>
  );
};

const LockUnlock = () => {
  const [state, setState] = React.useState<{locked: boolean}>({locked: false});
  const editor = useEditor();
  const activeObject = useActiveObject();

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({locked: !!activeObject.locked});
    }
  }, [activeObject]);

  return state.locked ? (
    <Tooltip label="Lock" placement="bottom">
      <Button
        onClick={() => {
          editor.objects.unlock();
          setState({locked: false});
        }}
        size="xs"
        variant="ghost"
      >
        <UnlockedIcon size={24} />
      </Button>
    </Tooltip>
  ) : (
    <Tooltip label="Lock" placement="bottom">
      <Button
        onClick={() => {
          editor.objects.lock();
          setState({locked: true});
        }}
        size="xs"
        variant="ghost"
      >
        <LockedIcon size={24} />
      </Button>
    </Tooltip>
  );
};

export default Common;
