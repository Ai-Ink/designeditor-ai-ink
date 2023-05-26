import Navbar from '@/views/DesignEditor/components/Navbar';
import Panels from '@/views/DesignEditor/components/Panels';
import CanvasUI from '@/views/DesignEditor/components/Canvas';
import Footer from '@/views/DesignEditor/components/Footer';
import Toolbox from '@/views/DesignEditor/components/Toolbox';
import EditorContainer from '@/views/DesignEditor/components/EditorContainer';
import ContextMenu from '@/views/DesignEditor/components/ContextMenu';
import React from 'react';

class GraphicEditor extends React.Component {
  render() {
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
            <CanvasUI />
            <Footer />
          </div>
        </div>
      </EditorContainer>
    );
  }
}

export default GraphicEditor;
