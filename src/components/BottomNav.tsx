import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import React from "react";
import { FaHome, FaRegMoneyBillAlt } from "react-icons/fa";
import { AiOutlineHome, AiOutlineMenuFold } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import "./BottomNav.css";
const BottomNav: React.FC = () => {
  return (
    <Flex
      bg="white"
      h="10vh"
      pos="fixed"
      boxShadow="dark-lg"
      bottom="0"
      px="30px"
      w="100%"
      justify="space-between"
      align="center"
      zIndex="popover"
    >
      <NavLink to="/dashboard" activeClassName="active">
        <Box
          justify="center"
          textAlign="center"
          routerDirection="none"
          //   color="#046494"
          color="grey"
          p="5px"
        >
          <Icon as={AiOutlineHome} h={5} w={5} />
          <Text>Home</Text>
        </Box>
      </NavLink>
      <NavLink to="/menu" activeClassName="active">
        <Box
          justify="center"
          textAlign="center" //   color="#046494"
          color="grey"
          p="5px"
        >
          <Icon as={AiOutlineMenuFold} h={5} w={5} />
          <Text>Menu</Text>
        </Box>
      </NavLink>
      <NavLink to="/payments" activeClassName="active">
        <Box
          justify="center"
          textAlign="center" //   color="#046494"
          color="grey"
          p="5px"
        >
          <Icon as={FaRegMoneyBillAlt} h={5} w={5} />
          <Text>Recents</Text>
        </Box>{" "}
      </NavLink>
      <NavLink to="/profile" activeClassName="active">
        <Box
          justify="center"
          textAlign="center" //   color="#046494"
          color="grey"
          p="5px"
        >
          <Icon as={CgProfile} h={5} w={5} />
          <Text>Profile</Text>
        </Box>
      </NavLink>
    </Flex>
  );
};

export default BottomNav;
