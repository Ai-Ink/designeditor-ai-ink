import Navbar from '@/views/DesignEditor/components/Navbar';
import Panels from '@/views/DesignEditor/components/Panels';
import Canvas from '@/views/DesignEditor/components/Canvas';
import Footer from '@/views/DesignEditor/components/Footer';
import Toolbox from '@/views/DesignEditor/components/Toolbox';
import EditorContainer from '@/views/DesignEditor/components/EditorContainer';
import ContextMenu from '@/views/DesignEditor/components/ContextMenu';

const GraphicEditor = () => {
  return (
    <EditorContainer>
      <Navbar />
      <div style={{display: 'flex', flex: 1}}>
        <Panels />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Toolbox />
          <Canvas />
          <Footer />
        </div>
      </div>
    </EditorContainer>
  );
};

export default GraphicEditor;
