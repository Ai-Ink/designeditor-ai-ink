import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Text, Icon} from '@chakra-ui/react';
import {AiOutlineInbox} from 'react-icons/ai';

function FileUpload({onChange, limit, accept}) {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const isLimit = file.size / 1024 / 1024 < limit;
    if (!isLimit) {
      // Handle error message display
      return;
    }
    setFileList([file]);
    onChange(file);
  };

  const handleRemoveFile = () => {
    setFileList([]);
    onChange(null);
  };

  return (
    <Box
      border="2px dashed"
      borderRadius="md"
      borderColor="gray.200"
      p={4}
      textAlign="center"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFileChange(e);
      }}
    >
      <Icon as={AiOutlineInbox} boxSize={12} color="gray.400" mb={4} />
      <Text fontWeight="semibold" mb={2}>
        Click or drag file to this area to upload
      </Text>
      <Text color="gray.500">{`Support for a single upload. Limited to ${limit}MB or less`}</Text>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{display: 'none'}}
      />
    </Box>
  );
}

FileUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
  limit: PropTypes.number,
  accept: PropTypes.string,
};

FileUpload.defaultProps = {
  limit: 5,
};

export default FileUpload;
