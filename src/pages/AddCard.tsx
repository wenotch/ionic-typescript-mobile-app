import { useHistory } from "react-router-dom";

import { IonContent, IonPage, IonRouterLink } from "@ionic/react";
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
import toast from "react-hot-toast";

const AddCard: React.FC = () => {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const [currentUser, setcurrentUser] = useState<any>("");
  const [transactionRef, setTransactionRef] = useState<any>("");
  const config = {
    reference: transactionRef,
    email: currentUser.email,
    amount: 1000,
    publicKey: "pk_test_51b24491eaded6c9ffd741ba3dfd0960f6d0e8c2",
  };
  const initializePayment = usePaystackPayment(config);
  useEffect(() => {
    if (state.user.length !== 0) {
      setcurrentUser(state.user[0].owner);
    }
  });
  useEffect(() => {
    const options: any = {
      url: "https://paygo.gitit-tech.com/debit-card/verification",
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
        setTransactionRef(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSuccess = (reference: any) => {
    toast.success("Card verified. Proceed to selecting card");
    history.push("/with-card");
    console.log(reference);
  };
  const onClose = () => {
    toast.error("Payment Cancelled");
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="white">
          <Navbar />
          <Box px="30px" mt="15px" pb="11vh">
            {" "}
            <Box px="0" mb="10px" pb="5px" display="inline-block">
              <IonRouterLink routerDirection="back" routerLink="/with-card">
                <Box p="5px" fontSize="lg">
                  Back
                </Box>
              </IonRouterLink>
            </Box>
            <Text fontWeight="medium" fontSize="lg" textAlign="center">
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
                onClick={() => initializePayment(onSuccess, onClose)}
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
