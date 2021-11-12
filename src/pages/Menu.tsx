import Icon from "@chakra-ui/icon";
import { IonContent, IonPage, IonRouterLink } from "@ionic/react";
import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { AiFillFolderAdd } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { FaMoneyBillWave, FaMoneyCheckAlt } from "react-icons/fa";
import { SiWebmoney } from "react-icons/si";
import { MdOutlineCable } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { useHistory } from "react-router";

const Menu: React.FC = () => {
  const state = useSelector((state: any) => state);
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="white">
          <Navbar />
          <Text textAlign="center" fontSize="xl" mb="20px">
            Menu
          </Text>
          <Flex
            mx="30px"
            onClick={() => history.push("/add-money")}
            px="30px"
            py="15px"
            rounded="sm"
            boxShadow="lg"
            color="white"
            alignItems="center"
            align="center"
            bg="#046494"
          >
            <Icon as={AiFillFolderAdd} w={5} h={5} mr="10px" />
            <Text fontSize="xl" color="white">
              Add Money to Wallet
            </Text>
          </Flex>{" "}
          <Flex
            mx="30px"
            mt="3px"
            onClick={() => history.push("/send-money")}
            px="30px"
            py="15px"
            rounded="sm"
            boxShadow="lg"
            color="white"
            alignItems="center"
            align="center"
            bg="#046494"
          >
            <Icon as={IoIosSend} w={5} h={5} mr="10px" />
            <Text fontSize="xl" color="white">
              Send Money
            </Text>
          </Flex>
          <Flex
            mx="30px"
            mt="3px"
            onClick={() => history.push("/buy-airtime")}
            px="30px"
            py="15px"
            rounded="sm"
            boxShadow="lg"
            color="white"
            alignItems="center"
            align="center"
            bg="#046494"
          >
            <Icon as={FaMoneyCheckAlt} w={5} h={5} mr="10px" />
            <Text fontSize="xl" color="white">
              Buy Airtime
            </Text>
          </Flex>{" "}
          <Flex
            mx="30px"
            mt="3px"
            onClick={() => history.push("/buy-data")}
            px="30px"
            py="15px"
            rounded="sm"
            boxShadow="lg"
            color="white"
            alignItems="center"
            align="center"
            bg="#046494"
          >
            <Icon as={SiWebmoney} w={5} h={5} mr="10px" />
            <Text fontSize="xl" color="white">
              Buy Data
            </Text>
          </Flex>{" "}
          <Flex
            mx="30px"
            mt="3px"
            onClick={() => history.push("/buy-cable")}
            px="30px"
            py="15px"
            rounded="sm"
            boxShadow="lg"
            color="white"
            alignItems="center"
            align="center"
            bg="#046494"
          >
            <Icon as={MdOutlineCable} w={5} h={5} mr="10px" />
            <Text fontSize="xl" color="white">
              Cable TV Subscription
            </Text>
          </Flex>{" "}
          <Flex
            mt="3px"
            mx="30px"
            onClick={() => history.push("/utility")}
            px="30px"
            py="15px"
            rounded="sm"
            boxShadow="lg"
            align="center"
            bg="#046494"
            color="white"
            alignItems="center"
          >
            <Icon as={FaMoneyBillWave} w={5} h={5} mr="10px" />
            <Text fontSize="xl" color="white">
              Utility Bills Payment
            </Text>
          </Flex>{" "}
          <Flex
            mx="30px"
            mt="3px"
            onClick={() => history.push("/profile")}
            px="30px"
            py="15px"
            rounded="sm"
            boxShadow="lg"
            color="white"
            alignItems="center"
            align="center"
            bg="#046494"
          >
            <Icon as={CgProfile} w={5} h={5} mr="10px" />
            <Text fontSize="xl" color="white">
              Manage Profile
            </Text>
          </Flex>{" "}
          <Flex
            mx="30px"
            mt="3px"
            onClick={() => history.push("/transactions")}
            px="30px"
            py="15px"
            rounded="sm"
            boxShadow="lg"
            color="white"
            alignItems="center"
            align="center"
            bg="#046494"
            mb="11vh"
          >
            <Icon as={FaHistory} w={5} h={5} mr="10px" />
            <Text fontSize="xl" color="white">
              Transaction History
            </Text>
          </Flex>{" "}
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Menu;
