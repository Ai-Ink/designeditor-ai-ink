import React from 'react';
import {Box} from '@chakra-ui/react';
import {
  useActiveObject,
  useContextMenuRequest,
  useEditor,
} from '@layerhub-io/react';
import BringToFront from '@/components/Icons/BringToFront';
import Delete from '@/components/Icons/Delete';
import Duplicate from '@/components/Icons/Duplicate';
import Elements from '@/components/Icons/Elements';
import Locked from '@/components/Icons/Locked';
import Paste from '@/components/Icons/Paste';
import SendToBack from '@/components/Icons/SendToBack';
import Unlocked from '@/components/Icons/Unlocked';

const ContextMenu = () => {
  const contextMenuRequest = useContextMenuRequest();
  const editor = useEditor();
  const activeObject = useActiveObject();

  const handleAsComponentHandler = async () => {
    if (editor) {
      const component = await editor.scene.exportAsComponent();
      if (component) {
        console.log({component});
      }
    }
  };

  if (!contextMenuRequest || !contextMenuRequest.target) {
    return null;
  }

  const baseStyles = {
    position: 'absolute',
    top: `${contextMenuRequest.top}px`,
    left: `${contextMenuRequest.left}px`,
    zIndex: 129,
    width: '240px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
    padding: '0.5rem 0',
  };

  const handleCopy = () => {
    editor.objects.copy();
    editor.cancelContextMenuRequest();
  };

  const handlePaste = () => {
    editor.objects.paste();
    editor.cancelContextMenuRequest();
  };

  const handleDelete = () => {
    editor.objects.remove();
    editor.cancelContextMenuRequest();
  };

  const handleBringForward = () => {
    editor.objects.bringForward();
    editor.cancelContextMenuRequest();
  };

  const handleSendBackwards = () => {
    editor.objects.sendBackwards();
    editor.cancelContextMenuRequest();
  };

  const handleLock = () => {
    editor.objects.lock();
    editor.cancelContextMenuRequest();
  };

  const handleUnlock = () => {
    editor.objects.unlock();
    editor.cancelContextMenuRequest();
  };

  const handleSetAsBackgroundImage = () => {
    editor.objects.setAsBackgroundImage();
    editor.cancelContextMenuRequest();
  };

  const renderContextMenuItems = () => {
    return (
      <Box {...baseStyles}>
        <ContextMenuItem
          onClick={handleCopy}
          icon={<Duplicate size={24} />}
          label="copy"
        />
        <ContextMenuItem
          onClick={handlePaste}
          icon={<Paste size={24} />}
          label="paste"
        />
        <ContextMenuItem
          onClick={handleDelete}
          icon={<Delete size={24} />}
          label="delete"
        />
        <Box style={{margin: '0.5rem 0'}} />
        <ContextMenuItem
          onClick={handleBringForward}
          icon={<BringToFront size={24} />}
          label="bring forward"
        />
        <ContextMenuItem
          onClick={handleSendBackwards}
          icon={<SendToBack size={24} />}
          label="send backward"
        />
        <ContextMenuItem
          onClick={handleAsComponentHandler}
          icon={<Elements size={24} />}
          label="Save as component"
        />
        <Box style={{margin: '0.5rem 0'}} />
        <ContextMenuItem
          onClick={handleLock}
          icon={<Locked size={24} />}
          label="lock"
        />
        {activeObject?.type === 'StaticImage' && (
          <ContextMenuItem
            onClick={handleSetAsBackgroundImage}
            icon={<Elements size={24} />}
            label="Set as background image"
          />
        )}
      </Box>
    );
  };

  const renderLockedContextMenu = () => {
    return (
      <Box {...baseStyles}>
        <ContextMenuItem
          onClick={handleUnlock}
          icon={<Unlocked size={24} />}
          label="unlock"
        />
      </Box>
    );
  };

  const target = contextMenuRequest.target;

  return target.type === 'Background'
    ? renderContextMenuItems()
    : target.locked
    ? renderLockedContextMenu()
    : renderContextMenuItems();
};

const ContextMenuItem = ({icon, label, onClick}) => {
  return (
    <Box
      display="flex"
      height="32px"
      fontSize="14px"
      alignItems="center"
      padding="0 1rem"
      gap="1rem"
      cursor="pointer"
      opacity={1}
      _hover={{backgroundColor: 'rgba(0,0,0,0.075)'}}
      onClick={onClick}
    >
      {icon} {label}
    </Box>
  );
};

export default ContextMenu;
