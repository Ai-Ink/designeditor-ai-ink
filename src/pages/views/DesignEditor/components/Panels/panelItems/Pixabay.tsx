import React, {useState} from 'react';
import {useEditor} from '@/canvascore/react';
import {Box, Input, Spinner} from '@chakra-ui/react';
import Scrollable from '@/components/Scrollable';
import InfiniteScrolling from '@/components/InfiniteScrolling';
import {IStaticImage} from '@/canvascore/types';
import Search from '@/components/Icons/Search';
import LazyLoadImage from '@/components/LazyLoadImage';
import AngleDoubleLeft from '@/components/Icons/AngleDoubleLeft';
import useSetIsSidebarOpen from '@/hooks/useSetIsSidebarOpen';
import api from '@/services/api';

const Pixabay = () => {
  const editor = useEditor();
  const [hasMore, setHasMore] = React.useState(true);
  const [images, setImages] = useState<IStaticImage[]>([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [category, setCategory] = useState<string>('');
  const setIsSidebarOpen = useSetIsSidebarOpen();

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: 'StaticImage',
          src: url,
        };
        editor.objects.add(options);
      }
    },
    [editor],
  );

  const fetchData = React.useCallback(
    async (reset?: boolean) => {
      setIsLoading(true);

      const newImages = await api.getPixabayImages({
        query: category || 'nature',
        perPage: 12,
        page: pageNumber,
      });

      if (newImages.length === 0) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      let all = [...images, ...newImages];
      if (reset) {
        all = newImages;
      }
      setImages(all);
      setPageNumber(pageNumber + 1);
      setIsLoading(false);
    },
    [pageNumber, hasMore, category, images],
  );

  const makeSearch = () => {
    setImages([]);
    setPageNumber(1);
    setIsLoading(true);
    fetchData(true);
  };

  return (
    <Box flex={1} flexDirection="column" display="flex">
      <Box
        display="flex"
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem 1.5rem 0"
      >
        <Box>Pixabay images</Box>
        <Box
          cursor="pointer"
          display="flex"
          onClick={() => setIsSidebarOpen(false)}
          _hover={{opacity: 0.7}}
        >
          <AngleDoubleLeft size={6} color="black" />
        </Box>
      </Box>
      <Box padding="1.5rem 1.5rem 1rem">
        <Input
          variant="filled"
          size="sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyDown={(e) => e.code === 'Enter' && makeSearch()}
          onBlur={makeSearch}
          placeholder="Search"
          startEnhancer={<Search size={4} color="black" />}
        />
      </Box>
      <Scrollable>
        <Box padding="0 1.5rem">
          <InfiniteScrolling fetchData={fetchData} hasMore={hasMore}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap="0.5rem"
            >
              {images.map((image) => (
                <Box
                  key={image.id}
                  borderRadius="10px"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => addObject(image.src)}
                >
                  <LazyLoadImage url={image.src} />
                </Box>
              ))}
            </Box>
            <Box display="flex" justifyContent="center" py="2rem">
              {isLoading && <Spinner size="sm" />}
            </Box>
          </InfiniteScrolling>
        </Box>
      </Scrollable>
    </Box>
  );
};

export default Pixabay;
