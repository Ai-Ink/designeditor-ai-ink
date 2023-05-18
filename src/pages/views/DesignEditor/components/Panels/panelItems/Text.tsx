import React from 'react';
import {Button, Flex} from '@chakra-ui/react';
import {useEditor} from '@layerhub-io/react';
import {FontItem} from '~/interfaces/common';
import {loadFonts} from '~/utils/fonts';
import {ILayer} from '@layerhub-io/types';
import {nanoid} from 'nanoid';
import {Box, Image} from '@chakra-ui/react';
import AngleDoubleLeft from '~/components/Icons/AngleDoubleLeft';
import Scrollable from '~/components/Scrollable';
import useSetIsSidebarOpen from '~/hooks/useSetIsSidebarOpen';
import {useSelector} from 'react-redux';
import {selectPublicComponents} from '~/store/slices/components/selectors';
import api from '~/services/api';
import {IComponent} from '~/interfaces/DesignEditor';

const textOptions = {
  id: nanoid(),
  type: 'StaticText',
  width: 420,
  text: 'Add some text',
  fontSize: 92,
  fontFamily: 'OpenSans-Regular',
  textAlign: 'center',
  fontStyle: 'normal',
  fontURL:
    'https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf',
  fill: '#333333',
  metadata: {},
};

export default function () {
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const components = useSelector(selectPublicComponents);

  const addObject = async () => {
    if (editor) {
      const font: FontItem = {
        name: 'OpenSans-Regular',
        url: 'https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf',
      };
      await loadFonts([font]);
      const options = {
        id: nanoid(),
        type: 'StaticText',
        width: 420,
        text: 'Add some text',
        fontSize: 92,
        fontFamily: font.name,
        textAlign: 'center',
        fontStyle: 'normal',
        fontURL: font.url,
        fill: '#333333',
        metadata: {},
      };
      editor.objects.add(options);
    }
  };
  const addComponent = async (component: any) => {
    if (editor) {
      const fontItemsList: FontItem[] = [];
      if (component.objects) {
        component.objects.forEach((object: any) => {
          if (object.type === 'StaticText' || object.type === 'DynamicText') {
            fontItemsList.push({
              name: object.fontFamily,
              url: object.fontURL,
            });
          }
        });
        const filteredFonts = fontItemsList.filter((f) => !!f.url);
        await loadFonts(filteredFonts);
      } else {
        if (
          component.type === 'StaticText' ||
          component.type === 'DynamicText'
        ) {
          fontItemsList.push({
            name: component.fontFamily,
            url: component.fontURL,
          });
          await loadFonts(fontItemsList);
        }
      }
      editor.objects.add(component);
    }
  };

  const makeAddComponent = async (id: string) => {
    if (editor) {
      const component = await api.getComponentById(id);
      const fontItemsList: FontItem[] = [];
      const object: any = component.layers[0] as ILayer;
      if (object.type === 'Group') {
        object.objects.forEach((object: any) => {
          if (object.type === 'StaticText' || object.type === 'DynamicText') {
            fontItemsList.push({
              name: object.fontFamily,
              url: object.fontURL,
            });
          }
        });
        const filteredFonts = fontItemsList.filter((f) => !!f.url);
        await loadFonts(filteredFonts);
      } else {
        if (object.type === 'StaticText') {
          fontItemsList.push({
            name: object.fontFamily,
            url: object.fontURL,
          });
          await loadFonts(fontItemsList);
        }
      }

      editor.objects.add(object);
    }
  };

  const loadComponentFonts = async (component: any) => {
    if (editor) {
      const fontItemsList: FontItem[] = [];
      if (component.objects) {
        component.objects.forEach((object: any) => {
          if (object.type === 'StaticText' || object.type === 'DynamicText') {
            fontItemsList.push({
              name: object.fontFamily,
              url: object.fontURL,
            });
          }
        });
        const filteredFonts = fontItemsList.filter((f) => !!f.url);
        await loadFonts(filteredFonts);
      } else {
        if (
          component.type === 'StaticText' ||
          component.type === 'DynamicText'
        ) {
          fontItemsList.push({
            name: component.fontFamily,
            url: component.fontURL,
          });
          await loadFonts(fontItemsList);
        }
      }
    }
  };

  const onDragStart = React.useCallback(
    async (ev: React.DragEvent<HTMLDivElement>, item: any) => {
      let img = new Image();
      img.src = item.preview;
      ev.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
      // editor.dragger.onDragStart(item)
    },
    [],
  );

  return (
    <Flex flex={1} flexDirection="column">
      <Flex
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        Text
        <Flex onClick={() => setIsSidebarOpen(false)} cursor="pointer">
          <AngleDoubleLeft size={18} />
        </Flex>
      </Flex>
      <Scrollable>
        <Flex padding="0 1.5rem">
          <Button onClick={addObject} size="sm" width="100%">
            Add text
          </Button>
          <Flex
            paddingTop="0.5rem"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="8px"
          >
            {components?.map((component) => (
              <TextComponentItem
                onDragStart={(ev: React.DragEvent<HTMLDivElement>) =>
                  onDragStart(ev, component)
                }
                onClick={makeAddComponent}
                key={component.id}
                component={component}
              />
            ))}
          </Flex>
        </Flex>
      </Scrollable>
    </Flex>
  );
}

function TextComponentItem({
  component,
  onClick,
  onDragStart,
}: {
  component: IComponent;
  onDragStart: (ev: React.DragEvent<HTMLDivElement>) => void;
  onClick: (option: any) => void;
}) {
  return (
    <Box
      onClick={() => onClick(component.id)}
      onDragStart={onDragStart}
      pos="relative"
      height="84px"
      bg="#f8f8fb"
      cursor="pointer"
      padding="12px"
      borderRadius="8px"
      overflow="hidden"
      _before={{
        _hover: {
          opacity: 1,
        },
      }}
      userSelect="all"
    >
      <Image
        src={component.preview}
        w="100%"
        h="100%"
        objectFit="contain"
        pointerEvents="none"
        verticalAlign="middle"
      />
    </Box>
  );
}
