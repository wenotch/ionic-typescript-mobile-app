import { Image } from "@chakra-ui/image";
// import { Box } from "@chakra-ui/layout";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import logo from "../images/paygo.png";
import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import {
  changePassword,
  forgotPassword,
  resetPassword,
  resetPasswordTwo,
  verifyEmail,
} from "../Redux/actions/action";

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
  HStack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const ResetPasswordVerification: React.FC = () => {
  const state = useSelector((state: any) => state);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleShowClick = () => setShowPassword(!showPassword);
  const [isBuying, setisBuying] = useState(false);
  const [value, setValue] = useState("");
  const [userData, setuserData] = useState({
    newPassword: "",
  });

  const handleInputChange = (e: any) => {
    setuserData((prevState: any) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
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
            <Flex
              direction="column"
              justify="center"
              mt="50%"
              transform="translateY(-50%)"
              mx="auto"
            >
              {" "}
              <Text color="white" fontSize="16px" textAlign="center" p="30px">
                A verification code has been sent to your email. Please enter
              </Text>
              <HStack justify="center" mt="20px">
                <PinInput
                  colorScheme="white"
                  onChange={(e: any) => {
                    setValue(e);
                  }}
                  onComplete={(e: any) => {
                    setValue(e);
                  }}
                >
                  <PinInputField bg="white" />
                  <PinInputField bg="white" />
                  <PinInputField bg="white" />
                  <PinInputField bg="white" />
                  <PinInputField bg="white" />
                </PinInput>
              </HStack>
              <FormControl py="15px" px="30px" w="100%">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="#046494"
                    children={<CFaLock color="#046494" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    _placeholder={{ color: "#046494" }}
                    name="newPassword"
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
              <Box textAlign="center" w="full">
                <Button
                  isLoading={state.isLoading}
                  mt={6}
                  colorScheme="blue"
                  bg="white"
                  size="md"
                  color="#046494"
                  fontWeight="medium"
                  rounded="sm"
                  justify="center"
                  align="center"
                  py="0px"
                  px="30px"
                  _hover={{
                    bg: "white",
                  }}
                  onClick={async () => {
                    dispatch({ type: "LOADING" });
                    dispatch(resetPasswordTwo({ code: value, ...userData }));
                  }}
                >
                  Next
                </Button>
              </Box>
              <Button
                color="white"
                onClick={() => {
                  console.log(state.newUser);
                  dispatch(forgotPassword(state.newUser));
                }}
                bg="transparent"
                _hover={{ bd: "transparent" }}
                mt="15px"
                w="80px"
                mx="auto"
              >
                Resend
              </Button>
            </Flex>
          </Flex>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default ResetPasswordVerification;
