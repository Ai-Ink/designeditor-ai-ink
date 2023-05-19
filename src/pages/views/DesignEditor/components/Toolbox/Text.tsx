import React, {useState, useEffect, useCallback} from 'react';
import {useActiveObject, useEditor} from '@/canvascore/react';
import {Input} from '@chakra-ui/input';
import {ChevronDownIcon} from '@chakra-ui/icons';
import Common from './Common';
import TextColor from '@/components/Icons/TextColor';
import Bold from '@/components/Icons/Bold';
import Italic from '@/components/Icons/Italic';
import Underline from '@/components/Icons/Underline';
import TextAlignCenter from '@/components/Icons/TextAlignCenter';
import {
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  Flex,
  Tooltip,
} from '@chakra-ui/react';
import LetterCase from '@/components/Icons/LetterCase';
import Spacing from '@/components/Icons/Spacing';
import TextAlignJustify from '@/components/Icons/TextAlignJustify';
import TextAlignLeft from '@/components/Icons/TextAlignLeft';
import TextAlignRight from '@/components/Icons/TextAlignRight';
import useAppContext from '@/hooks/useAppContext';
import {FONT_SIZES} from '@/constants/editor';
import {IStaticText} from '@/canvascore/types';
import {getTextProperties} from '@/views/DesignEditor/utils/text';
import {loadFonts} from '@/utils/fonts';
import Scrollbar from '@layerhub-io/react-custom-scrollbar';
import {useSelector} from 'react-redux';
import {selectAllFonts} from '@/store/slices/fonts/selectors';
import {FontItem} from '@/interfaces/common';

const TEXT_ALIGNS = ['left', 'center', 'right', 'justify'];

// Interesting Text Editor example
// https://codesandbox.io/s/chakra-slate-js-forked-44zi55?file=/src/components/components.tsx

interface TextState {
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  family: string;
  styleOptions: StyleOptions;
}

interface StyleOptions {
  hasItalic: boolean;
  hasBold: boolean;
  options: any[];
}

const initialOptions: TextState = {
  family: 'CoreLang',
  bold: false,
  italic: false,
  underline: false,
  color: '#00000',
  styleOptions: {
    hasBold: true,
    hasItalic: true,
    options: [],
  },
};

