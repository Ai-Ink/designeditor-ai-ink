import React, {Component} from 'react';
import {Flex, Box, Text} from '@chakra-ui/react';

class ImageMapTitle extends Component {
  render() {
    const {title, content, action, children} = this.props;
    return (
      children || (
        <Flex
          className="rde-content-layout-title"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box flex="0 1 auto">
            <Flex
              className="rde-content-layout-title-title"
              justifyContent="flex-start"
              alignItems="center"
            >
              {typeof title === 'string' ? <Text as="h3">{title}</Text> : title}
            </Flex>
          </Box>
          <Box flex="auto">
            <Flex
              className="rde-content-layout-title-content"
              alignItems="center"
            >
              {content}
            </Flex>
          </Box>
          <Box flex="auto">
            <Flex
              className="rde-content-layout-title-action"
              justifyContent="flex-end"
              alignItems="center"
            >
              {action}
            </Flex>
          </Box>
        </Flex>
      )
    );
  }
}

export default ImageMapTitle;
