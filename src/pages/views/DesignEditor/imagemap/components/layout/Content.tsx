import React, {Component, ReactNode} from 'react';
import PropTypes from 'prop-types';
import {Box, Spinner} from '@chakra-ui/react';

interface IProps {
  title?: ReactNode;
  leftSider?: ReactNode;
  content?: ReactNode;
  rightSider?: ReactNode;
  className?: string;
  loading?: boolean;
  children?: ReactNode; // Add the children prop here
}

class Content extends Component<IProps> {
  static propTypes = {
    title: PropTypes.any,
    leftSider: PropTypes.any,
    content: PropTypes.any,
    rightSider: PropTypes.any,
    className: PropTypes.string,
    loading: PropTypes.bool,
    children: PropTypes.node, // Add the children prop type here
  };

  static defaultProps = {
    className: 'rde-content-layout-main',
    loading: false,
  };

  render() {
    const {
      title,
      leftSider,
      content,
      rightSider,
      className,
      loading,
      children,
    } = this.props;
    return (
      <Box className="rde-content-layout">
        {title}
        <Box
          overflowY="auto"
          overflowX="hidden"
          minHeight={title ? `calc(100vh - 98px)` : `calc(100vh - 60px)`}
          height={title ? `calc(100vh - 98px)` : `calc(100vh - 60px)`}
          className={className}
        >
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <>
              {leftSider}
              {content || children}
              {rightSider}
            </>
          )}
        </Box>
      </Box>
    );
  }
}

export default Content;
