import { Image } from "@chakra-ui/image";
import { useHistory } from "react-router-dom";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React from "react";
import logo from "../images/paygo.png";
import { useState } from "react";
import { chakra, Box, Text } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import QuickLinks from "../components/QuickLinks";
import { useSelector } from "react-redux";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const state = useSelector((state: any) => state);

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
            Wallet ID {state.user.phoneNumber} 08130270190
          </Text>
          <Box bg="#046494" mx="30px" px="50px" py="30px" rounded="lg">
            <Text cfontWeight="normal" color="white" fontSize="14px">
              Wallet Balance
            </Text>
            <Text color="#E7BF00" fontWeight="semibold" fontSize="2xl">
              {" "}
              N2,000,000
            </Text>
          </Box>

          <QuickLinks />

          <Box px="30px" mt="15px">
            <Text fontWeight="medium" fontSize="lg">
              Transactions
            </Text>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
