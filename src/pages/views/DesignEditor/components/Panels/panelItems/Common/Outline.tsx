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
import {useActiveObject, useEditor} from '@/canvascore/react';

interface Options {
  enabled: boolean;
  stroke: string;
  strokeWidth: number;
}

const Outline = () => {
  const editor = useEditor();
  const activeObject = useActiveObject();

  const [options, setOptions] = React.useState<Options>({
    enabled: true,
    stroke: '#000000',
    strokeWidth: 1,
  });

  React.useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject]);

  const updateOptions = (object: any) => {
    const {stroke, strokeWidth} = object;
    setOptions({...options, stroke, strokeWidth, enabled: !!strokeWidth});
  };

  const handleChange = (type: string, value: any) => {
    setOptions({...options, [type]: value});
    if (type === 'enabled') {
      if (value) {
        editor.objects.update(options);
      } else {
        editor.objects.update({strokeWidth: 0});
      }
    } else {
      if (editor && options.enabled) {
        editor.objects.update({[type]: value});
      }
    }
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
            Outline
          </div>
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
                    backgroundColor: options.stroke,
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
                  onChange={(color) => handleChange('stroke', color)}
                />
                <Input
                  value={options.stroke}
                  onChange={(e) => handleChange('stroke', e.target.value)}
                  placeholder="#000000"
                  size="sm"
                  textAlign="center"
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div style={{height: '10px'}} />

      <div style={{padding: '0 8px'}}>
        <div>
          <div style={{fontSize: '14px'}}>Size</div>
          <Slider
            value={options.strokeWidth}
            onChange={(value) => handleChange('strokeWidth', value)}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Outline;
