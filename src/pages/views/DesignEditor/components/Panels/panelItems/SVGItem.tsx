import {useStyletron} from 'styletron-react';

const SVGItem = ({graphic, id, addObject}) => {
  const handleClick = () => {
    addObject(graphic);
  };

  const [css] = useStyletron();

  const pathData = graphic.path
    .map(([command, ...params]) => `${command}${params.join(' ')}`)
    .join(' ');

  return (
    <div
      id={id}
      onClick={handleClick}
      className={css({
        position: 'relative',
        background: 'white',
        cursor: 'pointer',
        overflow: 'hidden',
        width: '60px', // Set a fixed width for each item
        height: '60px', // Set a fixed height for each item
        ':hover': {
          opacity: 1,
          background: 'rgb(233,233,233)',
        },
      })}
    >
      <svg
        className={css({
          width: '100%',
          height: '100%',
        })}
        viewBox={`0 0 ${graphic.width} ${graphic.height}`}
      >
        <path d={pathData} fill={graphic.fill} />
      </svg>
    </div>
  );
};

export default SVGItem;
