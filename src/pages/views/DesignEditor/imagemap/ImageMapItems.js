import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Input,
  Box,
  Flex,
  IconButton,
  Text,
  Alert,
} from '@chakra-ui/react';
import {MinusIcon, AddIcon} from '@chakra-ui/icons';
import classnames from 'classnames';
import i18n from 'i18next';

import {FlexContainer} from './components/flex';
import Icon from './components/icon/Icon';
import Scrollbar from './components/common/Scrollbar';
import SVGModal from './components/common/SVGModal';
import {v4 as uuid} from 'uuid';

// notification.config({
//   top: 80,
//   duration: 2,
// });

class ImageMapItems extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    descriptors: PropTypes.object,
  };

  state = {
    activeKey: [],
    collapse: false,
    textSearch: '',
    descriptors: {},
    filteredDescriptors: [],
    svgModalVisible: false,
  };

  componentDidMount() {
    const {canvasRef} = this.props;
    this.waitForCanvasRender(canvasRef);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.props.descriptors) !==
      JSON.stringify(nextProps.descriptors)
    ) {
      const descriptors = Object.keys(nextProps.descriptors).reduce(
        (prev, key) => {
          return prev.concat(nextProps.descriptors[key]);
        },
        [],
      );
      this.setState({
        descriptors,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(this.state.descriptors) !==
      JSON.stringify(nextState.descriptors)
    ) {
      return true;
    } else if (
      JSON.stringify(this.state.filteredDescriptors) !==
      JSON.stringify(nextState.filteredDescriptors)
    ) {
      return true;
    } else if (this.state.textSearch !== nextState.textSearch) {
      return true;
    } else if (
      JSON.stringify(this.state.activeKey) !==
      JSON.stringify(nextState.activeKey)
    ) {
      return true;
    } else if (this.state.collapse !== nextState.collapse) {
      return true;
    } else if (this.state.svgModalVisible !== nextState.svgModalVisible) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    const {canvasRef} = this.props;
    this.detachEventListener(canvasRef);
  }

  waitForCanvasRender = (canvas) => {
    setTimeout(() => {
      if (canvas) {
        this.attachEventListener(canvas);
        return;
      }
      const {canvasRef} = this.props;
      this.waitForCanvasRender(canvasRef);
    }, 5);
  };

  attachEventListener = (canvas) => {
    canvas.canvas.wrapperEl.addEventListener(
      'dragenter',
      this.events.onDragEnter,
      false,
    );
    canvas.canvas.wrapperEl.addEventListener(
      'dragover',
      this.events.onDragOver,
      false,
    );
    canvas.canvas.wrapperEl.addEventListener(
      'dragleave',
      this.events.onDragLeave,
      false,
    );
    canvas.canvas.wrapperEl.addEventListener('drop', this.events.onDrop, false);
  };

  detachEventListener = (canvas) => {
    canvas.canvas.wrapperEl.removeEventListener(
      'dragenter',
      this.events.onDragEnter,
    );
    canvas.canvas.wrapperEl.removeEventListener(
      'dragover',
      this.events.onDragOver,
    );
    canvas.canvas.wrapperEl.removeEventListener(
      'dragleave',
      this.events.onDragLeave,
    );
    canvas.canvas.wrapperEl.removeEventListener('drop', this.events.onDrop);
  };

  /* eslint-disable react/sort-comp, react/prop-types */
  handlers = {
    onAddItem: (item, centered) => {
      const {canvasRef} = this.props;
      if (canvasRef.handler.interactionMode === 'polygon') {
        Alert.info({
          message: 'Already drawing',
        });
        return;
      }
      const id = uuid();
      const option = {...item.option, id};
      if (item.option.superType === 'svg' && item.type === 'default') {
        this.handlers.onSVGModalVisible(item.option);
        return;
      }
      canvasRef.handler.add(option, centered);
    },
    onAddSVG: (option, centered) => {
      const {canvasRef} = this.props;
      canvasRef.handler.add(
        {...option, type: 'svg', superType: 'svg', id: uuid(), name: 'New SVG'},
        centered,
      );
      this.handlers.onSVGModalVisible();
    },
    onDrawingItem: (item) => {
      const {canvasRef} = this.props;
      if (canvasRef.handler.interactionMode === 'polygon') {
        Alert.info({
          message: 'Already drawing',
        });
        return;
      }
      if (item.option.type === 'line') {
        canvasRef.handler.drawingHandler.line.init();
      } else if (item.option.type === 'arrow') {
        canvasRef.handler.drawingHandler.arrow.init();
      } else {
        canvasRef.handler.drawingHandler.polygon.init();
      }
    },
    onChangeActiveKey: (activeKey) => {
      this.setState({
        activeKey,
      });
    },
    onCollapse: () => {
      this.setState((prevState) => ({
        collapse: !prevState.collapse,
      }));
    },
    onSearchNode: (e) => {
      const filteredDescriptors = this.handlers
        .transformList()
        .filter((descriptor) =>
          descriptor.name.toLowerCase().includes(e.target.value.toLowerCase()),
        );
      this.setState({
        textSearch: e.target.value,
        filteredDescriptors,
      });
    },
    transformList: () => {
      return Object.values(this.props.descriptors).reduce(
        (prev, curr) => prev.concat(curr),
        [],
      );
    },
    onSVGModalVisible: () => {
      this.setState((prevState) => ({
        svgModalVisible: !prevState.svgModalVisible,
      }));
    },
  };

  events = {
    onDragStart: (e, item) => {
      this.item = item;
      const {target} = e;
      target.classList.add('dragging');
    },
    onDragOver: (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'copy';
      return false;
    },
    onDragEnter: (e) => {
      const {target} = e;
      target.classList.add('over');
    },
    onDragLeave: (e) => {
      const {target} = e;
      target.classList.remove('over');
    },
    onDrop: (e) => {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      const {layerX, layerY} = e;
      const dt = e.dataTransfer;
      if (dt.types.length && dt.types[0] === 'Files') {
        const {files} = dt;
        Array.from(files).forEach((file) => {
          file.uid = uuid();
          const {type} = file;
          if (
            type === 'image/png' ||
            type === 'image/jpeg' ||
            type === 'image/jpg'
          ) {
            const item = {
              option: {
                type: 'image',
                file,
                left: layerX,
                top: layerY,
              },
            };
            this.handlers.onAddItem(item, false);
          } else {
            Alert.warn({
              message: 'Not supported file type',
            });
          }
        });
        return false;
      }
      const option = {...this.item.option, left: layerX, top: layerY};
      const newItem = {...this.item, option};
      this.handlers.onAddItem(newItem, false);
      return false;
    },
    onDragEnd: (e) => {
      this.item = null;
      e.target.classList.remove('dragging');
    },
  };

  renderItems = (items) => (
    <Flex flexWrap="wrap" flexDirection="column" style={{width: '100%'}}>
      {items.map((item) => this.renderItem(item))}
    </Flex>
  );

  renderItem = (item, centered) =>
    item.type === 'drawing' ? (
      <Box
        key={item.name}
        draggable
        onClick={(e) => this.handlers.onDrawingItem(item)}
        className="rde-editor-items-item"
        style={{justifyContent: this.state.collapse ? 'center' : null}}
      >
        <Flex alignItems="center">
          <Icon
            name={item.icon.name}
            prefix={item.icon.prefix}
            style={item.icon.style}
          />
          {!this.state.collapse && (
            <Text className="rde-editor-items-item-text">{item.name}</Text>
          )}
        </Flex>
      </Box>
    ) : (
      <Box
        key={item.name}
        draggable
        onClick={(e) => this.handlers.onAddItem(item, centered)}
        onDragStart={(e) => this.events.onDragStart(e, item)}
        onDragEnd={(e) => this.events.onDragEnd(e, item)}
        className="rde-editor-items-item"
        style={{justifyContent: this.state.collapse ? 'center' : null}}
      >
        <Flex alignItems="center">
          <Icon
            name={item.icon.name}
            prefix={item.icon.prefix}
            style={item.icon.style}
          />
          {!this.state.collapse && (
            <Text className="rde-editor-items-item-text">{item.name}</Text>
          )}
        </Flex>
      </Box>
    );

  render() {
    const {descriptors} = this.props;
    const {
      collapse,
      textSearch,
      filteredDescriptors,
      activeKey,
      svgModalVisible,
      svgOption,
    } = this.state;
    const className = classNames('rde-editor-items', {
      minimize: collapse,
    });
    return (
      <Box className={className}>
        <Flex flex="1" flexDirection="column" style={{height: '100%'}}>
          <Flex
            justifyContent="center"
            alignItems="center"
            style={{height: 40}}
          >
            <IconButton
              icon={collapse ? 'chevron-right' : 'chevron-left'}
              variant="ghost"
              className="rde-action-btn"
              style={{margin: '0 4px'}}
              onClick={this.handlers.onCollapse}
            />
            {!collapse && (
              <Input
                style={{margin: '8px'}}
                placeholder={i18n.t('action.search-list')}
                onChange={this.handlers.onSearchNode}
                value={textSearch}
                allowClear
              />
            )}
          </Flex>
          <Scrollbar>
            <Flex flex="1" style={{overflowY: 'hidden'}}>
              {(textSearch.length && this.renderItems(filteredDescriptors)) ||
                (collapse ? (
                  <Flex
                    flexWrap="wrap"
                    flexDirection="column"
                    style={{width: '100%'}}
                    justifyContent="center"
                  >
                    {this.handlers
                      .transformList()
                      .map((descriptor) => this.renderItem(descriptor, true))}
                  </Flex>
                ) : (
                  Object.keys(descriptors).map((key) => {
                    return (
                      <Collapse
                        key={key}
                        isOpen={activeKey.includes(key)}
                        transition={`height 0.2s ease-in-out, opacity 0.2s ease-in-out ${
                          activeKey.includes(key) ? '0s' : '0.2s'
                        }`}
                        style={{width: '100%'}}
                      >
                        <Flex flexDirection="column" style={{width: '100%'}}>
                          <FlexContainer
                            flexDirection="row"
                            justifyContent="space-between"
                            style={{
                              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                              paddingTop: 8,
                              paddingBottom: 8,
                            }}
                          >
                            <Text className="rde-editor-items-category">
                              {key}
                            </Text>
                            <IconButton
                              icon={
                                activeKey.includes(key) ? (
                                  <MinusIcon />
                                ) : (
                                  <AddIcon />
                                )
                              }
                              variant="ghost"
                              className="rde-action-btn"
                              style={{margin: '0 4px'}}
                              onClick={() => {
                                if (activeKey.includes(key)) {
                                  this.handlers.onChangeActiveKey(
                                    activeKey.filter((k) => k !== key),
                                  );
                                } else {
                                  this.handlers.onChangeActiveKey(
                                    activeKey.concat(key),
                                  );
                                }
                              }}
                            />
                          </FlexContainer>
                          <FlexContainer
                            flexDirection="row"
                            justifyContent="flex-start"
                          >
                            {this.renderItems(descriptors[key])}
                          </FlexContainer>
                        </Flex>
                      </Collapse>
                    );
                  })
                ))}
            </Flex>
          </Scrollbar>
        </Flex>
        <SVGModal
          visible={svgModalVisible}
          onClose={this.handlers.onSVGModalVisible}
          onOk={this.handlers.onAddSVG}
          option={svgOption}
        />
      </Box>
    );
  }
}

export default ImageMapItems;
