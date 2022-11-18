import {
  Flex,
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Collapse,
  scaleFadeConfig,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import GoogleButton from "../components/GoogleButton";
import FacebookButton from "../components/FacebookButton";
import PasswordCriteriaBox from "../components/PasswordCriteria";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  password: string;
  confirmPassword: string;
}

interface IPasswordCriteriaProps {
  label: string;
  isValid: boolean;
}

interface IPasswordCriteriasProps {
  [key: string]: IPasswordCriteriaProps;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isOpen, onToggle } = useDisclosure();
  const [passwordCriterias, setPasswordCriterias] =
    useState<IPasswordCriteriasProps>({
      hasDigit: {
        label: "Has at least one digit",
        isValid: false,
      },
      hasLower: {
        label: "Has at least one lower case",
        isValid: false,
      },
      hasUpper: {
        label: "Has at least one upper case",
        isValid: false,
      },
      hasSpecial: {
        label: "Has at least one special character",
        isValid: false,
      },
      minLength: {
        label: "Has at least 8 characters",
        isValid: false,
      },
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const validatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const hasDigit = /(?=.*[0-9])/.test(password);
    const hasLower = /(?=.*[a-z])/.test(password);
    const hasUpper = /(?=.*[A-Z])/.test(password);
    const hasSpecial = /(?=.*[!@#$%^&*)(+=._-])/.test(password);
    const minLength = password.length >= 8;

    setPasswordCriterias((prevState) => ({
      hasDigit: {
        label: prevState.hasDigit.label,
        isValid: hasDigit,
      },
      hasLower: {
        label: prevState.hasLower.label,
        isValid: hasLower,
      },
      hasUpper: {
        label: prevState.hasUpper.label,
        isValid: hasUpper,
      },
      hasSpecial: {
        label: prevState.hasSpecial.label,
        isValid: hasSpecial,
      },
      minLength: {
        label: prevState.minLength.label,
        isValid: minLength,
      },
    }));
  };

  return (
    <>
      {/* <Header /> */}
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} w={"lg"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>

                <FormControl isInvalid={Boolean(errors.password)} isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Please enter password",
                        minLength: 8,
                        validate: {
                          hasDigit: (value) =>
                            value && /(?=.*[0-9])/.test(value),
                          hasLowerCase: (value) =>
                            value && /(?=.*[a-z])/.test(value),
                          hasUpperCase: (value) =>
                            value && /(?=.*[A-Z])/.test(value),
                          hasSpecialCase: (value) =>
                            value && /(?=.*[!@#$%^&*)(+=._-])/.test(value),
                        },
                        onChange: validatePassword,
                        onBlur: onToggle,
                      })}
                      onFocus={onToggle}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    <Text>
                      {errors.password &&
                        "Password must meet complexity requirements"}
                    </Text>
                  </FormErrorMessage>
                </FormControl>
                <Collapse
                  in={isOpen || Boolean(errors.password)}
                  animateOpacity
                >
                  <PasswordCriteriaBox {...passwordCriterias} />
                </Collapse>

                <FormControl
                  isInvalid={Boolean(errors.confirmPassword)}
                  isRequired
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (val: string) => {
                        // return "Your passwords do no match";
                        if (watch("password") !== val) {
                          return "Your passwords do no match";
                        }
                      },
                    })}
                  />
                  <FormErrorMessage>
                    <Text>
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </Text>
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={12} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    // isActive={!isConfirmPasswordValid}
                    // isDisabled={!isConfirmPasswordValid}
                  >
                    Sign up
                  </Button>
                </Stack>
                <VStack pt={6} spacing={3}>
                  <Text align={"center"}>
                    Already a user? <Link color={"blue.400"}>Login</Link>
                  </Text>
                  <GoogleButton />
                  <FacebookButton />
                </VStack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignUp;
