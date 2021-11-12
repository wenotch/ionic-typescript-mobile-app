import { useHistory } from "react-router-dom";
import Icon from "@chakra-ui/icon";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useEffect } from "react";
import { Box, Text, Button, Flex, Avatar } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import QuickLinks from "../components/QuickLinks";
import { useDispatch, useSelector } from "react-redux";
import { GiWallet } from "react-icons/gi";
import { fetchUser } from "../Redux/actions/action";

const Profile: React.FC = () => {
  const history = useHistory();
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="white">
          <Navbar />

          <Box px="30px" mt="15px" pb="11vh">
            <Flex justify="space-between" alignItems="center">
              {" "}
              <Text fontWeight="medium" fontSize="lg">
                Profile
              </Text>
              <Button
                colorScheme="red"
                bg="red"
                color="white"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  history.push("/login");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </Flex>
            <Box
              w="full"
              bg="#046494"
              px="30px"
              py="20px"
              pt="30px"
              rounded="md"
              mt="15px"
              textAlign="center"
            >
              <Avatar src="https://bit.ly/broken-link" />
              <Text color="white" mt="10px">
                {state.user[0].owner.firstName +
                  " " +
                  state.user[0].owner.lastName}
              </Text>
            </Box>
            <Flex
              rounded="md"
              boxShadow="lg"
              mt="10px"
              justify="left"
              align="center"
            >
              <Box w="full" textAlign="left">
                <Button
                  onClick={() => {
                    history.push("/update-profile");
                  }}
                  w="full"
                  px="30px"
                  py="30px"
                  colorScheme="whiteAlpha"
                  justifyContent="left"
                  fontWeight="normal"
                  color="black"
                >
                  Update Profile
                </Button>
              </Box>
            </Flex>{" "}
            <Flex
              rounded="md"
              boxShadow="lg"
              mt="10px"
              justify="left"
              align="center"
            >
              <Box w="full" textAlign="left">
                <Button
                  onClick={() => {
                    history.push("/change-pin");
                  }}
                  w="full"
                  px="30px"
                  py="30px"
                  colorScheme="whiteAlpha"
                  justifyContent="left"
                  fontWeight="normal"
                  color="black"
                >
                  Change Pin
                </Button>
              </Box>
            </Flex>{" "}
            <Flex
              rounded="md"
              boxShadow="lg"
              mt="10px"
              justify="left"
              align="center"
            >
              <Box w="full" textAlign="left">
                <Button
                  onClick={() => {
                    history.push("/change-password");
                  }}
                  w="full"
                  px="30px"
                  py="30px"
                  color="black"
                  colorScheme="whiteAlpha"
                  justifyContent="left"
                  fontWeight="normal"
                >
                  Change Password
                </Button>
              </Box>
            </Flex>{" "}
            <Flex
              rounded="md"
              boxShadow="lg"
              mt="10px"
              justify="left"
              align="center"
            >
              <Box w="full" textAlign="left">
                <Button
                  onClick={() => {
                    history.push("/agent");
                  }}
                  w="full"
                  px="30px"
                  py="30px"
                  colorScheme="whiteAlpha"
                  justifyContent="left"
                  color="#046494"
                  fontWeight="semibold"
                >
                  Agent Dashboard
                </Button>
              </Box>
            </Flex>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
