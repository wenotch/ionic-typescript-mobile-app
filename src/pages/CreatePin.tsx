import Icon from "@chakra-ui/icon";
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
  setPin,
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
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { setupMaster } from "cluster";

const CreatePin: React.FC = () => {
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
            <IonRouterLink routerDirection="back" routerLink="/profile">
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
              Set Transaction Pin
            </Text>
            {currentUser.length === 0 ? (
              "loading"
            ) : (
              <Formik
                initialValues={{}}
                onSubmit={async (values: any, actions) => {
                  dispatch(setPin(values));
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    {currentUser.pin === null ? (
                      <Field name="pin" validate={validateFields}>
                        {({ field, form }: any) => (
                          <FormControl
                            mt="20px"
                            isInvalid={form.errors.pin && form.touched.pin}
                          >
                            <FormLabel htmlFor="pin" color="#2D5363">
                              Choose Pin
                            </FormLabel>

                            <InputGroup size="md">
                              <Input
                                {...field}
                                bg="#D5D5D5"
                                maxLength={4}
                                id="pin"
                                pr="4.5rem"
                                _placeholder={{ color: "#2D5363" }}
                                placeholder=" Set a 4 digit Pin"
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
                              {form.errors.pin}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    ) : (
                      <>
                        <Field name="oldPin" validate={validateFields}>
                          {({ field, form }: any) => (
                            <FormControl
                              mt="20px"
                              isInvalid={
                                form.errors.oldPin && form.touched.oldPin
                              }
                            >
                              <FormLabel htmlFor="pin" color="#2D5363">
                                Old Pin
                              </FormLabel>

                              <InputGroup size="md">
                                <Input
                                  {...field}
                                  bg="#D5D5D5"
                                  maxLength={4}
                                  id="oldPin"
                                  pr="4.5rem"
                                  _placeholder={{ color: "#2D5363" }}
                                  placeholder="Enter old Pin"
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
                                {form.errors.oldPin}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="pin" validate={validateFields}>
                          {({ field, form }: any) => (
                            <FormControl
                              mt="20px"
                              isInvalid={form.errors.pin && form.touched.pin}
                            >
                              <FormLabel htmlFor="pin" color="#2D5363">
                                Choose Pin
                              </FormLabel>

                              <InputGroup size="md">
                                <Input
                                  {...field}
                                  bg="#D5D5D5"
                                  maxLength={4}
                                  id="pin"
                                  pr="4.5rem"
                                  _placeholder={{ color: "#2D5363" }}
                                  placeholder=" Set a 4 digit Pin"
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
                                {form.errors.pin}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </>
                    )}

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
                        disabled={!props.isValid}
                        px="30px"
                      >
                        Set Pin
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

export default CreatePin;
