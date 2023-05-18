import React from 'react';
import {Skeleton} from '@chakra-ui/react';

export default function LazyLoadImage({url}) {
  const [state, setState] = React.useState({image: null});

  React.useEffect(() => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      setTimeout(() => {
        setState({image});
      }, 1000);
    };
  }, []);

  return (
    <>
      {state.image ? (
        <img src={url} style={{height: '180px'}} alt="image" />
      ) : (
        <Skeleton height="180px" />
      )}
    </>
  );
}
