import { useHistory } from "react-router-dom";
import Icon from "@chakra-ui/icon";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import QuickLinks from "../components/QuickLinks";
import { useDispatch, useSelector } from "react-redux";
import { GiWallet } from "react-icons/gi";
import { fetchUser } from "../Redux/actions/action";
import Transactions from "../components/Transactions";
const Dashboard: React.FC = () => {
  const state = useSelector((state: any) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="white">
          <Navbar />

          <Box bg="#046494" mx="30px" px="50px" py="30px" rounded="lg">
            <Icon as={GiWallet} w={8} h={8} color="#fff" mb="2px" />
            <Text fontWeight="normal" color="white" fontSize="14px">
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
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
