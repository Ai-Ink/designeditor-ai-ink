import React from 'react';
import {Box} from '@chakra-ui/react';
import {useEditor} from '@/canvascore/react';

const Graphic = () => {
  const editor = useEditor();
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    image: '',
  });

  const makePreview = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON();
      const image = (await editor.renderer.render(template)) as string;
      setState({image});
      setLoading(false);
    }
  }, [editor]);

  React.useEffect(() => {
    makePreview();
  }, [editor]);

  return (
    <Box
      display="flex"
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="5rem"
    >
      {!loading && <img width="auto" height="100%" src={state.image} />}
    </Box>
  );
};

export default Graphic;
