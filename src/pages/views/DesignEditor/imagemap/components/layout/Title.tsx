import React, {Component} from 'react';
import {Box, Button, Flex, Menu, Modal, Tooltip} from '@chakra-ui/react';
import i18next from 'i18next';
import {Icon} from '../icon/Icon';
import {ShortcutHelp} from '../help';

interface IProps {
  onChangeEditor: (param: string) => void;
  currentEditor: string;
}

interface IState {
  visible: boolean;
}

class Title extends Component<IProps, IState> {
  state = {
    visible: false,
  };

  componentDidMount() {
    if (globalThis) {
      (globalThis.adsbygoogle = globalThis.adsbygoogle || []).push({});
    }
  }

  handlers = {
    goGithub: () => {
      window.open('https://github.com/salgum1114/react-design-editor');
    },
    goDocs: () => {
      window.open('https://salgum1114.github.io/react-design-editor/docs');
    },
    showHelp: () => {
      this.setState({
        visible: true,
      });
    },
  };

  render() {
    const {visible} = this.state;
    return (
      <Flex
        bgGradient="linear(to-r, #23303e, #404040 51%, #23303e 75%)"
        flexWrap="wrap"
        flex="1"
        alignItems="center"
      >
        <Flex ml={8} flex="0 1 auto">
          <Box color="white" fontSize={24} fontWeight={500}>
            React Design Editor
          </Box>
          <Tooltip label={i18next.t('action.go-github')} fontSize={16}>
            <Button
              className="rde-action-btn"
              color="white"
              bg="transparent"
              size="lg"
              onClick={this.handlers.goGithub}
            >
              <Icon name="github" prefix="fab" size={1.5} />
            </Button>
          </Tooltip>
          <Tooltip label={i18next.t('action.go-docs')} fontSize={16}>
            <Button
              className="rde-action-btn"
              color="white"
              bg="transparent"
              size="lg"
              onClick={this.handlers.goDocs}
            >
              <Icon name="book" prefix="fas" size={1.5} />
            </Button>
          </Tooltip>
          <Tooltip label={i18next.t('action.shortcut-help')} fontSize={16}>
            <Button
              className="rde-action-btn"
              color="white"
              bg="transparent"
              size="lg"
              onClick={this.handlers.showHelp}
            >
              <Icon name="question" prefix="fas" size={1.5} />
            </Button>
          </Tooltip>
        </Flex>
        <Flex ml={88}>
          <Menu
            mode="horizontal"
            theme="dark"
            bg="transparent"
            fontSize="16px"
            onClick={(param) => this.props.onChangeEditor(param.key)}
            selectedKeys={[this.props.currentEditor]}
          >
            <Menu.Item key="imagemap" color="white">
              {i18next.t('imagemap.imagemap')}
            </Menu.Item>
            <Menu.Item key="workflow" color="white">
              {i18next.t('workflow.workflow')}
            </Menu.Item>
            {/* <Menu.Item key="flow" color="white">{i18n.t('flow.flow')}</Menu.Item> */}
            {/* <Menu.Item key="hexgrid" color="white">
							{i18next.t('hexgrid.hexgrid')}
						</Menu.Item>
						<Menu.Item key="fiber" color="white">
							{i18next.t('fiber.fiber')}
						</Menu.Item> */}
          </Menu>
        </Flex>
        <Flex flex="1" justifyContent="flex-end">
          <ins
            className="adsbygoogle"
            style={{display: 'inline-block', width: 600, height: 60}}
            data-ad-client="ca-pub-8569372752842198"
            data-ad-slot="5790685139"
          />
        </Flex>
        <Modal
          isOpen={visible}
          onClose={() => this.setState({visible: false})}
          isCentered
          size="50%"
        >
          <ShortcutHelp />
        </Modal>
      </Flex>
    );
  }
}

export default Title;
