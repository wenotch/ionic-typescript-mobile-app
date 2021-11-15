import { Image } from "@chakra-ui/image";
// import { Box } from "@chakra-ui/layout";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React from "react";
import logo from "../images/paygo.png";
import { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../Redux/actions/action";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const ForgotPassword: React.FC = () => {
  //getting complete state from redux
  const state = useSelector((state: any) => state);
  const isLoading = state.isLoading;
  const [userData, setuserData] = useState({
    email: "",
  });

  const handleInputChange = (e: any) => {
    setuserData((prevState: any) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [errorMessage, setErrorMessage] = useState({ value: "" });

  //init useDispatch
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (userData.email === "") {
      setErrorMessage((prevState) => ({
        value: "Ops! all fields are required",
      }));
    } else {
      dispatch({
        type: "LOADING",
      });
      dispatch({
        type: "REGISTER",
        payload: userData,
      });
      dispatch(forgotPassword(userData));
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="blue">
          <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
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
                    <Heading w="full" color="#046494" fontWeight="medium">
                      Forgotten Password{" "}
                    </Heading>

                    <FormControl>
                      <InputGroup variant="filled">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CFaUserAlt color="#046494" />}
                        />
                        <Input
                          type="email"
                          name="email"
                          onChange={handleInputChange}
                          placeholder="Email address"
                          _placeholder={{ color: "#046494" }}
                          bg="gray.300"
                          rounded="md"
                        />
                      </InputGroup>
                    </FormControl>

                    <Button
                      borderRadius={0}
                      isLoading={isLoading}
                      _hover={{ bg: "blue.500" }}
                      onClick={handleSubmit}
                      variant="solid"
                      bg="#046494"
                      color="white"
                      width="full"
                    >
                      Request Token
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
                  <Link color="white">Back to Login</Link>
                </IonLabel>
              </IonButton>
            </Box>
          </Flex>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
