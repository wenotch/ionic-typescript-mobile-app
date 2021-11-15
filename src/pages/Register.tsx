import { Image } from "@chakra-ui/image";
import { useHistory } from "react-router-dom";

import { IonButton, IonContent, IonLabel, IonPage } from "@ionic/react";
import React from "react";
import logo from "../images/paygo.png";
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/actions/action";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register: React.FC = () => {
  //init useDispatch
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const isLoading = state.isLoading;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  const history = useHistory();

  const [userData, setuserData] = useState({
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (e: any) => {
    setuserData((prevState: any) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  //error message on form
  const [errorMessage, setErrorMessage] = useState({ value: "" });

  //handles submitting the form
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(userData);
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.phone === "" ||
      userData.firstName === "" ||
      userData.lastName === ""
    ) {
      setErrorMessage((prevState) => ({
        value: "Ops! all  fields are required",
      }));
    } else {
      dispatch({
        type: "LOADING",
      });
      dispatch({
        type: "REGISTER",
        payload: userData,
      });
      dispatch(register(userData));
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" minH="100vh" bg="blue">
          <Flex
            flexDirection="column"
            width="100wh"
            minHeight="100vh"
            backgroundColor="#046494"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Image src={`${logo}`} width="40%" mx="auto" pt="40px" />

              <Box minW={{ base: "90%", md: "468px" }}>
                <form>
                  <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                    rounded="md"
                    pb="50px"
                    pt="40px"
                  >
                    <Heading color="#046494" fontWeight="medium" mb="10px">
                      Registration
                    </Heading>
                    <FormControl>
                      <InputGroup variant="filled">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CFaUserAlt color="#046494" />}
                        />
                        <Input
                          type="text"
                          name="firstName"
                          onChange={(e) => handleInputChange(e)}
                          maxLength={15}
                          placeholder="First Name"
                          _placeholder={{ color: "#046494" }}
                          bg="gray.300"
                          rounded="md"
                        />
                      </InputGroup>
                    </FormControl>{" "}
                    <FormControl>
                      <InputGroup variant="filled">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CFaUserAlt color="#046494" />}
                        />
                        <Input
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          onChange={(e) => handleInputChange(e)}
                          _placeholder={{ color: "#046494" }}
                          bg="gray.300"
                          rounded="md"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup variant="filled">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CFaUserAlt color="#046494" />}
                        />
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          name="phone"
                          onChange={(e) => handleInputChange(e)}
                          _placeholder={{ color: "#046494" }}
                          bg="gray.300"
                          rounded="md"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup variant="filled">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CFaUserAlt color="#046494" />}
                        />
                        <Input
                          type="number"
                          placeholder="Bvn"
                          name="bvn"
                          onChange={(e) => handleInputChange(e)}
                          _placeholder={{ color: "#046494" }}
                          bg="gray.300"
                          rounded="md"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup variant="filled">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CFaUserAlt color="#046494" />}
                        />
                        <Input
                          type="email"
                          name="email"
                          onChange={(e) => handleInputChange(e)}
                          placeholder="Email address"
                          _placeholder={{ color: "#046494" }}
                          bg="gray.300"
                          rounded="md"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="#046494"
                          children={<CFaLock color="#046494" />}
                        />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          _placeholder={{ color: "#046494" }}
                          name="password"
                          onChange={(e) => handleInputChange(e)}
                          bg="gray.300"
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
                    </FormControl>
                    <Button
                      isLoading={isLoading}
                      _hover={{ bg: "#046494" }}
                      onClick={handleSubmit}
                      borderRadius={0}
                      variant="solid"
                      bg="#046494"
                      color="white"
                      width="full"
                    >
                      Next
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Stack>
            <Box>
              <IonButton
                routerDirection="back"
                fill="clear"
                routerLink="/login"
              >
                <IonLabel>
                  <Link color="white">Already registered? Login</Link>
                </IonLabel>
              </IonButton>
            </Box>
          </Flex>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Register;
