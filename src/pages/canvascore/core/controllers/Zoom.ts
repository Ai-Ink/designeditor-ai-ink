import {fabric} from 'fabric';
import Base from './Base';

class Zoom extends Base {
  zoomIn() {
    const zoomFactor = 1.1;
    this.zoom(zoomFactor);
  }

  zoomOut() {
    const zoomFactor = 0.9;
    this.zoom(zoomFactor);
  }

  zoomToOne() {
    this.setZoom(1);
  }

  zoomToFit() {
    const zoomFitRatio = this.editor.frame.fitRatio;
    this.setZoom(zoomFitRatio);
  }

  zoomToRatio(zoomRatio) {
    this.setZoom(zoomRatio);
  }

  zoomToPoint(point, zoom) {
    const minZoom = 10;
    const maxZoom = 300;
    let zoomRatio = zoom;
    if (zoom <= minZoom / 100) {
      zoomRatio = minZoom / 100;
    } else if (zoom >= maxZoom / 100) {
      zoomRatio = maxZoom / 100;
    }

    const center = this.canvas.view.center;
    const offset = center.subtract(point);
    const scaledOffset = offset.multiply(zoomRatio);
    const newPosition = center.add(scaledOffset);

    this.canvas.view.zoom = zoomRatio;
    this.canvas.view.center = newPosition;
    this.editor.state.setZoomRatio(zoomRatio);
  }

  setZoom(zoom) {
    const minZoom = 10;
    const maxZoom = 300;
    let zoomRatio = zoom;
    if (zoom <= minZoom / 100) {
      zoomRatio = minZoom / 100;
    } else if (zoom >= maxZoom / 100) {
      zoomRatio = maxZoom / 100;
    }

    this.canvas.view.zoom = zoomRatio;
    this.editor.state.setZoomRatio(zoomRatio);
  }

  zoom(zoomFactor) {
    const currentZoom = this.canvas.view.zoom;
    const newZoom = currentZoom * zoomFactor;
    this.setZoom(newZoom);
  }
}

export default Zoom;
