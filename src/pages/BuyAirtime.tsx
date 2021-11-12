import Icon from "@chakra-ui/icon";
import { IonContent, IonPage, IonRouterLink } from "@ionic/react";
import React from "react";
import { useEffect, useState } from "react";
import { Box, Text, HStack, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { GiWallet } from "react-icons/gi";
import { fetchBills, fetchUser, payBills } from "../Redux/actions/action";
import { Field, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { Select } from "@chakra-ui/select";
import toast from "react-hot-toast";
import {
  ModalCloseButton,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { PinInput, PinInputField } from "@chakra-ui/pin-input"; 

const BuyAirtime: React.FC = () => {
  // all my states
  const state = useSelector((state: any) => state);
  //filters all possible by aitime providers from bills list in the redux store
  const bills = state.bills;
  var airtimeList: any = [];
  if (state.bills.length !== 0) {
    bills.map((item: any) => {
      if (item.item_code === "AT099" && item.country === "NG") {
        airtimeList.push(item);
      }
    });
  }

  // my form validations
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
    } else if (value < 100) {
      error = "Min amount is N100";
    }
    else if (state.user.length !== 0 && value > state.user[0].balance) {
      error = "You do not have that amount in your wallet";
    }
    return error;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchUser());
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  var [transactionValues, settransactionValues] = useState({});
  const handleSizeClick = () => {
    onOpen();
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="white">
          <Navbar />
          <Box px="30px" pb="5px" display="inline-block">
            <IonRouterLink routerDirection="back" routerLink="/dashboard">
              <Box p="5px" fontSize="lg">
                {" "}
                Back
              </Box>
            </IonRouterLink>
          </Box>
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
              onSubmit={async (values: any, actions) => {
                settransactionValues({});
                const data = airtimeList.filter((item: any) => {
                  return item.name === values.network;
                });
                settransactionValues({ ...data[0], ...values });
                const headers: any = {
                  Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
                  authorization: window.localStorage.getItem("accessToken"),
                };
                const response = await axios.get(
                  "https://paygo.gitit-tech.com/bills/" +
                    data[0].item_code +
                    "/" +
                    data[0].biller_code +
                    "/" +
                    values.phone,
                  {
                    headers: headers,
                  }
                );
                if (response.data.message === "Item validated successfully") {
                  onOpen();
                } else {
                  toast.error("something went ");
                }
                actions.setSubmitting(false);
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

                        <Select
                          // variant="filled"
                          {...field}
                          bg="#D5D5D5"
                          id="network"
                          placeholder="Select Network"
                          _placeholder={{ color: "#2D5363" }}
                          color="#2D5363"
                        >
                          {airtimeList.map((item: any) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </Select>
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
                            type={"tel"}
                            _placeholder={{ color: "#2D5363" }}
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
                            _placeholder={{ color: "#2D5363" }}
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
            <PinModal
              isOpen={isOpen}
              onClose={onClose}
              values={transactionValues}
            />
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default BuyAirtime;

// confirmation modal pin

function PinModal({ isOpen, onOpen, onClose, values }: any) {
  let transactValues = { ...values };
  const [isBuying, setisBuying] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader color="#046494" m="30px" py="10px" px="0">
            Confirm Airtime
          </ModalHeader>
          <ModalCloseButton color="#046494" fontSize="20px" p="10px" m="30px" />
          <ModalBody>
            <Flex
              direction="column"
              justify="center"
              mt="50%"
              transform="translateY(-50%)"
              mx="auto"
            >
              {" "}
              <Text color="grey" fontSize="16px">
                You are about to purchase an airtime of{" "}
                <Text
                  as="span"
                  fontSize="xl"
                  fontWeight="medium"
                  color="#046494"
                >
                  N{values.amount}
                </Text>{" "}
                for the phone number{" "}
                <Text
                  as="span"
                  fontSize="xl"
                  fontWeight="medium"
                  color="#046494"
                >
                  {values.phone}.
                </Text>
                Enter your Pin to confirm transaction
              </Text>
              <HStack justify="center" mt="20px">
                {" "}
                <PinInput
                  mask
                  colorScheme="white"
                  onChange={(e: any) => {
                    setValue(e);
                  }}
                  onComplete={(e: any) => {
                    setValue(e);
                  }}
                >
                  <PinInputField bg="grey" />
                  <PinInputField bg="grey" />
                  <PinInputField bg="grey" />
                  <PinInputField bg="grey" />
                </PinInput>
              </HStack>
              <Box textAlign="center" w="full">
                <Button
                  isLoading={isBuying}
                  mt={6}
                  colorScheme="blue"
                  bg="#046494"
                  size="md"
                  color="white"
                  fontWeight="medium"
                  rounded="sm"
                  justify="center"
                  align="center"
                  py="0px"
                  px="30px"
                  onClick={async () => {
                    setisBuying(true);
                    transactValues = { ...transactValues, pin: value };
                    console.log("sent request");
                    await dispatch(
                      payBills({ transactValues, type: "AIRTIME" })
                    );
                    setisBuying(false);
                  }}
                >
                  Next
                </Button>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
