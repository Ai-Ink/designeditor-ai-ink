import useEditorType from '@/hooks/useEditorType';
import SelectEditor from '@/views/DesignEditor/SelectEditor';
import GraphicEditor from '@/views/DesignEditor/GraphicEditor';
import PresentationEditor from '@/views/DesignEditor/PresentationEditor';
import VideoEditor from '@/views/DesignEditor/VideoEditor';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';
import Preview from '@/views/DesignEditor/components/Preview';
import ContextMenu from '@/views/DesignEditor/components/ContextMenu';

const DesignEditor = () => {
  const editorType = useEditorType();
  const {displayPreview, setDisplayPreview} = useDesignEditorContext();

  return (
    <>
      {displayPreview && (
        <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />
      )}
      {
        {
          NONE: <SelectEditor />,
          GRAPHIC: <GraphicEditor />,
        }[editorType]
      }
    </>
  );
};

export default DesignEditor;