export default function TextEditor() {
  const [state, setState] = useState(initialOptions);
  const activeObject = useActiveObject();
  const {setActiveSubMenu} = useAppContext();
  const editor = useEditor();
  const fonts = useSelector(selectAllFonts);

  useEffect(() => {
    // @ts-ignore
    if (activeObject && activeObject.type === 'StaticText') {
      // @ts-ignore
      const textProperties = getTextProperties(activeObject, fonts);
      setState({...state, ...textProperties});
    }
  }, [activeObject]);

  useEffect(() => {
    const watcher = async () => {
      // @ts-ignore
      if (activeObject && activeObject.type === 'StaticText') {
        // @ts-ignore
        const textProperties = getTextProperties(activeObject, fonts);
        setState({...state, ...textProperties});
      }
    };
    if (editor) {
      editor.on('history:changed', watcher);
    }
    return () => {
      if (editor) {
        editor.off('history:changed', watcher);
      }
    };
  }, [editor, activeObject]);

  const makeBold = useCallback(async () => {
    if (state.bold) {
      let desiredFont;
      if (state.italic) {
        // look for regular italic
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Italic$/);
        });
      } else {
        // look for  regular
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Regular$/);
        });
      }
      const font: FontItem = {
        fontFamily: desiredFont.post_script_name,
        fontURL: desiredFont.url,
      };
      await loadFonts([font]);
      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.fontURL,
      });
      setState({...state, bold: false});
    } else {
      let desiredFont;
      if (state.italic) {
        // look for bold italic
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(
            /^BoldItalic$/,
          );
        });
      } else {
        // look for bold
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Bold$/);
        });
      }
      const font: FontItem = {
        fontFamily: desiredFont.post_script_name,
        fontURL: desiredFont.url,
      };
      await loadFonts([font]);
      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.fontURL,
      });
      setState({...state, bold: true});
    }
  }, [editor, state]);

  const makeItalic = useCallback(async () => {
    if (state.italic) {
      let desiredFont;
      if (state.bold) {
        // Search bold regular
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Bold$/);
        });
      } else {
        // Search regular
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Regular$/);
        });
      }
      const font: FontItem = {
        fontFamily: desiredFont.post_script_name,
        fontURL: desiredFont.url,
      };
      await loadFonts([font]);
      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.fontURL,
      });
      setState({...state, italic: false});
    } else {
      let desiredFont;
      if (state.bold) {
        // search italic bold
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(
            /^BoldItalic$/,
          );
        });
      } else {
        // search regular italic
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split('-');
          return postScriptNames[postScriptNames.length - 1].match(/^Italic$/);
        });
      }
      const font: FontItem = {
        fontFamily: desiredFont.post_script_name,
        fontURL: desiredFont.url,
      };
      await loadFonts([font]);
      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.fontURL,
      });
      setState({...state, italic: true});
    }
  }, [editor, state]);

  const makeUnderline = useCallback(() => {
    editor.objects.update({
      underline: !state.underline,
    });
    setState({...state, underline: !state.underline});
  }, [editor, state]);

  return (
    <Flex
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        justifyContent: 'space-between',
      }}
    >
      <Flex display="flex" gridGap="0.5rem" alignItems="center">
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              border="1px solid rgb(185,185,185)"
              borderRadius="4px"
              padding="0.2rem 0.45rem"
              cursor="pointer"
              fontWeight={500}
              fontSize="14px"
              gap="0.5rem"
              height="24px"
              display="flex"
              alignItems="center"
              variant="ghost"
              onClick={() => setActiveSubMenu('FontSelector')}
            >
              {state.family}
              <Box display="flex">
                <ChevronDownIcon boxSize={22} />
              </Box>
            </Button>
          </PopoverTrigger>
        </Popover>

        <TextFontSize />
        <Flex alignItems="center" display="flex" gridGap="1rem">
          <Tooltip label="Text color" placement="bottom" hasArrow>
            <Button
              onClick={() => setActiveSubMenu('TextFill')}
              size="mini"
              variant="ghost"
            >
              <TextColor size={20} color="black" />
            </Button>
          </Tooltip>

          <Tooltip label="Bold" placement="bottom" hasArrow>
            <Button
              style={{...(state.bold ? {} : {color: 'rgb(169,169,169)'})}}
              disabled={!state.styleOptions.hasBold}
              onClick={makeBold}
              size="mini"
              variant="ghost"
            >
              <Bold size={22} color="black" />
            </Button>
          </Tooltip>

          <Tooltip label="Italic" placement="bottom" hasArrow>
            <Button
              style={{...(state.italic ? {} : {color: 'rgb(169,169,169)'})}}
              disabled={!state.styleOptions.hasItalic}
              onClick={makeItalic}
              size="mini"
              variant="ghost"
            >
              <Italic size={22} color="black" />
            </Button>
          </Tooltip>

          <Tooltip label="Underline" placement="bottom" hasArrow>
            <Button
              style={{
                ...(state.underline ? {} : {color: 'rgb(169,169,169)'}),
              }}
              onClick={makeUnderline}
              size="mini"
              variant="ghost"
            >
              <Underline size={22} color="black" />
            </Button>
          </Tooltip>

          <TextLetterCase />

          <Box
            width="1px"
            height="24px"
            backgroundColor="rgb(213,213,213)"
            margin="0 4px"
          />

          <TextAlign />

          <Box
            width="1px"
            height="24px"
            backgroundColor="rgb(213,213,213)"
            margin="0 4px"
          />

          <TextSpacing />

          <Box
            width="1px"
            height="24px"
            backgroundColor="rgb(213,213,213)"
            margin="0 4px"
          />

          <Button
            onClick={() => setActiveSubMenu('TextEffects')}
            size="md"
            colorScheme="blackButtonBg"
            variant="solid"
            bg="custom.blackButtonBg"
            color="custom.blackButtonText"
          >
            Effects
          </Button>

          <Box
            width="1px"
            height="24px"
            backgroundColor="rgb(213,213,213)"
            margin="0 4px"
          />

          <Button
            onClick={() => setActiveSubMenu('TextFill')}
            size="md"
            colorScheme="blackButtonBg"
            variant="solid"
            bg="custom.blackButtonBg"
            color="custom.blackButtonText"
          >
            TextFill
          </Button>
        </Flex>
      </Flex>
      <Common />
    </Flex>
  );
}

