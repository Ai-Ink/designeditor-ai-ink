import Graphic from './Graphic';
import Presentation from './Presentation';
import Video from './Video';
import useEditorType from '@/hooks/useEditorType';

const Footer = () => {
  const editorType = useEditorType();

  return {
    NONE: <></>,
    GRAPHIC: <Graphic />,
  }[editorType];
};

export default Footer;
