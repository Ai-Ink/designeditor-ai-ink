import React from 'react';
import {Box, Flex, IconButton} from '@chakra-ui/react';
import {ArrowLeftIcon} from '@chakra-ui/icons';
import Scrollable from '@/components/Scrollable';
import {useEditor} from '@layerhub-io/react';
import useSetIsSidebarOpen from '@/hooks/useSetIsSidebarOpen';
import {getPixabayVideos} from '@/services/pixabay';
import {getPexelsVideos} from '@/services/pexels';
import useDesignEditorContext from '@/hooks/useDesignEditorContext';

const loadVideoResource = (videoSrc) => {
  return new Promise(function (resolve, reject) {
    var video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = 'anonymous';
    video.addEventListener('loadedmetadata', function (event) {
      video.currentTime = 1;
    });

    video.addEventListener('seeked', function () {
      resolve(video);
    });

    video.addEventListener('error', function (error) {
      reject(error);
    });
  });
};

const captureFrame = (video) => {
  return new Promise(function (resolve) {
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext('2d')
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(video.src);

    const data = canvas.toDataURL();

    fetch(data)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      });
  });
};

const captureDuration = (video) => {
  return new Promise((resolve) => {
    resolve(video.duration);
  });
};

const Videos = () => {
  const editor = useEditor();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const [videos, setVideos] = React.useState([]);
  const {scenes, setScenes, currentScene} = useDesignEditorContext();
  const loadPixabayVideos = async () => {
    const videos = await getPixabayVideos('people');
    setVideos(videos);
  };

  const loadPexelsVideos = async () => {
    const videos = await getPexelsVideos('people');
    setVideos(videos);
  };
  React.useEffect(() => {
    loadPexelsVideos();
  }, []);

  const addObject = React.useCallback(
    async (options) => {
      if (editor) {
        const video = await loadVideoResource(options.src);
        const frame = await captureFrame(video);
        const duration = await captureDuration(video);
        editor.objects.add({...options, duration, preview: frame});
        const updatedScenes = scenes.map((scn) => {
          if (scn.id === currentScene?.id) {
            return {
              ...currentScene,
              duration:
                duration * 1000 > currentScene.duration
                  ? duration * 1000
                  : currentScene.duration,
            };
          }
          return scn;
        });
        setScenes(updatedScenes);
      }
    },
    [editor, scenes, currentScene],
  );

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Flex
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        Videos
        <IconButton
          aria-label="Close"
          variant="ghost"
          onClick={() => setIsSidebarOpen(false)}
          icon={<ArrowLeftIcon />}
          size="sm"
          cursor="pointer"
        />
      </Flex>
      <Scrollable>
        <Box padding="0 1.5rem">
          <div
            style={{
              display: 'grid',
              gap: '8px',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            {videos.map((video, index) => {
              return (
                <img
                  width="120px"
                  key={index}
                  src={video.preview}
                  onClick={() => addObject(video)}
                  alt=""
                />
              );
            })}
          </div>
        </Box>
      </Scrollable>
    </Box>
  );
};

const ImageItem = ({preview, onClick}) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        background: '#f8f8fb',
        cursor: 'pointer',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          height: '100%',
          width: '100%',
        }}
      />
      <img
        src={preview}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          verticalAlign: 'middle',
        }}
        alt=""
      />
    </div>
  );
};

export default Videos;
