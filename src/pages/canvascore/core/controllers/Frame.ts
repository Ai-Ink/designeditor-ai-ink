import {ILayer} from '../../types';
import {fabric} from 'fabric';
import {
  defaultFrameOptions,
  LayerType,
  defaultBackgroundOptions,
} from '../common/constants';
import {
  ControllerOptions,
  Dimension,
  GradientOptions,
} from '../common/interfaces';
import setObjectGradient from '../utils/fabric';
import Base from './Base';
import paper from 'paper';

class Frame extends Base {
  frame: paper.Path.Rectangle | null;
  background: paper.Path.Rectangle | null;
  frameLayer: paper.Layer;
  backgroundLayer: paper.Layer;

  constructor(props: ControllerOptions) {
    super(props);
    this.frame = null;
    this.background = null;
    this.frameLayer = new paper.Layer();
    this.backgroundLayer = new paper.Layer();
    this.initialize();
  }

  initialize() {
    var canvasBoundingRect =
      this.editorCanvas.canvasContainer.getBoundingClientRect();
    console.log(canvasBoundingRect);
    const background = new paper.Path.Rectangle({
      point: [canvasBoundingRect.x, canvasBoundingRect.y], // Top-left corner position
      size: [canvasBoundingRect.width, canvasBoundingRect.height], // Width and height of the rectangle
      fillColor: '#D3D3D3', // Fill color
    });
    background.data.type = LayerType.BACKGROUND;
    background.data.shadow = this.config.shadow;
    this.backgroundLayer.addChild(background);

    this.backgroundLayer.sendToBack();

    // const frame = new paper.Path.Rectangle(defaultFrameOptions);
    const frame = new paper.Path.Rectangle({
      point: [canvasBoundingRect.x, canvasBoundingRect.y], // Top-left corner position
      size: [canvasBoundingRect.width / 2, canvasBoundingRect.height / 2], // Width and height of the rectangle
      fillColor: 'black', // Fill color
    });
    frame.data.type = LayerType.FRAME;
    frame.data.absolutePositioned = this.config.clipToFrame;
    this.frameLayer.addChild(frame);

    this.frame = frame;
    this.background = background;
    this.frame.parent = this.background;

    this.canvas.addLayer(this.backgroundLayer);
    this.canvas.addLayer(this.frameLayer);

    this.backgroundLayer.visible = true;
    this.frameLayer.activate();
    this.frameLayer.bringToFront();

    this.editorCanvas.setFrameLayer(this.frameLayer);

    this.centerElement(frame);

    this.state.setFrame({
      height: defaultFrameOptions.height,
      width: defaultFrameOptions.width,
    });

    setTimeout(() => {
      this.editor.zoom.zoomToFit();
      // this.editor.history.initialize();
    }, 50);
  }

  private getFrame() {
    return this.canvas.getItems({
      type: LayerType.FRAME,
    })[0];
  }

  private getBackground() {
    return this.canvas.getItems({
      type: LayerType.BACKGROUND,
    })[0];
  }

  private getOptions() {
    const options = this.getFrame().exportJSON(this.config.propertiesToInclude);
    return options;
  }

  public resize({height, width}: Dimension) {
    this.state.setFrame({
      height,
      width,
    });
    const frame = this.frame;
    const background = this.background;
    frame.set({width, height});
    this.centerElement(frame);
    if (background) {
      background.set({width, height});
      // this.centerElement(background);
    }
    this.editor.zoom.zoomToFit();
  }

  // setHoverCursor(cursor: string) {
  //   const background = this.background;
  //   if (background) {
  //     background.item.element.style.cursor = cursor;
  //   }
  // }

  public setBackgroundColor = (color: string) => {
    const background = this.background;
    if (background) {
      background.fillColor = new paper.Color(color);
      this.canvas.view.update();
      // this.editor.history.save();
    }
  };

  get fitRatio() {
    // const options = this.getOptions();
    // const canvasWidth = this.canvas.view.bounds.width - this.config.frameMargin;
    // const canvasHeight =
    //   this.canvas.view.bounds.height - this.config.frameMargin;
    // let scaleX = canvasWidth / options.width;
    // let scaleY = canvasHeight / options.height;
    // if (options.height >= options.width) {
    //   scaleX = scaleY;
    //   if (canvasWidth < options.width * scaleX) {
    //     scaleX = scaleX * (canvasWidth / (options.width * scaleX));
    //   }
    // } else {
    //   if (canvasHeight < options.height * scaleX) {
    //     scaleX = scaleX * (canvasHeight / (options.height * scaleX));
    //   }
    // }
    var scaleX = 1.0;
    return scaleX;
  }

  private centerElement(element: paper.Item) {
    console.log(element);
    const parentBounds = element.parent.bounds; // Get the bounds of the parent
    const centerX = parentBounds.x + parentBounds.width / 2; // Calculate the center X position
    const centerY = parentBounds.y + parentBounds.height / 2; // Calculate the center Y position

    element.position = new paper.Point(centerX, centerY); // Set the position to the center
    // element.position = new paper.Point(1500, 800);
    console.log(element.position);
    this.canvas.view.update();
  }
}
export default Frame;
