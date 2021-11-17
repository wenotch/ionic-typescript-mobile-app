import { useHistory } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Button, ButtonGroup } from "@chakra-ui/button";

const AddMoneyMethod: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box width="100%" h="100vh" bg="white">
          <Navbar />
          <Box px="30px" mt="15px" pb="11vh">
            <Text fontWeight="medium" fontSize="lg">
              Select Payment Method
            </Text>
            <ButtonGroup spacing={2}>
              <Button
                mt={4}
                colorScheme="blue"
                bg="#046494"
                onClick={() => {
                  history.push("/from-bank");
                }}
                size="md"
                color="white"
                fontWeight="medium"
                rounded="sm"
                justify="center"
                align="center"
                py="0px"
                px="30px"
              >
                From Bank
              </Button>
              <Button
                onClick={() => {
                  history.push("/with-card");
                }}
                mt={4}
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
              >
                With Card
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default AddMoneyMethod;
