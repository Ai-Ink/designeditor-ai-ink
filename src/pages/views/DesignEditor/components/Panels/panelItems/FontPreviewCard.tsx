import {Box, Text, Card} from '@chakra-ui/react';

const FontPreviewCard = ({fontName, fontFamily, previewSize}) => {
  return (
    <Card
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="white" // Replace with your desired background color
      p={4}
      borderRadius="md"
      boxShadow="md"
      w="full"
    >
      <Text
        fontFamily={fontFamily}
        fontSize={previewSize}
        fontWeight="normal"
        mb={4}
      >
        Aa
      </Text>
      <Text fontWeight="bold" fontSize="sm">
        {fontName}
      </Text>
      <Text color="gray.500" fontSize="sm">
        {fontFamily}
      </Text>
    </Card>
  );
};

export default FontPreviewCard;
