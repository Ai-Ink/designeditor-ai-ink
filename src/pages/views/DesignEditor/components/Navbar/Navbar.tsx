import React from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {SunIcon} from '@chakra-ui/icons';
import Logo from '@/components/Icons/Logo';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';
import Play from '@/components/Icons/Play';
import {useEditor} from '@/canvascore/react';
import useEditorType from '@/hooks/useEditorType';
import {IScene} from '@/canvascore/types';
import {loadTemplateFonts} from '@/utils/fonts';
import {loadVideoEditorAssets} from '@/utils/video';
import DesignTitle from './DesignTitle';
import {IDesign} from '@/interfaces/DesignEditor';
import Github from '@/components/Icons/Github';

const Navbar = () => {
  const {
    setDisplayPreview,
    setScenes,
    setCurrentDesign,
    currentDesign,
    scenes,
  } = useDesignEditorContext();
  const editorType = useEditorType();
  const editor = useEditor();
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const parseGraphicJSON = () => {
    const currentScene = editor.scene.exportToJSON();

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: 'GRAPHIC',
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: '',
      };
      makeDownload(graphicTemplate);
    } else {
      console.log('NO CURRENT DESIGN');
    }
  };

  const parsePresentationJSON = () => {
    const currentScene = editor.scene.exportToJSON();

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          duration: 5000,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        duration: 5000,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const presentationTemplate: IDesign = {
        id: currentDesign.id,
        type: 'PRESENTATION',
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: '',
      };
      makeDownload(presentationTemplate);
    } else {
      console.log('NO CURRENT DESIGN');
    }
  };

  const parseVideoJSON = () => {
    const currentScene = editor.scene.exportToJSON();
    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: scn.id,
          duration: scn.duration,
          layers: currentScene.layers,
          name: scn.name ? scn.name : '',
        };
      }
      return {
        id: scn.id,
        duration: scn.duration,
        layers: scn.layers,
        name: scn.name ? scn.name : '',
      };
    });
    if (currentDesign) {
      const videoTemplate: IDesign = {
        id: currentDesign.id,
        type: 'VIDEO',
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: '',
      };
      makeDownload(videoTemplate);
    } else {
      console.log('NO CURRENT DESIGN');
    }
  };

  const makeDownload = (data: Object) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data),
    )}`;
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'template.json';
    a.click();
  };

  const makeDownloadTemplate = async () => {
    if (editor) {
      if (editorType === 'GRAPHIC') {
        return parseGraphicJSON();
      } else if (editorType === 'PRESENTATION') {
        return parsePresentationJSON();
      } else {
        return parseVideoJSON();
      }
    }
  };

  const loadGraphicTemplate = async (payload: IDesign) => {
    const scenes = [];
    const {scenes: scns, ...design} = payload;

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      };
      const loadedScene = await loadVideoEditorAssets(scene);
      await loadTemplateFonts(loadedScene);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      scenes.push({...loadedScene, preview});
    }

    return {scenes, design};
  };

  const loadPresentationTemplate = async (payload: IDesign) => {
    const scenes = [];
    const {scenes: scns, ...design} = payload;

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn,
        layers: scn.layers,
        metadata: {},
      };
      const loadedScene = await loadVideoEditorAssets(scene);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      await loadTemplateFonts(loadedScene);
      scenes.push({...loadedScene, preview});
    }
    return {scenes, design};
  };

  const loadVideoTemplate = async (payload: IDesign) => {
    const scenes = [];
    const {scenes: scns, ...design} = payload;

    for (const scn of scns) {
      const design: IScene = {
        name: 'Awesome template',
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
        duration: scn.duration,
      };
      const loadedScene = await loadVideoEditorAssets(design);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      await loadTemplateFonts(loadedScene);
      scenes.push({...loadedScene, preview});
    }
    return {scenes, design};
  };

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      let template;
      if (data.type === 'GRAPHIC') {
        template = await loadGraphicTemplate(data);
      } else if (data.type === 'PRESENTATION') {
        template = await loadPresentationTemplate(data);
      } else if (data.type === 'VIDEO') {
        template = await loadVideoTemplate(data);
      }
      //   @ts-ignore
      setScenes(template.scenes);
      //   @ts-ignore
      setCurrentDesign(template.design);
    },
    [editor],
  );

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (res) => {
        const result = res.target!.result as string;
        const design = JSON.parse(result);
        handleImportTemplate(design);
      };
      reader.onerror = (err) => {
        console.log(err);
      };

      reader.readAsText(file);
    }
  };

  return (
    <Box
      height="64px"
      bg="black"
      display="grid"
      padding="0 1.25rem"
      gridTemplateColumns="380px 1fr 380px"
      alignItems="center"
    >
      <Flex color="#ffffff">
        <Logo size={36} color="white" />
      </Flex>
      <DesignTitle />
      <Flex alignItems="center" justifyContent="flex-end">
        <input
          multiple={false}
          onChange={handleFileInput}
          type="file"
          id="file"
          ref={inputFileRef}
          style={{display: 'none'}}
        />
        <Button
          size="sm"
          color="white"
          onClick={handleInputFileRefClick}
          variant="outline"
          mr="4px"
          leftIcon={<SunIcon />}
          _hover={{
            color: 'black',
            '& svg': {
              fill: 'black',
            },
            _before: {
              outline: '2px solid black',
            },
            bg: 'white',
          }}
          _focus={{
            outline: '2px solid black',
          }}
        >
          Import
        </Button>
        <Button
          size="sm"
          color="white"
          onClick={makeDownloadTemplate}
          variant="outline"
          mr="4px"
          leftIcon={<SunIcon />}
          _hover={{
            color: 'black',
            '& svg': {
              fill: 'black',
            },
            _before: {
              outline: '2px solid black',
            },
            bg: 'white',
          }}
          _focus={{
            outline: '2px solid black',
          }}
        >
          Export
        </Button>
        <Button
          size="sm"
          color="white"
          onClick={() => setDisplayPreview(true)}
          variant="outline"
          mr="4px"
          leftIcon={<Play size={24} color="white" />}
          _hover={{
            color: 'black',
            iconColor: 'black',
            _before: {
              outline: '2px solid black',
            },
            bg: 'white',
          }}
          _focus={{
            outline: '2px solid black',
          }}
        />
        <Button
          size="sm"
          color="white"
          onClick={() =>
            window.location.replace(
              'https://github.com/layerhub-io/react-design-editor',
            )
          }
          variant="outline"
          leftIcon={<Github size={24} color="white" />}
          _hover={{
            color: 'black',
            '& svg': {
              color: 'black',
            },
            _before: {
              outline: '2px solid black',
            },
            bg: 'white',
          }}
          _focus={{
            outline: '2px solid black',
          }}
        />
        <Button
          style={{marginLeft: '0.5rem'}}
          size="sm"
          color="white"
          onClick={() => window.location.replace('https://editor.layerhub.io')}
          colorScheme="blue"
        >
          Try PRO
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
