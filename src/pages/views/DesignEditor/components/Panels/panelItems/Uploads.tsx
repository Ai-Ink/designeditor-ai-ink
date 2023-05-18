import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {ArrowLeftIcon} from '@chakra-ui/icons';
import Scrollable from '@/components/Scrollable';
import DropZone from '@/components/Dropzone';
import {Button} from '@chakra-ui/button';
import {useEditor} from '@layerhub-io/react';
import useSetIsSidebarOpen from '@/hooks/useSetIsSidebarOpen';
import {nanoid} from 'nanoid';
import {captureFrame, loadVideoResource} from '@/utils/video';
import {ILayer} from '@layerhub-io/types';
import {toBase64} from '@/utils/data';

const Uploads = () => {
  const inputFileRef = React.useRef(null);
  const [uploads, setUploads] = React.useState([]);
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();

  const handleDropFiles = async (files) => {
    const file = files[0];

    const isVideo = file.type.includes('video');
    const base64 = (await toBase64(file)) || '';
    let preview = base64;
    if (isVideo) {
      const video = await loadVideoResource(base64);
      const frame = await captureFrame(video);
      preview = frame;
    }

    const type = isVideo ? 'StaticVideo' : 'StaticImage';

    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: type,
    };

    setUploads([...uploads, upload]);
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileInput = (e) => {
    handleDropFiles(e.target.files);
  };

  const addImageToCanvas = (props) => {
    editor.objects.add(props);
  };

  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <Box flex={1} display="flex" flexDirection="column">
        <Flex
          alignItems="center"
          fontWeight={500}
          justifyContent="space-between"
          padding="1.5rem"
        >
          Uploads
          <Box
            onClick={() => setIsSidebarOpen(false)}
            cursor="pointer"
            display="flex"
          >
            <ArrowLeftIcon boxSize={4} />
          </Box>
        </Flex>
        <Scrollable>
          <Box padding="0 1.5rem">
            <Button
              onClick={handleInputFileRefClick}
              size="sm"
              width="100%"
              colorScheme="custom"
              variant="solid"
              bg="custom.blackButtonBg"
              color="custom.blackButtonText"
            >
              Computer
            </Button>
            <input
              onChange={handleFileInput}
              type="file"
              id="file"
              ref={inputFileRef}
              style={{display: 'none'}}
            />

            <div
              style={{
                marginTop: '1rem',
                display: 'grid',
                gap: '0.5rem',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => addImageToCanvas(upload)}
                >
                  <div>
                    <img
                      width="100%"
                      src={upload.preview ? upload.preview : upload.url}
                      alt="preview"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Box>
        </Scrollable>
      </Box>
    </DropZone>
  );
};

export default Uploads;
