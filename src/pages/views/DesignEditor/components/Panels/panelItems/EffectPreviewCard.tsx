import {Box, Text, Card} from '@chakra-ui/react';

const EffectPreviewCard = ({effect}) => {
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
      <Box
        as="img"
        src={effect.preview}
        alt={effect.name}
        style={{width: '70px'}}
      />
      <Text fontWeight="bold" fontSize="sm">
        {effect.name}
      </Text>
    </Card>
  );
};

export default EffectPreviewCard;
