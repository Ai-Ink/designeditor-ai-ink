import React from 'react';
import {
  Box,
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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {FaPlus} from 'react-icons/fa';
import {HexColorPicker} from 'react-colorful';
import AngleDoubleLeft from '@/components/Icons/AngleDoubleLeft';
import Scrollable from '@/components/Scrollable';
import {sampleFrames} from '@/constants/editor';
import Scrollbar from '@layerhub-io/react-custom-scrollbar';
import {useEditor, useFrame} from '@layerhub-io/react';
import useSetIsSidebarOpen from '@/hooks/useSetIsSidebarOpen';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';

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
    <Box flex={1} display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        <Text color="black" fontFamily="Poppins" fontSize="20px">
          Customize
        </Text>
        <Box
          onClick={() => setIsSidebarOpen(false)}
          cursor="pointer"
          display="flex"
        >
          <AngleDoubleLeft size={18} color="black" />
        </Box>
      </Box>
      <Scrollable>
        <Box padding="0 1.5rem">
          <Box>
            <ResizeTemplate />
            <Text
              fontSize="18px"
              textAlign="center"
              paddingTop="0.35rem"
              color="black"
            >
              1080 x 1920px
            </Text>
          </Box>

          <Box paddingTop="0.5rem">
            <Box
              background="#fafafa"
              borderRadius="8px"
              border="1px solid #ececf5"
              padding="0.45rem 1rem"
              fontSize="14px"
            >
              Background color
              <Box
                display="grid"
                gridTemplateColumns="repeat(5, 1fr)"
                gap="0.5rem"
                paddingTop="0.25rem"
              >
                <Box>
                  <Box
                    as="div"
                    height="40px"
                    width="40px"
                    backgroundSize="100% 100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    backgroundImage="url('https://static.canva.com/web/images/788ee7a68293bd0264fc31f22c31e62d.png')"
                  >
                    <Box
                      as="div"
                      height="32px"
                      width="32px"
                      background="#ffffff"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="1.3rem"
                    >
                      <FaPlus size={6} />
                    </Box>
                  </Box>
                </Box>

                {colors.map((color) => (
                  <Box
                    onClick={() => handleChange('backgroundColor', color)}
                    key={color}
                    background={color}
                    borderRadius="4px"
                    border="1px solid #d7d8e3"
                    height="34px"
                    cursor="pointer"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Scrollable>
    </Box>
  );
};

const ResizeTemplate = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [activeKey, setActiveKey] = React.useState<string | number>('0');
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
        colorScheme="custom"
        variant="solid"
        bg="custom.blackButtonBg"
        color="custom.blackButtonText"
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
                  <Box style={{width: '100%', height: '400px'}}>
                    <Scrollbar>
                      <Box
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 1fr',
                        }}
                      >
                        {sampleFrames.map((sampleFrame, index) => (
                          <Box
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
                            key={sampleFrame.id}
                          >
                            <Box
                              style={{
                                width: '100%',
                                paddingBottom: '100%',
                                backgroundImage: `url(${sampleFrame.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '8px',
                              }}
                            />
                            <Box
                              style={{
                                fontSize: '14px',
                                textAlign: 'center',
                                paddingTop: '0.35rem',
                              }}
                            >
                              {sampleFrame.width} x {sampleFrame.height}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Scrollbar>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gridGap="0.75rem"
                  >
                    <Box>
                      <Box
                        style={{
                          fontSize: '14px',
                          paddingBottom: '0.5rem',
                        }}
                      >
                        Width (px)
                      </Box>
                      <Input
                        size="sm"
                        value={desiredFrame.width}
                        onChange={(e) =>
                          setDesiredFrame({
                            ...desiredFrame,
                            width: e.target.value,
                          })
                        }
                      />
                    </Box>
                    <Box>
                      <Box
                        style={{
                          fontSize: '14px',
                          paddingBottom: '0.5rem',
                        }}
                      >
                        Height (px)
                      </Box>
                      <Input
                        size="sm"
                        value={desiredFrame.height}
                        onChange={(e) =>
                          setDesiredFrame({
                            ...desiredFrame,
                            height: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter style={{padding: '1.5rem'}}>
            <Button
              size="sm"
              variant="outline"
              style={{marginRight: '1rem'}}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button size="sm" disabled={!isEnabled} onClick={applyResize}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Customize;
