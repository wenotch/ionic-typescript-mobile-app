import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { FaMoneyBillWave, FaMoneyCheckAlt } from "react-icons/fa";
import { SiWebmoney } from "react-icons/si";
import { MdOutlineCable } from "react-icons/md";
import { RootStateOrAny, useSelector } from "react-redux";

function QuickLinks() {
  const state = useSelector((state: RootStateOrAny) => state);
  const name = state.name;
  return (
    <Box boxShadow="md" p="30px" mx="30px" mt="30px" rounded="md">
      <Flex justify="space-between">
        <Box bg="blue.100" p="10px" rounded="sm" textAlign="center" w="40%">
          <Icon as={FaMoneyCheckAlt} w={6} h={6} color="#046494" />
          <Text>Buy Airtime</Text>
        </Box>
        <Box bg="blue.100" p="10px" rounded="sm" textAlign="center" w="40%">
          <Icon as={SiWebmoney} w={6} h={6} color="#046494" />
          <Text>Buy Data</Text>
        </Box>
      </Flex>
      <Flex justify="space-between" mt="20px">
        <Box bg="blue.100" p="10px" rounded="sm" textAlign="center" w="40%">
          <Icon as={MdOutlineCable} w={6} h={6} color="#046494" />
          <Text>Cable Tv</Text>
        </Box>
        <Box bg="blue.100" p="10px" rounded="sm" textAlign="center" w="40%">
          <Icon as={FaMoneyBillWave} w={6} h={6} color="#046494" />
          <Text>Utility Bills</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default QuickLinks;
