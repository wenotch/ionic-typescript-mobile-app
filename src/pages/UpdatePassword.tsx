import { IonContent, IonPage, IonRouterLink } from "@ionic/react";
import React from "react";
import { useEffect, useState } from "react";
import { Box, Text, HStack, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  fetchBills,
  fetchUser,
  updateProfile,
} from "../Redux/actions/action";
import { Field, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import {
  Input,
  InputGroup, 
  InputRightElement,
} from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { setupMaster } from "cluster";

const UpdatePassword: React.FC = () => {
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
      setcurrentUser(state.user[0].owner);
    }
  });
  const [disableed, setdisableed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
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
              Change Password
            </Text>
            {currentUser.length === 0 ? (
              "loading"
            ) : (
              <Formik
                initialValues={{}}
                onSubmit={async (values: any, actions) => {
                  await dispatch(changePassword(values));
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="oldPassword" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={
                            form.errors.oldPassword && form.touched.oldPassword
                          }
                        >
                          <FormLabel htmlFor="oldPassword" color="#2D5363">
                            Current Password
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              {...field}
                              bg="#D5D5D5"
                              id="oldPassword"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder=" Enter Current Password"
                              isDisabled={disableed}
                              type={showPassword ? "text" : "password"}
                              rounded="md"
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleShowClick}
                                color="#046494"
                              >
                                {showPassword ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.oldPassword}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="newPassword" validate={validateFields}>
                      {({ field, form }: any) => (
                        <FormControl
                          mt="20px"
                          isInvalid={
                            form.errors.newPassword && form.touched.newPassword
                          }
                        >
                          <FormLabel htmlFor="oldPassword" color="#2D5363">
                            Current Password
                          </FormLabel>

                          <InputGroup size="md">
                            <Input
                              {...field}
                              bg="#D5D5D5"
                              id="newPassword"
                              pr="4.5rem"
                              _placeholder={{ color: "#2D5363" }}
                              placeholder=" Enter New Password"
                              isDisabled={disableed}
                              type={showPassword ? "text" : "password"}
                              rounded="md"
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleShowClick}
                                color="#046494"
                              >
                                {showPassword ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.newPassword}
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
                        Change Password
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

export default UpdatePassword;
