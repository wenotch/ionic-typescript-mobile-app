import { useHistory } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useEffect, useState } from "react";
import { Box, Text, Select } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/actions/action";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { usePaystackPayment } from "react-paystack";

const AddCard: React.FC = () => {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  
  const [currentUser, setcurrentUser] = useState<any>("");
  const [transactionRef, setTransactionRef] = useState<any>("");
  const config = {
    reference: transactionRef,
    email: currentUser.email,
    amount: 10,
    publicKey: "",
  };
  const initializePayment = usePaystackPayment(config);
  useEffect(() => {
    if (state.user.length !== 0) {
      setcurrentUser(state.user[0].owner);
    }
  });
  useEffect(() => {
    const options: any = {
      url: "hsttps://paygo.gitit-tech.com/debit-card/verification",
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: window.localStorage.getItem("accessToken"),
      },
    };

    axios(options)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const history = useHistory();
  const onSuccess = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  }; // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="white">
          <Navbar />
          <Box px="30px" mt="15px" pb="11vh">
            <Text fontWeight="medium" fontSize="lg">
              Add new Card
            </Text>
            <Text textAlign="center" my="15px">
              You will be charged N10 to verify your card but this would be
              credited to your wallet.
            </Text>
            <Box textAlign="center" w="full">
              <Button
                mt={4}
                colorScheme="blue"
                bg="#046494"
                type="submit"
                size="md"
                color="white"
                fontWeight="medium"
                rounded="sm"
                justify="center"
                align="center"
                py="0px"
                px="30px"
              >
                Proceed
              </Button>
            </Box>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default AddCard;
