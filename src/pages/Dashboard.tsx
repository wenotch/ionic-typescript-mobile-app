import { Image } from "@chakra-ui/image";
import { useHistory } from "react-router-dom";
import Icon from "@chakra-ui/icon";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import logo from "../images/paygo.png";
import { useState, useEffect } from "react";
import { chakra, Box, Text } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import QuickLinks from "../components/QuickLinks";
import { useDispatch, useSelector } from "react-redux";
import { GiWallet } from "react-icons/gi";
import { fetchUser } from "../Redux/actions/action";
import Transactions from "../components/Transactions";
import BottomNav from "../components/BottomNav";
const Dashboard: React.FC = () => {
  const state = useSelector((state: any) => state);
  console.log(state.user.balance);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="white">
          <Navbar />
          <Text
            px="30px"
            fontWeight="normal"
            color="#046494"
            fontSize="14px"
            mt="5px"
          >
            {/* Wallet ID {state.user.phoneNumber} 08130270190 */}
          </Text>
          <Box bg="#046494" mx="30px" px="50px" py="30px" rounded="lg">
            <Icon as={GiWallet} w={8} h={8} color="#fff" mb="2px" />
            <Text cfontWeight="normal" color="white" fontSize="14px">
              Wallet Balance
            </Text>
            <Text color="#E7BF00" fontWeight="semibold" fontSize="2xl">
              {" "}
              N{state.user.length === 0 ? "loading" : state.user[0].balance}
            </Text>
          </Box>

          <QuickLinks />

          <Box px="30px" mt="15px" pb="11vh">
            <Text fontWeight="medium" fontSize="lg">
              Recent transactions
            </Text>
            <Transactions
              details="you sent airtime to 08130270190"
              type="debit"
              amount={2000}
              transactionId="556456848"
            />{" "}
            <Transactions
              details="you sent airtime to 08130270190"
              type="debit"
              amount={2000}
              transactionId="556456848"
            />
          </Box>

          <BottomNav />
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
