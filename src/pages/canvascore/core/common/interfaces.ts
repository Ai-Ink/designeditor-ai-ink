import {PaperScope, Size, Point, Rectangle} from 'paper';
import Editor from '../editor';
import {EditorConfig} from '@/canvascore/types';
import Canvas from '../canvas';

export type Direction = 'top' | 'left';
export type ScaleType = 'fit' | 'fill';

export interface PaperWheelEvent {
  event: WheelEvent;
  target?: any;
  subTargets?: any[];
  button?: number;
  isClick?: boolean;
  point?: paper.Point;
  delta?: paper.Point;
  rotation?: number;
  scaling?: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface ControllerOptions {
  editorCanvas: Canvas;
  canvas: PaperCanvas;
  config: EditorConfig;
  editor: Editor;
  state: EditorState;
}

export interface CanvasOptions {
  width: number;
  height: number;
}

export type PaperCanvas<T extends any = paper.Project> = T & {
  wrapperEl: HTMLElement;
};

// Template

export interface Template {
  id: string;
  name: string;
  preview: string;
  background: any;
  frame: {
    width: number;
    height: number;
  };
  objects: any[];
  metadata: {
    animated: boolean;
  };
}

export interface GradientOptions {
  angle: number;
  stops: string[];
}

export interface ShadowOptions {
  enabled: boolean;
  blur: number;
  offset: paper.Point;
  color: paper.Color;
}

export interface EditorState {
  frame: any;
  activeObject: any;
  objects: any[];
  zoomRatio: number;
  contextMenuRequest: any;
  editor: Editor | null;
  setFrame: (o: any) => void;
  setActiveObject: (o: any) => void;
  setObjects: (o: any) => void;
  setZoomRatio: (o: any) => void;
  setContextMenuRequest: (o: any) => void;
  setEditor: (o: any) => void;
}
