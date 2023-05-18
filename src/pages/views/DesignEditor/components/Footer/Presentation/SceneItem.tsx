import React from 'react';
import {Box, Image} from '@chakra-ui/react';
import {IScene} from '@layerhub-io/types';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';

interface Props {
  isCurrentScene: boolean;
  scene: IScene;
  preview: string;
  index: number;
  changePage: (p: IScene) => void;
}

const SceneItem: React.FC<Props> = ({
  isCurrentScene,
  scene,
  preview,
  index,
  changePage,
}: Props) => {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({
      id: scene.id,
    });
  const sceneRef = React.useRef<HTMLDivElement>(null);
  const {setContextMenuTimelineRequest} = useDesignEditorContext();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'pointer',
  };

  React.useEffect(() => {
    const timeLineItemDiv = sceneRef.current;
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      setContextMenuTimelineRequest({
        id: scene.id,
        left: event.pageX,
        top: event.pageY,
        visible: true,
      });
    };
    if (timeLineItemDiv) {
      timeLineItemDiv.addEventListener('contextmenu', handleContextMenu);
    }
    return () => {
      if (timeLineItemDiv) {
        timeLineItemDiv.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, [sceneRef, scene]);

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      bg={isCurrentScene ? 'rgb(243,244,246)' : '#ffffff'}
      padding="1rem 0.5rem"
      {...style}
    >
      <Box
        ref={sceneRef}
        onClick={() => changePage(scene)}
        cursor="pointer"
        position="relative"
        border={
          isCurrentScene ? '2px solid #7158e2' : '2px solid rgba(0,0,0,.15)'
        }
      >
        <Image
          maxW="90px"
          maxH="80px"
          display="flex"
          src={preview}
          alt="Scene Preview"
        />
        <Box
          position="absolute"
          bottom="4px"
          right="4px"
          background="rgba(0,0,0,0.4)"
          color="#fff"
          fontSize="10px"
          borderRadius="2px"
          height="16px"
          width="16px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {index + 1}
        </Box>
      </Box>
    </Box>
  );
};

export default SceneItem;
