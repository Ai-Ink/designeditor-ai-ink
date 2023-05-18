import React, {useEffect, useRef} from 'react';
import {Box} from '@chakra-ui/react';

const SVGItemsGrid = ({graphics, addObject}) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const parentWidth = gridRef.current.offsetWidth;
      const numColumns = Math.floor(parentWidth / 200); // Adjust the width as needed

      // Set the number of columns by updating inline styles
      gridRef.current.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
    };

    // Initialize the grid columns on mount
    handleResize();

    // Update the grid columns on window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const svgItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '8px',
  };

  return (
    <Box ref={gridRef} display="grid" gridGap="8px">
      {graphics.map((graphic, index) => (
        <Box
          key={index}
          onClick={() => addObject(graphic)}
          position="relative"
          background="#f8f8fb"
          cursor="pointer"
          borderRadius="8px"
          overflow="hidden"
          _hover={{
            opacity: 1,
            background: 'rgb(233,233,233)',
          }}
          {...svgItemStyle}
        >
          <svg
            viewBox={`0 0 ${graphic.width} ${graphic.height}`}
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            pointerEvents="none"
          >
            <path d={graphic.path} fill={graphic.fill} />
          </svg>
        </Box>
      ))}
    </Box>
  );
};

export default SVGItemsGrid;
