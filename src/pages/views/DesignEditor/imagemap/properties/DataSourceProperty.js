import React from 'react';
import {
  FormLabel,
  Select,
  Switch,
  Slider,
  Grid,
  Box,
  Button,
  FormControl,
  InputNumber,
} from '@chakra-ui/react';
import ColorPicker from '../../../components/common/ColorPicker';

const DataSourceProperty = {
  render(canvasRef, form, data) {
    const {getFieldDecorator} = form;
    if (!data) {
      return null;
    }
    const type = data.animation.type || 'none';
    return (
      <Box>
        <FormControl>
          <FormLabel>Animation Type</FormLabel>
          <Select
            {...getFieldDecorator('animation.type', {initialValue: type})}
          >
            <option value="none">None</option>
            <option value="fade">Fade</option>
            <option value="bounce">Bounce</option>
            <option value="shake">Shake</option>
            <option value="scaling">Scaling</option>
            <option value="rotation">Rotation</option>
            <option value="flash">Flash</option>
          </Select>
        </FormControl>
        {type === 'none' ? null : (
          <>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl>
                <FormLabel>Auto Play</FormLabel>
                <Switch
                  {...getFieldDecorator('animation.autoplay', {
                    valuePropName: 'checked',
                    initialValue: data.animation.autoplay || false,
                  })}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Loop</FormLabel>
                <Switch
                  {...getFieldDecorator('animation.loop', {
                    valuePropName: 'checked',
                    initialValue: data.animation.loop || false,
                  })}
                  size="sm"
                />
              </FormControl>
            </Grid>
            {type !== 'shake' ? (
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl>
                  <FormLabel>Delay</FormLabel>
                  <Slider
                    {...getFieldDecorator('animation.delay', {
                      initialValue: data.animation.delay || 100,
                    })}
                    min={100}
                    max={5000}
                    step={100}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Duration</FormLabel>
                  <Slider
                    {...getFieldDecorator('animation.duration', {
                      initialValue: data.animation.duration || 1000,
                    })}
                    min={100}
                    max={5000}
                    step={100}
                  />
                </FormControl>
              </Grid>
            ) : null}
            {this.getComponentType(type, data, getFieldDecorator)}
            <FormControl>
              <FormLabel>Playback</FormLabel>
              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                <Button
                  onClick={() => {
                    canvasRef.handler.animationHandler.play(data.id);
                  }}
                >
                  Start
                </Button>
                <Button
                  onClick={() => {
                    canvasRef.handler.animationHandler.pause(data.id);
                  }}
                >
                  Pause
                </Button>
                <Button
                  onClick={() => {
                    canvasRef.handler.animationHandler.stop(data.id);
                  }}
                >
                  Stop
                </Button>
              </Grid>
            </FormControl>
          </>
        )}
      </Box>
    );
  },
  getComponentType(type, data, getFieldDecorator) {
    let component;
    if (type === 'fade') {
      component = (
        <FormControl>
          <FormLabel>Opacity</FormLabel>
          <Slider
            {...getFieldDecorator('animation.opacity', {
              initialValue: data.animation.opacity || 0,
            })}
            min={0}
            max={1}
            step={0.1}
          />
        </FormControl>
      );
    } else if (type === 'bounce') {
      component = (
        <>
          <FormControl>
            <FormLabel>Bounce Type</FormLabel>
            <Select
              {...getFieldDecorator('animation.bounce', {
                initialValue: data.animation.bounce || 'hotizontal',
              })}
            >
              <option value="hotizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Offset</FormLabel>
            <Slider
              {...getFieldDecorator('animation.offset', {
                initialValue: data.animation.offset || 1,
              })}
              min={1}
              max={10}
              step={1}
            />
          </FormControl>
        </>
      );
    } else if (type === 'shake') {
      component = (
        <>
          <FormControl>
            <FormLabel>Shake Type</FormLabel>
            <Select
              {...getFieldDecorator('animation.shake', {
                initialValue: data.animation.shake || 'hotizontal',
              })}
            >
              <option value="hotizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Offset</FormLabel>
            <Slider
              {...getFieldDecorator('animation.offset', {
                initialValue: data.animation.offset || 1,
              })}
              min={1}
              max={10}
              step={1}
            />
          </FormControl>
        </>
      );
    } else if (type === 'scaling') {
      component = (
        <FormControl>
          <FormLabel>Scaling</FormLabel>
          <Slider
            {...getFieldDecorator('animation.scale', {
              initialValue: data.animation.scale || 1,
            })}
            min={1}
            max={5}
            step={0.1}
          />
        </FormControl>
      );
    } else if (type === 'rotation') {
      component = (
        <FormControl>
          <FormLabel>Angle</FormLabel>
          <Slider
            {...getFieldDecorator('animation.angle', {
              initialValue: data.animation.angle || data.angle,
            })}
            min={0}
            max={360}
          />
        </FormControl>
      );
    } else if (type === 'flash') {
      component = (
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <FormControl>
            <FormLabel>Fill Color</FormLabel>
            <ColorPicker
              {...getFieldDecorator('animation.fill', {
                initialValue: data.animation.fill || data.fill,
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Stroke Color</FormLabel>
            <ColorPicker
              {...getFieldDecorator('animation.stroke', {
                initialValue: data.animation.stroke || data.stroke,
              })}
            />
          </FormControl>
        </Grid>
      );
    } else {
      component = (
        <Grid templateColumns="repeat(1, 1fr)" gap={4}>
          <FormControl>
            <FormLabel>Value</FormLabel>
            <InputNumber
              {...getFieldDecorator('animation.value', {
                initialValue: data.animation.value || 1,
              })}
              min={1}
              max={10}
            />
          </FormControl>
        </Grid>
      );
    }
    return component;
  },
};

export default DataSourceProperty;
