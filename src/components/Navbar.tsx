import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { useSelector } from "react-redux";
import paygo from "../images/whitepaygo.png";
function Navbar() {
  const state = useSelector((state: any) => state);

  return (
    <Flex
      justifyContent="space-between"
      w="full"
      align="center"
      p="30px"
      bg="white"
      mb="30px"
    >
      <Box width="50%">
        <Text color="#046494">
          Hi{" "}
          {state.user.length === 0 ? "loading" : state.user[0].owner.firstName}
        </Text>
      </Box>
      <Image width="25%" src={`${paygo}`} alt="paygo logo" />
    </Flex>
  );
}

export default Navbar;
