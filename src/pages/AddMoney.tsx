import { useHistory } from "react-router-dom";
import Icon from "@chakra-ui/icon";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useEffect, useState } from "react";
import { Box, Text, Select } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import QuickLinks from "../components/QuickLinks";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/actions/action";
import AvailableCards from "../components/AvailaibleCard";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import toast from "react-hot-toast";
const AddMoney: React.FC = () => {
  function validateFields(value: any) {
    let error;
    if (!value) {
      error = "This field is required";
    }
    return error;
  }
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const [disableed, setdisableed] = useState(false);
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="white">
          <Navbar />
          <Box px="30px" mt="15px" pb="11vh">
            <Text fontWeight="medium" fontSize="lg">
              Add Money With Card
            </Text>

            <Formik
              initialValues={{}}
              onSubmit={async (values: any, actions) => {
                if (values.method === "newCard") {
                  const getTransactionId: any = {
                    url: "https://paygo.gitit-tech.com/debit-card/verification",
                    method: "get",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json;charset=UTF-8",
                      authorization: window.localStorage.getItem("accessToken"),
                    },
                  };

                  const response = await axios(getTransactionId);

                  const transactionPay = {
                    ...values,
                    refNumber: response.data.id,
                  };
                  if (response.status === 201) {
                    // setdisableed(true);
                    console.log(transactionPay);
                    // toast.loading("waiting")

                  } else {
                    toast.error("Something went wrong");
                  }
                } else{
                  toast.success("User selected an already existing card")
                }
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="amount" validate={validateFields}>
                    {({ field, form }: any) => (
                      <FormControl
                        mt="20px"
                        isInvalid={form.errors.amount && form.touched.amound}
                      >
                        <FormLabel htmlFor="oldPassword" color="#2D5363">
                          Amount
                        </FormLabel>

                        <InputGroup size="md">
                          <Input
                            {...field}
                            bg="#D5D5D5"
                            id="amount"
                            pr="4.5rem"
                            _placeholder={{ color: "#2D5363" }}
                            placeholder="Enter Amount"
                            isDisabled={disableed}
                            type={"number"}
                            rounded="md"
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.amount}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>{" "}
                  <Field name="method" validate={validateFields}>
                    {({ field, form }: any) => (
                      <FormControl
                        mt="20px"
                        isInvalid={form.errors.method && form.touched.method}
                      >
                        <FormLabel htmlFor="method" color="#2D5363">
                          Select Card
                        </FormLabel>

                        <Select
                          {...field}
                          bg="#D5D5D5"
                          placeholder="Select card"
                        >
                          <option value="newCard">add a new card</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.method}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box textAlign="center" w="full">
                    <Button
                      mt={4}
                      colorScheme="blue"
                      bg="#046494"
                      isLoading={props.isSubmitting}
                      type="submit"
                      size="md"
                      color="white"
                      fontWeight="medium"
                      rounded="sm"
                      justify="center"
                      align="center"
                      py="0px"
                      disabled={disableed}
                      px="30px"
                    >
                      Next
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default AddMoney;
