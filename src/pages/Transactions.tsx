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
const TransactionPage: React.FC = () => {
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

          <Box px="30px" mt="15px" pb="11vh">
            <Text fontWeight="medium" fontSize="lg">
              Transaction History
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

export default TransactionPage;
