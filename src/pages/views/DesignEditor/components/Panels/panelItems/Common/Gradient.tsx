import React from 'react';
import {Checkbox} from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react';
import {HexColorPicker} from 'react-colorful';
import {Slider} from '@chakra-ui/react';
import {Input} from '@chakra-ui/react';
import {useActiveObject, useEditor} from '@layerhub-io/react';

interface Options {
  angle: number;
  colors: string[];
  enabled: boolean;
}

const Gradient = () => {
  const editor = useEditor();
  const activeObject = useActiveObject();

  const [options, setOptions] = React.useState<Options>({
    angle: 0,
    colors: ['#24C6DC', '#514A9D'],
    enabled: false,
  });

  const handleChange = (key: string, value: any) => {
    setOptions({...options, [key]: value});

    if (key === 'enabled') {
      if (value) {
        editor.objects.setGradient({...options, [key]: value});
      } else {
        editor.objects.update({
          fill: '#000000',
        });
      }
    } else {
      if (options.enabled) {
        editor.objects.setGradient({...options, [key]: value});
      }
    }
  };

  const initialOptions = {
    angle: 0,
    colors: ['#24C6DC', '#514A9D'],
    enabled: false,
  };

  const getGradientOptions = (object: any) => {
    const isNotGradient =
      typeof object?.fill === 'string' || object?.fill instanceof String;
    if (!isNotGradient) {
      const colorStops = object.fill.colorStops;
      const colors = [colorStops[0].color, colorStops[1].color];
      return {
        angle: 0,
        colors: colors,
        enabled: true,
      };
    } else {
      return initialOptions;
    }
  };

  React.useEffect(() => {
    if (activeObject) {
      const initialOptions = getGradientOptions(activeObject);
      setOptions({...options, ...initialOptions});
    }
  }, [activeObject]);

  const handleGradientColorChange = (index: number, color: string) => {
    const updatedColors = [...options.colors];
    updatedColors[index] = color;
    handleChange('colors', updatedColors);
  };

  return (
    <div style={{padding: '2rem 2rem 0'}}>
      <div>
        <div
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            background: 'rgba(0,0,0,0.05)',
            padding: '10px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Checkbox
              isChecked={options.enabled}
              onChange={(e) => handleChange('enabled', e.target.checked)}
            />
            Gradient
          </div>
          <div>
            <div
              style={{
                height: '28px',
                width: '28px',
                backgroundSize: '100% 100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: `linear-gradient(${options.angle + 90}deg, ${
                  options.colors[0]
                }, ${options.colors[1]})`,
              }}
            />
          </div>
        </div>
      </div>
      <div style={{height: '10px'}} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
        }}
      >
        <div style={{fontSize: '14px'}}>Colors</div>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <Popover>
            <PopoverTrigger>
              <div>
                <div
                  style={{
                    height: '28px',
                    width: '28px',
                    backgroundSize: '100% 100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: options.colors[0],
                  }}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody
                style={{
                  padding: '1rem',
                  background: '#ffffff',
                  width: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  textAlign: 'center',
                }}
              >
                <HexColorPicker
                  onChange={(color) => handleGradientColorChange(0, color)}
                />
                <Input
                  style={{textAlign: 'center'}}
                  value={options.colors[0]}
                  onChange={(e) => handleGradientColorChange(0, e.target.value)}
                  placeholder="#000000"
                  clearOnEscape
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <div>
                <div
                  style={{
                    height: '28px',
                    width: '28px',
                    backgroundSize: '100% 100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: options.colors[1],
                  }}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody
                style={{
                  padding: '1rem',
                  background: '#ffffff',
                  width: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  textAlign: 'center',
                }}
              >
                <HexColorPicker
                  onChange={(color) => handleGradientColorChange(1, color)}
                />
                <Input
                  style={{textAlign: 'center'}}
                  value={options.colors[1]}
                  onChange={(e) => handleGradientColorChange(1, e.target.value)}
                  placeholder="#000000"
                  clearOnEscape
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div style={{height: '10px'}} />

      <div style={{padding: '0 8px'}}>
        <div>
          <div style={{fontSize: '14px'}}>Direction</div>
          <Slider
            size="sm"
            max={360}
            value={options.angle}
            onChange={(value) => handleChange('angle', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Gradient;
