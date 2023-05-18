import React from 'react';
import {Box} from '@chakra-ui/react';
import {useEditor, useObjects} from '@layerhub-io/react';
import AngleDoubleLeft from '@/components/Icons/AngleDoubleLeft';
import Scrollable from '@/components/Scrollable';
import {ILayer} from '@layerhub-io/types';
import Locked from '@/components/Icons/Locked';
import Unlocked from '@/components/Icons/Unlocked';
import Eye from '@/components/Icons/Eye';
import EyeCrossed from '@/components/Icons/EyeCrossed';
import Delete from '@/components/Icons/Delete';
import {Button, IconButton} from '@chakra-ui/react';
import useSetIsSidebarOpen from '@/hooks/useSetIsSidebarOpen';

const Layers = () => {
  const editor = useEditor();
  const objects = useObjects() as ILayer[];
  const [layerObjects, setLayerObjects] = React.useState<any[]>([]);
  const setIsSidebarOpen = useSetIsSidebarOpen();

  React.useEffect(() => {
    if (objects) {
      setLayerObjects(objects);
    }
  }, [objects]);

  React.useEffect(() => {
    let watcher = async () => {
      if (objects) {
        setLayerObjects([...objects]);
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
  }, [editor, objects]);

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        <Box>Layers</Box>
        <IconButton
          icon={<AngleDoubleLeft size={18} />}
          onClick={() => setIsSidebarOpen(false)}
          cursor="pointer"
        />
      </Box>
      <Scrollable>
        <Box padding="0 1.5rem">
          {layerObjects.map((object) => (
            <Box
              key={object.id}
              display="grid"
              gridTemplateColumns="1fr 90px"
              fontSize="14px"
              alignItems="center"
              _hover={{background: 'rgb(245,246,247)'}}
            >
              <Box
                cursor="pointer"
                onClick={() => editor.objects.select(object.id)}
              >
                {object.name}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                {object.locked ? (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => editor.objects.unlock(object.id)}
                    paddingLeft="4px"
                    paddingRight="4px"
                  >
                    <Locked size={24} />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => editor.objects.lock(object.id)}
                    paddingLeft="4px"
                    paddingRight="4px"
                  >
                    <Unlocked size={24} />
                  </Button>
                )}

                {object.visible ? (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() =>
                      editor.objects.update({visible: false}, object.id)
                    }
                    paddingLeft="4px"
                    paddingRight="4px"
                  >
                    <Eye size={24} />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() =>
                      editor.objects.update({visible: true}, object.id)
                    }
                    paddingLeft="4px"
                    paddingRight="4px"
                  >
                    <EyeCrossed size={24} />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => editor.objects.remove(object.id)}
                  paddingLeft="4px"
                  paddingRight="4px"
                >
                  <Delete size={24} />
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Scrollable>
    </Box>
  );
};

export default Layers;
