import {useEffect, useRef} from 'react';
import {useStyletron} from 'styletron-react';

const SVGItemsGrid = ({graphics, addObject}) => {
  const [css] = useStyletron();
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
    <div
      ref={gridRef}
      className={css({
        display: 'grid',
        gridGap: '8px',
      })}
    >
      {graphics.map((graphic, index) => (
        <div
          key={index}
          onClick={() => addObject(graphic)}
          className={css({
            position: 'relative',
            background: '#f8f8fb',
            cursor: 'pointer',
            borderRadius: '8px',
            overflow: 'hidden',
            ':hover': {
              opacity: 1,
              background: 'rgb(233,233,233)',
            },
            ...svgItemStyle,
          })}
        >
          <svg
            viewBox={`0 0 ${graphic.width} ${graphic.height}`}
            xmlns="http://www.w3.org/2000/svg"
            className={css({
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            })}
          >
            <path d={graphic.path} fill={graphic.fill} />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default SVGItemsGrid;
