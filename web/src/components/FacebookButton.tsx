import { FaFacebook } from "react-icons/fa";
import { Button, Center, Text } from "@chakra-ui/react";
import React from "react";

export default function FacebookButton() {
  return (
    <Button
      w={"full"}
      maxW={"md"}
      colorScheme={"facebook"}
      leftIcon={<FaFacebook />}
    >
      <Center>
        <Text>Continue with Facebook</Text>
      </Center>
    </Button>
  );
}
