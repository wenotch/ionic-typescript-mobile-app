import Icon from "@chakra-ui/icon";
import { IonContent, IonPage, IonRouterLink } from "@ionic/react";
import React from "react";
import { useEffect, useState } from "react";
import { Box, Text, HStack, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills, fetchUser, updateProfile } from "../Redux/actions/action";
import { Field, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input, InputGroup } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { setupMaster } from "cluster";

const UpdateProfile: React.FC = () => {
  // all my states
  const state = useSelector((state: any) => state);

  // my form validations
  function validateFields(value: any) {
    let error;
    if (!value) {
      error = "This field is required";
    }
    return error;
  }

  const dispatch = useDispatch();
  const [currentUser, setcurrentUser] = useState<any>("");
  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchUser());
  }, []);
  useEffect(() => {
    if (state.user.length !== 0) {
      //   setdisableed(false);
      setcurrentUser(state.user[0].owner);
    }
  }); 

  const [disableed, setdisableed] = useState(false);

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
          <Box
            w={{ base: "100%", md: "468px" }}
            bg="white"
            mt="10px"
            px="30px"
            pb="11vh"
          >
            <Text
              textAlign="center"
              fontWeight="semibold"
              color="#046494"
              mb="10px"
              fontSize="xl"
            >
              Update Profile
            </Text>
            {currentUser.length === 0 ? (
              "loading"
            ) : (
              <Formik
                initialValues={{
                  firstName: currentUser.firstName,
                  lastName: currentUser.lastName,
                  address: currentUser.address,
                  city: currentUser.city,
                  state: currentUser.state,
                  nextOfKinName: currentUser.nextOfKinName,
                  nextOfKinPhone: currentUser.nextOfKinPhone,
                  nextOfKinAddress: currentUser.nextOfKinAddress,
                }}
                onSubmit={async (values: any, actions) => {
                  await dispatch(updateProfile(values));
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="firstName" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={
                            form.errors.firstName && form.touched.firstName
                          }
                        >
                          <FormLabel htmlFor="firstName" color="#2D5363">
                            {" "}
                            First Name{" "}
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              isDisabled={disableed}
                              bg="#D5D5D5"
                              {...field}
                              id="firstName"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder=" First Name"
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.firstName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lastName" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={
                            form.errors.lastName && form.touched.lastName
                          }
                        >
                          <FormLabel htmlFor="lastName" color="#2D5363">
                            {" "}
                            Last Name{" "}
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              isDisabled={disableed}
                              bg="#D5D5D5"
                              {...field}
                              id="lastName"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder="Last Name"
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.lastName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="address" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={
                            form.errors.address && form.touched.address
                          }
                        >
                          <FormLabel htmlFor="address" color="#2D5363">
                            {" "}
                            Address{" "}
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              bg="#D5D5D5"
                              isDisabled={disableed}
                              {...field}
                              id="address"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder="Address"
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.address}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="city" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={form.errors.city && form.touched.city}
                        >
                          <FormLabel htmlFor="city" color="#2D5363">
                            {" "}
                            City{" "}
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              bg="#D5D5D5"
                              isDisabled={disableed}
                              {...field}
                              id="city"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder="city"
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.city}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="state" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={form.errors.state && form.touched.state}
                        >
                          <FormLabel htmlFor="state" color="#2D5363">
                            {" "}
                            State{" "}
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              bg="#D5D5D5"
                              isDisabled={disableed}
                              {...field}
                              id="state"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder="state"
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.state}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="nextOfKinName" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={
                            form.errors.nextOfKinName &&
                            form.touched.nextOfKinName
                          }
                        >
                          <FormLabel htmlFor="nextOfKinName" color="#2D5363">
                            {" "}
                            Next of Kin{" "}
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              bg="#D5D5D5"
                              isDisabled={disableed}
                              {...field}
                              id="nextOfKinName"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder="Enter Name of Next Of Kin"
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.nextOfKinName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="nextOfKinAddress" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={
                            form.errors.nextOfKinAddress &&
                            form.touched.nextOfKinAddress
                          }
                        >
                          <FormLabel htmlFor="nextOfKinAddress" color="#2D5363">
                            {" "}
                            Next of Kin Address{" "}
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              bg="#D5D5D5"
                              isDisabled={disableed}
                              {...field}
                              id="nextOfKinAddress"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder="Address of Next of Kin"
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.nextOfKinAddress}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="nextOfKinPhone" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={
                            form.errors.nextOfKinPhone &&
                            form.touched.nextOfKinPhone
                          }
                        >
                          <FormLabel htmlFor="lastName" color="#2D5363">
                            {" "}
                            Next of Kin Phone Number{" "}
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              bg="#D5D5D5"
                              isDisabled={disableed}
                              {...field}
                              id="nextOfKinPhone"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder="Phone Number of Next of Kin"
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.nextOfKinPhone}
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
                        Update
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            )}
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default UpdateProfile;
