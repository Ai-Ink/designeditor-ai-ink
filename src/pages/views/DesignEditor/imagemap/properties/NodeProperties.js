import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ChakraProvider,
  Box,
  List,
  ListIcon,
  ListItem,
  Collapse,
} from '@chakra-ui/react';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../components/common/Scrollbar';
import {Flex} from '../components/flex';
import {Form} from 'formik';

class NodeProperties extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    selectedItem: PropTypes.object,
    onChange: PropTypes.func, // Add the onChange prop type if not present
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedItem &&
      prevProps.selectedItem &&
      this.props.selectedItem.id !== prevProps.selectedItem.id
    ) {
      this.props.form.resetForm();
    }
  }

  handleValuesChange = (changedValues, allValues) => {
    const {onChange, selectedItem} = this.props;
    onChange(selectedItem, changedValues, allValues);
  };

  render() {
    const {canvasRef, selectedItem, form} = this.props;
    const showArrow = false;
    return (
      <Scrollbar>
        <ChakraProvider>
          <Form
            layout="horizontal"
            colon={false}
            onChange={this.handleValuesChange}
          >
            <Collapse bordered={false}>
              {selectedItem && PropertyDefinition[selectedItem.type] ? (
                Object.keys(PropertyDefinition[selectedItem.type]).map(
                  (key) => {
                    const Component =
                      PropertyDefinition[selectedItem.type][key].component;
                    return (
                      <Collapse.Panel
                        key={key}
                        header={
                          PropertyDefinition[selectedItem.type][key].title
                        }
                        showArrow={showArrow}
                      >
                        <Component.render
                          canvasRef={canvasRef}
                          form={form}
                          data={selectedItem}
                        />
                      </Collapse.Panel>
                    );
                  },
                )
              ) : (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  w="100%"
                  h="100%"
                  color="rgba(0, 0, 0, 0.45)"
                  fontSize={16}
                  p={16}
                >
                  <List>
                    <ListItem>
                      <ListIcon as={Box} color="gray.500" />
                      No properties available
                    </ListItem>
                  </List>
                </Flex>
              )}
            </Collapse>
          </Form>
        </ChakraProvider>
      </Scrollbar>
    );
  }
}

export default NodeProperties;
