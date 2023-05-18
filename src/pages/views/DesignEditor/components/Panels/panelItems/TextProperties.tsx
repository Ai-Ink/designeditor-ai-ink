import React from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react';
import {ChevronRightIcon} from '@chakra-ui/icons';
import useAppContext from '@/hooks/useAppContext';
import {useActiveObject, useEditor} from '@/canvascore/react';
import {useSelector} from 'react-redux';
import {selectFonts} from '@/store/slices/fonts/selectors';
import {getTextOptions} from '@/utils/object-options';
import {fontStyleLabels} from '@/constants/fonts';
import {loadFonts} from '@/utils/fonts';
import {defaultTextOptions} from '@/constants/contants';
import Shadow from './Common/Shadow';
import {TextOptions} from '@/interfaces/editor';
import InformationCircleOutline from '@/components/Icons/InformationCircleOutline';
import SpacingIcon from '@/components/Icons/Spacing';
import UnderlineIcon from '@/components/Icons/Underline';

const TextProperties = () => {
  const fonts = useSelector(selectFonts);
  const [state, setState] = React.useState<TextOptions>(defaultTextOptions);
  const {setActiveSubMenu} = useAppContext();
  const activeObject = useActiveObject() as any;
  const editor = useEditor();

  React.useEffect(() => {
    if (activeObject) {
      const textOptions = getTextOptions(activeObject);
      const isGroup = textOptions.isGroup;
      const active = textOptions.fontFamily.split('__')[1];
      const font = fonts.find(
        (f) =>
          f.family ===
          textOptions.fontFamily.split('__')[0].split('_').join(' '),
      );
      if (!font) {
        setState(defaultTextOptions);
        return;
      }
      const isNotGradient =
        typeof activeObject.value?.fill === 'string' ||
        activeObject.value?.fill instanceof String;
      const styles = Object.keys(font.files)
        .map((file: string) => ({
          value: file,
          label: fontStyleLabels[file].label,
          id: fontStyleLabels[file].id,
          url: font.files[file],
          family: font.family,
        }))
        .sort((a, b) => (a.id > b.id ? 1 : -1));

      setState({
        ...textOptions,
        font,
        styles,
        fontFamily: font.family,
        activeStyle: {
          label: fontStyleLabels[active].label,
          id: fontStyleLabels[active].id,
        },
        fill: isGroup
          ? '#000000'
          : isNotGradient
          ? textOptions.fill
          : '#000000',
      });
    } else {
      setState(defaultTextOptions);
    }
  }, [activeObject]);

  const handleChange = async (key: string, value: any) => {
    if (key === 'fontStyle') {
      const selected = value[0];
      const updatedFamily = `${selected.family.split(' ').join('_')}__${
        selected.value
      }`;
      const font = {
        name: updatedFamily,
        url: selected.url,
      };
      await loadFonts([font]);
      editor.objects.update({
        fontFamily: updatedFamily,
        metadata: {
          fontURL: font.url,
        },
      });
      setState({...state, activeStyle: selected});
    } else {
      editor.objects.update({
        [key]: value,
      });
      setState({...state, [key]: value});
    }
  };

  return (
    <Box>
      <Flex
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        <Box>Text properties</Box>
        <InformationCircleOutline size={24} color="black" />
      </Flex>
      <Box display="grid" gap="0.5rem">
        <Box padding="0 1.5rem">
          <InputGroup size="sm">
            <Input
              paddingRight="0px"
              onFocus={() => setActiveSubMenu('FontSelector')}
              value={state.fontFamily}
              placeholder="Controlled Input"
              autoFocus={false}
            />
            <InputRightElement
              pointerEvents="none"
              children={<ChevronRightIcon />}
            />
          </InputGroup>
        </Box>
        <Box
          padding="0 1.5rem"
          display="grid"
          gridTemplateColumns="1fr 2fr"
          gap="0.5rem"
        >
          <Input size="sm" value={24} />
          <Select
            size="sm"
            options={state.styles}
            value={[state.activeStyle]}
            placeholder="Select color"
            isClearable={false}
            onChange={(params) => {
              handleChange('fontStyle', params.value);
            }}
          />
        </Box>
      </Box>
      <Box padding="0 1.5rem">
        <Button
          size="sm"
          onClick={() => handleChange('underline', !activeObject.underline)}
          variant="tertiary"
        >
          <SpacingIcon size={6} color="black" />
        </Button>
        <Button
          size="sm"
          onClick={() => handleChange('underline', !activeObject.underline)}
          variant="tertiary"
        >
          <UnderlineIcon size={6} color="black" />
        </Button>
      </Box>
      <Box>
        <Shadow />
      </Box>
    </Box>
  );
};

export default TextProperties;
