import React from 'react';
import {Box, Input, Tooltip} from '@chakra-ui/react';
import {StatefulTooltip} from 'baseui/tooltip';
import useDesignEditorContext from '~/hooks/useDesignEditorContext';
import CloudCheck from '~/components/Icons/CloudCheck';

interface State {
  name: string;
  width: number;
}

const DesignTitle = () => {
  const [state, setState] = React.useState<State>({
    name: 'My first design.',
    width: 0,
  });
  const {currentDesign, setCurrentDesign} = useDesignEditorContext();
  const inputTitleRef = React.useRef<HTMLInputElement>(null);
  const spanRef = React.useRef<HTMLDivElement | null>(null);

  const handleInputChange = (name: string) => {
    setState({...state, name: name, width: spanRef.current?.clientWidth!});
    setCurrentDesign({...currentDesign, name});
  };

  React.useEffect(() => {
    const name = currentDesign.name;
    if (name || name === '') {
      spanRef.current!.innerHTML = name;
      setState({
        ...state,
        name: name,
        width: spanRef.current?.clientWidth! + 20,
      });
    }
  }, [currentDesign.name]);

  React.useEffect(() => {
    setState({...state, width: spanRef.current?.clientWidth! + 20});
  }, [state.name]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="#ffffff"
      opacity={1}
      position="relative"
    >
      <Box position="absolute" top="-10px" left="50%" width="100%">
        <Box
          fontFamily="Poppins"
          position="absolute"
          top="-20px"
          left="50%"
          fontSize="14px"
          fontWeight={500}
          ref={spanRef}
        >
          {state.name}
        </Box>
      </Box>
      <Box width={`${state.width}px`} display="flex">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value)
          }
          backgroundColor="transparent"
          borderTopStyle="none"
          borderBottomStyle="none"
          borderRightStyle="none"
          borderLeftStyle="none"
          fontWeight={500}
          fontSize="14px"
          width={`${state.width}px`}
          fontFamily="Poppins"
          color="#ffffff"
          paddingRight={0}
          value={state.name}
          ref={inputTitleRef}
        />
      </Box>

      <Tooltip hasArrow label="All changes are saved" backgroundColor="#ffffff">
        <Box cursor="pointer" padding="10px" display="flex" color="#ffffff">
          <CloudCheck size={24} color="white" />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default DesignTitle;
