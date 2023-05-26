import {Tooltip, Switch, ButtonGroup} from '@chakra-ui/react';

import ButtonWithIcon from '@/components/Button/ButtonWithIcon';
import React from 'react';
import {code} from '@/canvas/constants';

const CanvasFooter = ({canvasRef, preview, onChangePreview, zoomRatio}) => {
  const [interactionMode, setInteractionMode] = React.useState('selection');

  React.useEffect(() => {
    const waitForCanvasRender = (canvas) => {
      setTimeout(() => {
        if (canvas) {
          attachEventListener(canvas);
          return;
        }
        waitForCanvasRender(canvasRef);
      }, 5);
    };

    const attachEventListener = (canvasRef) => {
      canvasRef.wrapperEl.addEventListener('keydown', events.keydown, false);
    };

    const detachEventListener = (canvasRef) => {
      canvasRef.wrapperEl.removeEventListener('keydown', events.keydown);
    };

    if (canvasRef) {
      waitForCanvasRender(canvasRef);
    }

    return () => {
      detachEventListener(canvasRef);
    };
  }, [canvasRef]);

  const handlers = React.useMemo(
    () => ({
      selection: () => {
        if (canvasRef.handler.interactionHandler.isDrawingMode()) {
          return;
        }
        setInteractionMode('selection');
        canvasRef.handler.interactionHandler.selection();
      },
      grab: () => {
        if (canvasRef.handler.interactionHandler.isDrawingMode()) {
          return;
        }
        setInteractionMode('grab');
        canvasRef.handler.interactionHandler.grab();
      },
    }),
    [canvasRef],
  );

  const events = React.useMemo(
    () => ({
      keydown: (e) => {
        if (canvasRef.wrapperEl !== document.activeElement) {
          return false;
        }
        if (e.code === code.KEY_Q) {
          handlers.selection();
        } else if (e.code === code.KEY_W) {
          handlers.grab();
        }
      },
    }),
    [canvasRef, handlers],
  );

  const zoomValue = React.useMemo(
    () => parseInt((zoomRatio * 100).toFixed(2), 10),
    [zoomRatio],
  );

  return (
    <>
      <div className="rde-editor-footer-toolbar-interaction">
        <ButtonGroup>
          <ButtonWithIcon
            type={interactionMode === 'selection' ? 'primary' : 'default'}
            style={{
              borderBottomLeftRadius: '8px',
              borderTopLeftRadius: '8px',
            }}
            onClick={handlers.selection}
            icon="mouse-pointer"
            tooltipTitle="Selection"
          />
          <ButtonWithIcon
            type={interactionMode === 'grab' ? 'primary' : 'default'}
            style={{
              borderBottomRightRadius: '8px',
              borderTopRightRadius: '8px',
            }}
            onClick={handlers.grab}
            tooltipTitle="Grab"
            icon="hand-rock"
          />
        </ButtonGroup>
      </div>
      <div className="rde-editor-footer-toolbar-zoom">
        <ButtonGroup>
          <ButtonWithIcon
            style={{
              borderBottomLeftRadius: '8px',
              borderTopLeftRadius: '8px',
            }}
            onClick={() => {
              canvasRef.handler.zoomHandler.zoomOut();
            }}
            icon="search-minus"
            tooltipTitle="Zoom Out"
          />
          <ButtonWithIcon
            onClick={() => {
              canvasRef.handler.zoomHandler.zoomOneToOne();
            }}
            tooltipTitle="One to One"
          >
            {`${zoomValue}%`}
          </ButtonWithIcon>
          <ButtonWithIcon
            onClick={() => {
              canvasRef.handler.zoomHandler.zoomToFit();
            }}
            tooltipTitle="Fit"
            icon="expand"
          />
          <ButtonWithIcon
            style={{
              borderBottomRightRadius: '8px',
              borderTopRightRadius: '8px',
            }}
            onClick={() => {
              canvasRef.handler.zoomHandler.zoomIn();
            }}
            icon="search-plus"
            tooltipTitle="Zoom In"
          />
        </ButtonGroup>
      </div>
      <div className="rde-editor-footer-toolbar-preview">
        <Tooltip label="Preview">
          <Switch isChecked={preview} onChange={onChangePreview} />
        </Tooltip>
      </div>
    </>
  );
};

export default CanvasFooter;
