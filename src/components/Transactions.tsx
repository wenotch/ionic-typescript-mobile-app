import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Icon from "@chakra-ui/icon";
import { GrTransaction } from "react-icons/gr";
import { userInfo } from "os";
import { useSelector } from "react-redux";

interface Props {
  details: String;
  amount: Number;
  type: String;
  transactionId: String;
}
const Transactions: React.FC<Props> = ({
  details,
  amount,
  type,
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
      align="center"
    >
      <Box>
        <Icon as={GrTransaction} h={4} w={4} />
        <Text>{details}</Text>
      </Box>
      <Text color={type === "credit" ? "green" : "red"} fontWeight="semibold">N{amount}</Text>
    </Flex>
  );
};

export default Transactions;
