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
  enabled: boolean;
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
}

const Shadow = () => {
  const editor = useEditor();
  const [options, setOptions] = React.useState<Options>({
    enabled: false,
    offsetX: 15,
    offsetY: 15,
    blur: 25,
    color: 'rgba(0,0,0,0.45)',
  });

  const activeObject = useActiveObject();

  React.useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject]);

  const updateOptions = (object: any) => {
    if (object.shadow) {
      const {blur, color, enabled, offsetX, offsetY} = object.shadow;
      setOptions({...options, blur, color, enabled, offsetX, offsetY});
    }
  };

  const handleChange = (key: string, value: any) => {
    setOptions({...options, [key]: value});
    if (editor) {
      console.log({...options, [key]: value});
      editor.objects.setShadow({...options, [key]: value});
    }
  };

  return (
    <div style={{padding: '0 1.5rem'}}>
      <div
        style={{
          margin: '1rem 0 0.5rem',
          fontSize: '14px',
          background: 'rgba(0,0,0,0.05)',
          padding: '10px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>
          <Checkbox
            isChecked={options.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
          >
            Shadow
          </Checkbox>
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
                  backgroundColor: options.color,
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
                onChange={(color) => handleChange('color', color)}
              />
              <Input
                value={options.color}
                onChange={(e) => handleChange('color', e.target.value)}
                placeholder="#000000"
                size="sm"
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>

      <div style={{height: '10px'}} />

      <div style={{padding: '0 8px'}}>
        <div>
          <div style={{fontSize: '14px'}}>Blur</div>
          <Slider
            value={options.blur}
            onChange={(value) => handleChange('blur', value)}
            size="sm"
          />
        </div>
      </div>

      <div>
        <div style={{height: '10px'}} />
        <div style={{padding: '0 8px'}}>
          <div style={{fontSize: '14px'}}>Offset Y</div>
          <Slider
            value={options.offsetY}
            onChange={(value) => handleChange('offsetY', value)}
            size="sm"
          />
        </div>
        <div style={{padding: '0 8px'}}>
          <div>
            <div style={{fontSize: '14px'}}>Offset X</div>
            <Slider
              value={options.offsetX}
              onChange={(value) => handleChange('offsetX', value)}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shadow;
