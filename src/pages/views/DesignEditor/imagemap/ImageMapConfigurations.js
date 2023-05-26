import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import classnames from 'classnames';

import NodeProperties from './properties/NodeProperties';
import MapProperties from './properties/MapProperties';
import Styles from './styles/Styles';
import Icon from './components/icon/Icon';
import CommonButton from './components/common/CommonButton';

class ImageMapConfigurations extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    selectedItem: PropTypes.object,
    onChange: PropTypes.func,
    onChangeAnimations: PropTypes.func,
    onChangeStyles: PropTypes.func,
    onChangeDataSources: PropTypes.func,
    styles: PropTypes.array,
    dataSources: PropTypes.array,
  };

  state = {
    activeKey: 'map',
    collapse: false,
  };

  handlers = {
    onChangeTab: (activeKey) => {
      this.setState({
        activeKey,
      });
    },
    onCollapse: () => {
      this.setState((prevState) => ({
        collapse: !prevState.collapse,
      }));
    },
  };

  render() {
    const {
      onChange,
      selectedItem,
      canvasRef,
      animations,
      styles,
      dataSources,
      onChangeStyles,
      onChangeDataSources,
    } = this.props;
    const {activeKey, collapse} = this.state;
    const {onChangeTab, onCollapse} = this.handlers;
    const className = classnames('rde-editor-configurations', {
      minimize: collapse,
    });
    return (
      <div className={className}>
        <CommonButton
          className="rde-action-btn"
          shape="circle"
          icon={collapse ? 'angle-double-left' : 'angle-double-right'}
          onClick={onCollapse}
          style={{position: 'absolute', top: 16, right: 16, zIndex: 1000}}
        />
        <Tabs
          isLazy
          variant="enclosed"
          colorScheme="gray"
          orientation="vertical"
          onChange={onChangeTab}
          value={activeKey}
          style={{height: '100%'}}
          tabBarStyle={{marginTop: 60}}
        >
          <TabList>
            <Tab>
              <Icon name="cog" />
            </Tab>
            <Tab>
              <Icon name="cogs" />
            </Tab>
            <Tab>
              <Icon name="vine" prefix="fab" />
            </Tab>
            <Tab>
              <Icon name="star-half-alt" />
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <MapProperties onChange={onChange} canvasRef={canvasRef} />
            </TabPanel>
            <TabPanel>
              <NodeProperties
                onChange={onChange}
                selectedItem={selectedItem}
                canvasRef={canvasRef}
              />
            </TabPanel>
            <TabPanel>
              <Styles styles={styles} onChangeStyles={onChangeStyles} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default ImageMapConfigurations;
