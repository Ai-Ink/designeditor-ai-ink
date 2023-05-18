import React from 'react';
import {Box} from '@chakra-ui/react';
import useAppContext from '~/hooks/useAppContext';
import panelItems from './panelItems';
import useIsSidebarOpen from '~/hooks/useIsSidebarOpen';

interface State {
  panel: string;
}

const PanelsList = () => {
  const [state, setState] = React.useState<State>({panel: 'Text'});
  const isSidebarOpen = useIsSidebarOpen();
  const {activePanel, activeSubMenu} = useAppContext();

  React.useEffect(() => {
    setState({panel: activePanel});
  }, [activePanel]);

  React.useEffect(() => {
    if (activeSubMenu) {
      setState({panel: activeSubMenu});
    } else {
      setState({panel: activePanel});
    }
  }, [activeSubMenu, activePanel]);

  const Component = panelItems[state.panel];

  return (
    <Box
      id="EditorPanelItem"
      bg="#ffffff"
      width={isSidebarOpen ? '306px' : 0}
      flex="none"
      borderRight="1px solid #d7d8e3"
      display="flex"
      transition="ease width 0.1s"
      overflow="hidden"
    >
      {Component && <Component />}
    </Box>
  );
};

export default PanelsList;
