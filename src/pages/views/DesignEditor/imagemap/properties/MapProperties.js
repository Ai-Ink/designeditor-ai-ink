import React from 'react';
import PropTypes from 'prop-types';
import {Form, Collapse, useTheme} from '@chakra-ui/react';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../components/common/Scrollbar';

const {Panel} = Collapse;

function MapProperties({canvasRef, form}) {
  const theme = useTheme();
  const showArrow = false;

  if (canvasRef) {
    return (
      <Scrollbar>
        <Form layout="horizontal">
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
                  <Component.render
                    canvasRef={canvasRef}
                    form={form}
                    data={canvasRef.handler.workarea}
                  />
                </Panel>
              );
            })}
          </Collapse>
        </Form>
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
  const EnhancedMapProperties = Form.create({
    onValuesChange: (changedValues, allValues) => {
      const {onChange, selectedItem} = props;
      onChange(selectedItem, changedValues, {workarea: allValues});
    },
  })(MapProperties);

  return <EnhancedMapProperties {...props} />;
}
