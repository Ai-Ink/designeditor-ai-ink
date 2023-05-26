import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  useTheme,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../components/common/Scrollbar';

const {Panel} = Collapse;

function MapProperties({canvasRef, form}) {
  const theme = useTheme();
  const showArrow = false;

  if (canvasRef) {
    return (
      <Scrollbar>
        <Box as="form">
          <Collapse
            bordered={false}
            bg="transparent"
            color={theme.colors.gray[800]}
          >
            {Object.keys(PropertyDefinition.map).map((key) => {
              const Component = PropertyDefinition.map[key].component;
              return (
                <Panel
                  key={key}
                  header={PropertyDefinition.map[key].title}
                  showArrow={showArrow}
                >
                  <FormControl>
                    <FormLabel>{PropertyDefinition.map[key].title}</FormLabel>
                    <Component.render
                      canvasRef={canvasRef}
                      form={form}
                      data={canvasRef.handler.workarea}
                    />
                    <FormHelperText>
                      {PropertyDefinition.map[key].description}
                    </FormHelperText>
                  </FormControl>
                </Panel>
              );
            })}
          </Collapse>
        </Box>
      </Scrollbar>
    );
  }

  return null;
}

MapProperties.propTypes = {
  canvasRef: PropTypes.any,
  form: PropTypes.any,
};

export default function ChakraMapProperties(props) {
  const {onChange, selectedItem} = props;

  const {handleSubmit, control} = useForm();

  const onSubmit = (data) => {
    onChange(selectedItem, data, {workarea: data});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MapProperties canvasRef={props.canvasRef} form={control} />
    </form>
  );
}
