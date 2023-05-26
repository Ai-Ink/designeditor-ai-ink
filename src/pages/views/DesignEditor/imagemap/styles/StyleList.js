import React from 'react';
import PropTypes from 'prop-types';
import {
  VStack,
  List,
  ListItem,
  ListIcon,
  Button,
  Avatar,
} from '@chakra-ui/react';
import {EditIcon, CloseIcon} from '@chakra-ui/icons';

const StyleList = ({styles, onEdit, onDelete}) => {
  return (
    <VStack align="stretch">
      <List spacing={3}>
        {styles.map((style, index) => (
          <ListItem
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <ListIcon as={Avatar} size="sm">
              {index}
            </ListIcon>
            <div>
              <div>{style.title}</div>
              <div>
                fill: {style.fill}, opacity: {style.opacity}
              </div>
            </div>
            <div>
              <Button
                className="rde-action-btn"
                shape="circle"
                onClick={() => {
                  onEdit(style, index);
                }}
              >
                <EditIcon />
              </Button>
              <Button
                className="rde-action-btn"
                shape="circle"
                onClick={() => {
                  onDelete(index);
                }}
              >
                <CloseIcon />
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

StyleList.propTypes = {
  styles: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default StyleList;
