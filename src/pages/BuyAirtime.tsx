import Icon from "@chakra-ui/icon";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { GiWallet } from "react-icons/gi";
import { fetchBills, fetchUser } from "../Redux/actions/action";
import { Field, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
const BuyAirtime: React.FC = () => {
  const state = useSelector((state: any) => state);

  console.log(state.bills);
  function validateNetwork(value: any) {
    let error;
    if (!value) {
      error = "Network is required";
    }
    return error;
  }

  function validatePhone(value: any) {
    let error;
    if (!value) {
      error = "Phone Number is required";
    } else if (value < 0) {
      error = "Not a valid phone number";
    }
    return error;
  }
  function validateAmount(value: any) {
    let error;
    if (!value) {
      error = "Amount is required";
    }
    // else if (state.user.length !== 0 && value > state.user[0].balance) {
    //   error = "You do not have that amount in your wallet";
    // }
    return error;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBills());
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

          <Box w={{ base: "100%", md: "468px" }} bg="white" mt="50px" px="30px">
            <Text
              textAlign="center"
              fontWeight="semibold"
              color="#046494"
              mb="10px"
              fontSize="xl"
            >
              Buy Airtime
            </Text>
            <Formik
              initialValues={{}}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="network" validate={validateNetwork}>
                    {({ field, form }: any) => (
                      <FormControl
                        mt="20px"
                        isInvalid={form.errors.network && form.touched.network}
                      >
                        <FormLabel htmlFor="network" color="#2D5363">
                          {" "}
                          Network{" "}
                        </FormLabel>
                        <Input
                          bg="#D5D5D5"
                          _placeholder={{ color: "#2D5363" }}
                          {...field}
                          id="network"
                          placeholder="Select Network"
                          type="text"
                        />
                        <FormErrorMessage>
                          {form.errors.network}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="phone" validate={validatePhone}>
                    {({ field, form }: any) => (
                      <FormControl
                        mt="20px"
                        isInvalid={form.errors.phone && form.touched.phone}
                      >
                        <FormLabel htmlFor="phone" color="#2D5363">
                          {" "}
                          Phone Number{" "}
                        </FormLabel>

                        <InputGroup size="md">
                          <Input
                            bg="#D5D5D5"
                            {...field}
                            id="phone"
                            pr="4.5rem"
                            type={"number"}
                            placeholder="Enter phone number"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="amount" validate={validateAmount}>
                    {({ field, form }: any) => (
                      <FormControl
                        mt="20px"
                        isInvalid={form.errors.amount && form.touched.amount}
                      >
                        <FormLabel htmlFor="amount" color="#2D5363">
                          {" "}
                          Amount{" "}
                        </FormLabel>

                        <InputGroup size="md">
                          <Input
                            bg="#D5D5D5"
                            {...field}
                            id="amount"
                            pr="4.5rem"
                            type={"number"}
                            placeholder="Enter amount"
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.amount}
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

export default BuyAirtime;
