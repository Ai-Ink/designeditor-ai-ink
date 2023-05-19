import React from 'react';
import Search from '@/components/Icons/Search';
import {Input, InputGroup, InputLeftElement, Box} from '@chakra-ui/react';
import useAppContext from '@/hooks/useAppContext';
import {useEditor} from '@/canvascore/react';
import {loadFonts} from '@/utils/fonts';
import {groupBy} from 'lodash';
import Scrollable from '@/components/Scrollable';
import {DeleteIcon} from '@chakra-ui/icons';
import {useSelector} from 'react-redux';
import {selectFonts} from '@/store/slices/fonts/selectors';
import {useAppDispatch} from '@/store/store';
import {queryFonts} from '@/store/slices/fonts/actions';
import InfiniteScrolling from '@/components/InfiniteScrolling';
import {useDebounce} from 'use-debounce';
import FontPreviewCard from './FontPreviewCard';

export default function () {
  const [hasMore, setHasMore] = React.useState(true);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [query, setQuery] = React.useState('');
  const {setActiveSubMenu} = useAppContext();
  const fonts = useSelector(selectFonts);
  const [commonFonts, setCommonFonts] = React.useState<any[]>([]);
  const [searchQuery] = useDebounce(query, 250);
  const editor = useEditor();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const grouped = groupBy(fonts, 'fontFamily');
    const standardFonts = Object.keys(grouped).map((key) => {
      const familyFonts = grouped[key];
      const standardFont = familyFonts.find((familyFont) =>
        familyFont.postScriptName.includes('-Regular'),
      );

      if (standardFont) {
        return standardFont;
      }
      return familyFonts[familyFonts.length - 1];
    });

    console.log(standardFonts);
    setCommonFonts(standardFonts);
  }, [fonts]);

  const handleFontFamilyChange = async (x: any) => {
    console.log(x);
    if (editor) {
      const font = {
        postscriptName: x.postScriptName,
        fontFamily: x.fontFamily,
        fontURL: x.fontURL,
      };
      await loadFonts([font]);

      editor.objects.update({
        postscriptName: x.postscriptName,
        fontFamily: x.fontFamily,
        fontURL: font.fontURL,
      });
    }
  };

  React.useEffect(() => {
    dispatch(
      queryFonts({
        query: searchQuery,
        skip: pageNumber,
        take: 100,
      }),
    );
    setHasMore(false);
    if (!searchQuery) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [searchQuery]);

  const fetchData = React.useCallback(() => {
    if (!searchQuery) {
      dispatch(
        queryFonts({
          query: searchQuery,
          skip: pageNumber,
          take: 100,
        }),
      );
    }

    setPageNumber(pageNumber + 1);
  }, [pageNumber, searchQuery]);

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        fontWeight={500}
        justifyContent="space-between"
        padding="1.5rem"
      >
        <Box>Select a font</Box>
        <Box
          onClick={() => setActiveSubMenu('')}
          cursor="pointer"
          display="flex"
        >
          <DeleteIcon boxSize={6} />
        </Box>
      </Box>
      <Box padding="0 1.5rem 1rem">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search size={4} color="black" />
          </InputLeftElement>
          <Input
            paddingLeft="2rem"
            variant="flushed"
            size="sm"
            placeholder="Search font"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Box>
      <Scrollable>
        <Box padding="0 1.5rem" display="grid" gap="0.2rem">
          <InfiniteScrolling fetchData={fetchData} hasMore={hasMore}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
              gap={4}
            >
              {commonFonts.map((font, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => handleFontFamilyChange(font)}
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    fontSize="14px"
                    _hover={{
                      backgroundColor: 'rgb(255, 246, 247)',
                    }}
                    id={font.id}
                  >
                    <FontPreviewCard
                      fontName={font.postscriptName}
                      fontFamily={font.fontFamily}
                      previewSize={64}
                    />
                  </Box>
                );
              })}
            </Box>
          </InfiniteScrolling>
        </Box>
      </Scrollable>
    </Box>
  );
}
