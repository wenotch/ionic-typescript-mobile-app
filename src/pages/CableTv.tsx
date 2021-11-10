import Icon from "@chakra-ui/icon";
import { IonContent, IonItem, IonPage, IonRouterLink } from "@ionic/react";
import React from "react";
import { useEffect, useState } from "react";
import { Box, Text, HStack, Flex } from "@chakra-ui/react";
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

const CableTv: React.FC = () => {
  // all my states
  const state = useSelector((state: any) => state);
  const bills = state.bills;
  var cableList: any = [];

  // my form validations
  function validateProvider(value: any) {
    let error;
    if (!value) {
      error = "Network is required";
    } else if (value === "BIL122" && state.bills.length !== 0) {
      cableList = [];
      bills.map((item: any) => {
        if (
          (item.biller_code === "BIL122" && item.country === "NG") ||
          (item.biller_code === "BIL192" && item.country === "NG") ||
          (item.biller_code === "BIL201" && item.country === "NG") ||
          (item.biller_code === "BIL157" && item.country === "NG")
        ) {
          cableList.push(item);
        }
      });
    } else if (value === "BIL121" && state.bills.length !== 0) {
      cableList = [];
      bills.map((item: any) => {
        if (
          (item.biller_code === "BIL121" && item.country === "NG") ||
          (item.biller_code === "BIL200" && item.country === "NG") ||
          (item.biller_code === "BIL137" && item.country === "NG") ||
          (item.biller_code === "BIL156" && item.country === "NG")
        ) {
          cableList.push(item);
        }
      });
    } else if (value === "BIL123" && state.bills.length !== 0) {
      cableList = [];
      bills.map((item: any) => {
        if (
          (item.biller_code === "BIL123" && item.country === "NG") ||
          (item.biller_code === "BIL193" && item.country === "NG") ||
          (item.biller_code === "BIL160" && item.country === "NG") ||
          (item.biller_code === "BIL129" && item.country === "NG")
        ) {
          cableList.push(item);
        }
      });
    }

    console.log(cableList);
    return error;
  }
  function validateBundle(value: any) {
    let error;
    if (!value) {
      error = "Bundle is required";
    }
    return error;
  }
  function validateCardNumber(value: any) {
    let error;
    if (!value) {
      error = "Card Number is required";
    } else if (value < 0) {
      error = "Not a valid phone number";
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
              Cable Tv Subscription
            </Text>
            <Formik
              initialValues={{}}
              onSubmit={async (values: any, actions) => {
                settransactionValues({});
                const data = cableList.filter((item: any) => {
                  return item.name === values.bundle;
                });

                settransactionValues({ ...data[0], ...values });
                console.log(transactionValues);
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
                    values.cardNumber,
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
                  <Field name="network" validate={validateProvider}>
                    {({ field, form }: any) => (
                      <FormControl
                        mt="20px"
                        isInvalid={form.errors.network && form.touched.network}
                      >
                        <FormLabel htmlFor="network" color="#2D5363">
                          {" "}
                          Select Provider{" "}
                        </FormLabel>

                        <Select
                          disabled={state.bills.length === 0 ? true : false}
                          {...field}
                          bg="#D5D5D5"
                          id="network"
                          placeholder="Select Provider"
                          _placeholder={{ color: "#2D5363" }}
                          color="#2D5363"
                        >
                          {/* gotv 122,192,201 and 157
                            dstv 121,200,137 and 156 
                            
                            startime 160, 123 , 129, 193*/}
                          <option value="BIL122">GOTV</option>
                          <option value="BIL121">DSTV </option>
                          <option value="BIL123">STARTIMES</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.network}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="bundle" validate={validateBundle}>
                    {({ field, form }: any) => (
                      <FormControl
                        mt="20px"
                        isInvalid={form.errors.bundle && form.touched.bundle}
                      >
                        <FormLabel htmlFor="bundle" color="#2D5363">
                          {" "}
                          Plan{" "}
                        </FormLabel>

                        <Select
                          {...field}
                          bg="#D5D5D5"
                          id="bundle"
                          placeholder="Select Bundle"
                          _placeholder={{ color: "#2D5363" }}
                          color="#2D5363"
                        >
                          {cableList.map((item: any) => (
                            <option key={item.id} value={item.name}>
                              {"(N" + item.amount + ") " + item.name}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.network}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cardNumber" validate={validateCardNumber}>
                    {({ field, form }: any) => (
                      <FormControl
                        mt="20px"
                        isInvalid={
                          form.errors.cardNumber && form.touched.cardNumber
                        }
                      >
                        <FormLabel htmlFor="phone" color="#2D5363">
                          {" "}
                          Card Number{" "}
                        </FormLabel>

                        <InputGroup size="md">
                          <Input
                            bg="#D5D5D5"
                            {...field}
                            id="cardNumber"
                            pr="4.5rem"
                            type={"tel"}
                            _placeholder={{ color: "#2D5363" }}
                            placeholder="Enter Card number"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
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

export default CableTv;

// confirmation modal pin

function PinModal({ isOpen, onOpen, onClose, values }: any) {
  // console.log(values);
  // const [transactValues, settransactValues] = useState<any>({ ...values });
  let transactValues = { ...values };
  const [isBuying, setisBuying] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader color="#046494" m="30px" py="10px" px="0">
            Confirm Data Subscription
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
                You are about to purchase a{" "}
                <Text
                  as="span"
                  fontSize="xl"
                  fontWeight="medium"
                  color="#046494"
                >
                  {values.biller_name}
                </Text>{" "}
                worth{" "}
                <Text
                  as="span"
                  fontSize="xl"
                  fontWeight="medium"
                  color="#046494"
                >
                  N{values.amount}
                </Text>{" "}
                for the card number{" "}
                <Text
                  as="span"
                  fontSize="xl"
                  fontWeight="medium"
                  color="#046494"
                >
                  {values.cardNumber}.
                </Text>{" "}
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
                  isLoading={false}
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
                    const headers: any = {
                      Accept: "application/json",
                      "Content-Type": "application/json;charset=UTF-8",
                      authorization: window.localStorage.getItem("accessToken"),
                    };
                    const response = await axios.get(
                      "https://paygo.gitit-tech.com/bills/",
                      {
                        headers: headers,
                      }
                    );
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