export function TextFontSize() {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [value, setValue] = useState(12);

  useEffect(() => {
    // @ts-ignore
    if (activeObject && activeObject.type === 'StaticText') {
      // @ts-ignore
      setValue(activeObject.fontSize);
    }
  }, [activeObject]);

  const onChange = (size) => {
    editor.objects.update({fontSize: size});
    setValue(size);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          width="60px"
          size="mini"
          variant="outline"
          // @ts-ignore
          rightIcon={<ChevronDownIcon boxSize={22} />}
        >
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody p="0">
          <div style={{height: '320px', width: '90px', overflowY: 'auto'}}>
            {FONT_SIZES.map((size, index) => (
              <div
                key={index}
                onClick={() => onChange(size)}
                style={{
                  height: '32px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  // @ts-ignore
                  _hover: {background: 'rgb(243, 243, 243)'},
                }}
              >
                {size}
              </div>
            ))}
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function TextLetterCase() {
  const [state, setState] = useState({upper: false});
  const editor = useEditor();

  const handleClick = () => {
    if (!state.upper) {
      setState({upper: true});
      editor.objects.toUppercase();
    } else {
      setState({upper: false});
      editor.objects.toLowerCase();
    }
  };

  return (
    <Tooltip label="Letter case" placement="bottom" hasArrow>
      <Button size="mini" variant="ghost" onClick={handleClick}>
        <LetterCase size={24} color="black" />
      </Button>
    </Tooltip>
  );
}

export function TextSpacing() {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [state, setState] = useState({charSpacing: 0, lineHeight: 0});

  useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      const {charSpacing, lineHeight} = activeObject;
      setState({
        charSpacing: charSpacing / 10,
        lineHeight: lineHeight * 10,
      });
    }
  }, [activeObject]);

  const handleChange = (type, value) => {
    if (editor) {
      if (type === 'charSpacing') {
        setState({...state, [type]: value[0]});
        editor.objects.update({
          [type]: value[0] * 10,
        });
      } else {
        setState({...state, [type]: value[0]});
        editor.objects.update({
          [type]: value[0] / 10,
        });
      }
    }
  };

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Tooltip label="Spacing" placement="bottom" hasArrow>
          <Button size="mini" variant="ghost">
            <Spacing size={24} color="black" />
          </Button>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody
          display="grid"
          gridGap="8px"
          padding="12px"
          width="200px"
          backgroundColor="#ffffff"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{fontSize: '14px'}}>Line height</div>
            <div style={{width: '52px'}}>
              <Input
                size="mini"
                value={Math.round(state.lineHeight)}
                onChange={() => {}}
                style={{
                  backgroundColor: '#ffffff',
                  textAlign: 'center',
                  borderBottomColor: 'rgba(0,0,0,0.15)',
                  borderTopColor: 'rgba(0,0,0,0.15)',
                  borderRightColor: 'rgba(0,0,0,0.15)',
                  borderLeftColor: 'rgba(0,0,0,0.15)',
                  borderTopWidth: '1px',
                  borderBottomWidth: '1px',
                  borderRightWidth: '1px',
                  borderLeftWidth: '1px',
                  height: '26px',
                }}
              />
            </div>
          </div>

          <Slider
            min={0}
            max={100}
            value={state.lineHeight}
            onChange={(value) => handleChange('lineHeight', value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{fontSize: '14px'}}>Char spacing</div>
            <div style={{width: '52px'}}>
              <Input
                size="mini"
                value={Math.round(state.charSpacing)}
                onChange={() => {}}
                style={{
                  backgroundColor: '#ffffff',
                  textAlign: 'center',
                  borderBottomColor: 'rgba(0,0,0,0.15)',
                  borderTopColor: 'rgba(0,0,0,0.15)',
                  borderRightColor: 'rgba(0,0,0,0.15)',
                  borderLeftColor: 'rgba(0,0,0,0.15)',
                  borderTopWidth: '1px',
                  borderBottomWidth: '1px',
                  borderRightWidth: '1px',
                  borderLeftWidth: '1px',
                  height: '26px',
                }}
              />
            </div>
          </div>
          <Slider
            min={-20}
            max={100}
            aria-label="slider-ex-1"
            value={state.charSpacing}
            onChange={(value) => handleChange('charSpacing', value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function TextAlign() {
  const editor = useEditor();
  const activeObject = useActiveObject();
  const [state, setState] = useState({align: 'left'});

  useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({align: activeObject.textAlign});
    }
  }, [activeObject]);

  const handleAlignChange = (align) => {
    if (editor) {
      editor.objects.update({textAlign: align});
      setState({align});
    }
  };

  return (
    <Popover placement="bottom" returnFocusOnClose autoFocus>
      <PopoverTrigger>
        <Tooltip label="Align" placement="bottom" hasArrow>
          <Button size="mini">
            <TextAlignCenter size={24} color="black" />
          </Button>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          gridGap="8px"
        >
          <Button
            onClick={() => handleAlignChange(TEXT_ALIGNS[0])}
            colorScheme={state.align === TEXT_ALIGNS[0] ? 'blue' : 'gray'}
            size="mini"
            variant="ghost"
          >
            <TextAlignLeft size={24} color="black" />
          </Button>
          <Button
            onClick={() => handleAlignChange(TEXT_ALIGNS[1])}
            colorScheme={state.align === TEXT_ALIGNS[1] ? 'blue' : 'gray'}
            size="mini"
            variant="ghost"
          >
            <TextAlignCenter size={24} color="black" />
          </Button>
          <Button
            onClick={() => handleAlignChange(TEXT_ALIGNS[2])}
            colorScheme={state.align === TEXT_ALIGNS[2] ? 'blue' : 'gray'}
            size="mini"
            variant="ghost"
          >
            <TextAlignRight size={24} color="black" />
          </Button>
          <Button
            onClick={() => handleAlignChange(TEXT_ALIGNS[3])}
            colorScheme={state.align === TEXT_ALIGNS[3] ? 'blue' : 'gray'}
            size="mini"
            variant="ghost"
          >
            <TextAlignJustify size={24} color="black" />
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
