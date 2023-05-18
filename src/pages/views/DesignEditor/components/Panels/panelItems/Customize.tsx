import React from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import {PlusIcon, SwapHorizontalIcon} from '@chakra-ui/icons';
import {HexColorPicker} from 'react-colorful';
import {Block} from 'baseui/block';
import AngleDoubleLeftIcon from './components/Icons/AngleDoubleLeft';
import Scrollable from './components/Scrollable';
import {sampleFrames} from './constants/editor';
import Scrollbar from '@layerhub-io/react-custom-scrollbar';
import {useEditor, useFrame} from '@layerhub-io/react';
import useSetIsSidebarOpen from './hooks/useSetIsSidebarOpen';
import useDesignEditorContext from './hooks/useDesignEditorContext';

const colors = [
  '#ffffff',
  '#9B9B9B',
  '#4A4A4A',
  '#000000',
  '#A70C2C',
  '#DA9A15',
  '#F8E71D',
  '#47821A',
  '#4990E2',
];

const Customize = () => {
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [backgroundColor, setBackgroundColor] = React.useState('#000000');

  const changeBackgroundColor = (color) => {
    if (editor) {
      editor.frame.setBackgroundColor(color);
    }
  };

  const handleChange = (type, value) => {
    setBackgroundColor(value);
    changeBackgroundColor(value);
  };

  return (
    <Block
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Block
        style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          justifyContent: 'space-between',
          padding: '1.5rem',
        }}
      >
        <Block>Customize</Block>

        <Block
          onClick={() => setIsSidebarOpen(false)}
          style={{
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <AngleDoubleLeftIcon size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block style={{padding: '0 1.5rem'}}>
          <Block>
            <ResizeTemplate />
            <Block
              style={{
                fontSize: '14px',
                textAlign: 'center',
                paddingTop: '0.35rem',
              }}
            >
              1080 x 1920px
            </Block>
          </Block>

          <Block paddingTop="0.5rem">
            <div
              style={{
                background: '#fafafa',
                borderRadius: '8px',
                border: '1px solid #ececf5',
                padding: '0.45rem 1rem',
                fontSize: '14px',
              }}
            >
              <div>Background color</div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '0.5rem',
                  paddingTop: '0.25rem',
                }}
              >
                <Block>
                  <Block
                    as="div"
                    style={{
                      height: '40px',
                      width: '40px',
                      backgroundSize: '100% 100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backgroundImage:
                        'url("https://static.canva.com/web/images/788ee7a68293bd0264fc31f22c31e62d.png")',
                    }}
                  >
                    <Block
                      as="div"
                      style={{
                        height: '32px',
                        width: '32px',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                      }}
                    >
                      <PlusIcon boxSize={6} />
                    </Block>
                  </Block>
                </Block>

                {colors.map((color) => (
                  <Block
                    onClick={() => handleChange('backgroundColor', color)}
                    key={color}
                    style={{
                      background: color,
                      borderRadius: '4px',
                      border: '1px solid #d7d8e3',
                      height: '34px',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          </Block>
        </Block>
      </Scrollable>
    </Block>
  );
};

const ResizeTemplate = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {currentDesign, setCurrentDesign} = useDesignEditorContext();
  const editor = useEditor();
  const [desiredFrame, setDesiredFrame] = React.useState({
    width: 0,
    height: 0,
  });
  const [selectedFrame, setSelectedFrame] = React.useState({
    id: 0,
    width: 0,
    height: 0,
  });
  const frame = useFrame();

  React.useEffect(() => {
    if (frame) {
      setDesiredFrame({
        width: frame.width,
        height: frame.height,
      });
    }
  }, [frame]);

  const applyResize = () => {
    const size = activeKey === '0' ? selectedFrame : desiredFrame;
    if (editor) {
      editor.frame.resize({
        width: parseInt(size.width),
        height: parseInt(size.height),
      });
      setCurrentDesign({
        ...currentDesign,
        frame: {
          width: parseInt(size.width),
          height: parseInt(size.height),
        },
      });
    }
    onClose();
  };

  const isEnabled =
    (activeKey === '0' && selectedFrame.id !== 0) ||
    (activeKey === '1' &&
      !!parseInt(desiredFrame.width) &&
      !!parseInt(desiredFrame.height));

  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        style={{
          width: '100%',
        }}
      >
        Resize template
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent borderRadius="8px">
          <ModalHeader
            style={{
              padding: '2rem 1rem 1rem',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Choose a format and resize your template.
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted>
              <TabList>
                <Tab>Preset size</Tab>
                <Tab>Custom size</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Block style={{width: '100%', height: '400px'}}>
                    <Scrollbar>
                      <Block
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 1fr',
                        }}
                      >
                        {sampleFrames.map((sampleFrame, index) => (
                          <Block
                            onClick={() => setSelectedFrame(sampleFrame)}
                            style={{
                              padding: '0.5rem',
                              backgroundColor:
                                selectedFrame.id === sampleFrame.id
                                  ? 'rgb(243,244,245)'
                                  : '#ffffff',
                              ':hover': {
                                backgroundColor: 'rgb(246,247,248)',
                                cursor: 'pointer',
                              },
                            }}
                            key={index}
                          >
                            <Block
                              style={{
                                height: '120px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <img
                                src={sampleFrame.preview}
                                alt={sampleFrame.name}
                              />
                            </Block>
                            <Block
                              style={{fontSize: '13px', textAlign: 'center'}}
                            >
                              <Block style={{fontWeight: 500}}>
                                {sampleFrame.name}
                              </Block>
                              <Block style={{color: 'rgb(119,119,119)'}}>
                                {sampleFrame.width} x {sampleFrame.height}px
                              </Block>
                            </Block>
                          </Block>
                        ))}
                      </Block>
                    </Scrollbar>
                  </Block>
                </TabPanel>
                <TabPanel>
                  <Block style={{padding: '2rem 2rem'}}>
                    <Block
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 50px 1fr',
                        alignItems: 'end',
                        fontSize: '14px',
                      }}
                    >
                      <Input
                        onChange={(e: any) =>
                          setDesiredFrame({
                            ...desiredFrame,
                            width: e.target.value,
                          })
                        }
                        value={desiredFrame.width}
                        startElement={<Box as={WIcon} boxSize={4} />}
                        size="sm"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        style={{
                          height: '32px',
                        }}
                      >
                        <Box as={SwapHorizontalIcon} boxSize={6} />
                      </Button>
                      <Input
                        onChange={(e: any) =>
                          setDesiredFrame({
                            ...desiredFrame,
                            height: e.target.value,
                          })
                        }
                        value={desiredFrame.height}
                        startElement={<Box as={HIcon} boxSize={4} />}
                        size="sm"
                      />
                    </Block>
                  </Block>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '2rem',
            }}
          >
            <Button
              disabled={!isEnabled}
              onClick={applyResize}
              style={{
                width: '190px',
              }}
            >
              Resize template
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Customize;
