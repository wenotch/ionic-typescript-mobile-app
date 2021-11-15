import { Image } from "@chakra-ui/image";
// import { Box } from "@chakra-ui/layout";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import logo from "../images/paygo.png";
import { useState } from "react";
import { Flex, HStack, Text, Button, chakra, Box } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { verifyEmail } from "../Redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const EmailVerification: React.FC = () => {
  const state = useSelector((state: any) => state);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleShowClick = () => setShowPassword(!showPassword);
  const [isBuying, setisBuying] = useState(false);
  const [value, setValue] = useState("");
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
                {" "}
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
                  <PinInputField bg="white" />
                </PinInput>
              </HStack>
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

                    dispatch(verifyEmail(value));
                  }}
                >
                  Next
                </Button>
              </Box>
              <Button
                color="white"
                onClick={() => {}}
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

export default EmailVerification;
