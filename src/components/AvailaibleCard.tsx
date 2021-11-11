import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
interface Props {
  details: String;
  provider: String;
  transactionId: String;
}

const AvailableCards: React.FC<Props> = ({
  details,
  provider,
  transactionId,
}) => {
  return (
    <Flex
      px="30px"
      py="10px"
      rounded="sm"
      boxShadow="lg"
      mt="10px"
      justify="space-between"
      align="center" border="1px solid #e6e6e6"
    >
      <Box>
        <Text>{details}</Text>
      </Box>
      <Text fontWeight="medium">{provider}</Text>
    </Flex>
  );
};

export default AvailableCards;
