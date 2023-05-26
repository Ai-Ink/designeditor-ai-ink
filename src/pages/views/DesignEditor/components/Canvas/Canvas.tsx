import React from 'react';
// import {Canvas as LayerhubCanvas} from '@/canvascore/react';
import Canvas from '@/canvas/Canvas';
import Playback from '../Playback';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';
import ContextMenu from '../ContextMenu';
import {Box} from '@chakra-ui/react';
import CanvasFooter from '../Footer/CanvasFooter';

const CanvasUI = () => {
  const {displayPlayback} = useDesignEditorContext();
  return (
    <div style={{flex: 1, display: 'flex', position: 'relative'}}>
      {displayPlayback && <Playback />}
      <ContextMenu />
      <Canvas
        config={{
          background: '#f1f2f6',
          controlsPosition: {
            rotation: 'BOTTOM',
          },
          shadow: {
            blur: 4,
            color: '#fcfcfc',
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
      // Inside your component render method
      <Box className="rde-editor-footer-toolbar">
        <CanvasFooter
          canvasRef={this.canvasRef}
          preview={preview}
          onChangePreview={onChangePreview}
          zoomRatio={zoomRatio}
        />
      </Box>
    </div>
  );
};

export default CanvasUI;
