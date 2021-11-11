import { useHistory } from "react-router-dom";
import Icon from "@chakra-ui/icon";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import QuickLinks from "../components/QuickLinks";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/actions/action";
import AvailableCards from "../components/AvailaibleCard";
const AddMoney: React.FC = () => {
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
              Add Money
            </Text>

            <Text>Available Cards</Text>
            <AvailableCards
              details="44508130270190"
              provider="Master Card"
              transactionId="556456848"
            />
            <AvailableCards
              details="44508130270190"
              provider="Master Card"
              transactionId="556456848"
            />

            <Text textAlign="center" mt="30px">
              or
            </Text>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default AddMoney;
