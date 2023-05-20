/// <reference path="paper.d.ts" />

import {PaperScope, Size, Point, Layer, View} from 'paper';
import {EditorConfig} from '../types';
import {EventEmitter} from 'events';
import Editor from './editor';
import {PaperCanvas} from './common/interfaces';

class Canvas {
  private editor: Editor;
  public container: HTMLDivElement;
  public canvasContainer: HTMLDivElement;
  public canvasElement: HTMLCanvasElement;
  public canvas: PaperCanvas;
  public canvasId: string;
  private options = {
    width: 0,
    height: 0,
  };
  private config: EditorConfig;
  private eventHandler: any;

  constructor({
    id,
    config,
    editor,
  }: {
    id: string;
    config: EditorConfig;
    editor: Editor;
  }) {
    this.config = config;
    this.editor = editor;
    this.canvasId = id;
    this.initialize();
  }

  public initialize = () => {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    const scope = new PaperScope();
    scope.setup(canvas);

    this.canvas = scope.project as PaperCanvas;

    this.canvas.view.autoUpdate = true;
    this.canvas.view.on('frame', () => {
      this.editor.emit('canvas:updated');
    });

    this.eventHandler = (event: Event) => event.preventDefault();
    this.disableEvents();
  };

  public destroy = () => {
    // Clean up any necessary resources here
    this.enableEvents();
  };

  public resize({width, height}: any) {
    this.canvas.view.viewSize = new Size(width, height);
    this.canvas.view.update();

    const diffWidth = width / 2 - this.options.width / 2;
    const diffHeight = height / 2 - this.options.height / 2;

    this.options.width = width;
    this.options.height = height;

    const deltaPoint = new Point(diffWidth, diffHeight);
    this.canvas.view.center = this.canvas.view.center.add(deltaPoint);
  }

  public getBoundingClientRect() {
    const canvasEl = document.getElementById(this.canvasId);
    const position = {
      left: canvasEl?.getBoundingClientRect().left,
      top: canvasEl?.getBoundingClientRect().top,
    };
    return position;
  }

  public requestRenderAll() {
    this.canvas.view.update();
  }

  public getBackgroundColor() {
    const canvasEl = document.getElementById(this.canvasId);
    const style = getComputedStyle(canvasEl);
    return style.backgroundColor;
  }

  public setBackgroundColor(color: string) {
    const canvasEl = document.getElementById(this.canvasId);
    canvasEl.style.backgroundColor = color;
    this.canvas.view.update();
    this.editor.emit('canvas:updated');
  }

  public disableEvents() {
    const canvasEl = document.getElementById(this.canvasId);
    canvasEl.removeEventListener('wheel', this.eventHandler, false);
  }

  public enableEvents() {
    const canvasEl = document.getElementById(this.canvasId);
    canvasEl.addEventListener('wheel', this.eventHandler, {passive: false});
  }
}

export default Canvas;
