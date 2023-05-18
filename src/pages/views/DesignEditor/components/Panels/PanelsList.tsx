import React from 'react';
import {Box} from '@chakra-ui/react';
import {BASE_ITEMS, VIDEO_PANEL_ITEMS} from '@/constants/app-options';
import useAppContext from '@/hooks/useAppContext';
import Icons from '@/components/Icons';
import {useTranslation} from 'react-i18next';
import useSetIsSidebarOpen from '@/hooks/useSetIsSidebarOpen';
import useEditorType from '@/hooks/useEditorType';
import Scrollable from '@/components/Scrollable';

const PanelsList = () => {
  const {activePanel} = useAppContext();
  const {t} = useTranslation('editor');
  const editorType = useEditorType();
  const PANEL_ITEMS = editorType === 'VIDEO' ? VIDEO_PANEL_ITEMS : BASE_ITEMS;

  return (
    <Box width="80px" backgroundColor="primary.900" display="flex" flex="none">
      <Scrollable autoHide>
        {PANEL_ITEMS.map((panelListItem) => (
          <PanelListItem
            label={t(`panels.panelsList.${panelListItem.id}`)}
            name={panelListItem.name}
            key={panelListItem.name}
            icon={panelListItem.name}
            activePanel={activePanel}
          />
        ))}
      </Scrollable>
    </Box>
  );
};

const PanelListItem = ({label, icon, activePanel, name}) => {
  const {setActivePanel} = useAppContext();
  const setIsSidebarOpen = useSetIsSidebarOpen();

  const Icon = Icons[icon];

  return (
    <Box
      id="EditorPanel"
      onClick={() => {
        setIsSidebarOpen(true);
        setActivePanel(name);
      }}
      width="80px"
      height="80px"
      backgroundColor={name === activePanel ? 'white' : 'primary.900'}
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      fontWeight="semibold" // Adjusted fontWeight value
      fontSize="0.8rem"
      userSelect="none"
      transition="all 0.5s"
      gap="0.1rem"
      _hover={{
        cursor: 'pointer',
        backgroundColor: 'primary.950',
        transition: 'all 0.5s',
      }}
    >
      <Icon size={24} color={name === activePanel ? 'primary.900' : 'white'} />
      <Box
        fontWeight="bold"
        color={name === activePanel ? 'primary.900' : 'white'}
      >
        {label}
      </Box>{' '}
      {/* Adjusted fontWeight value */}
    </Box>
  );
};

export default PanelsList;
