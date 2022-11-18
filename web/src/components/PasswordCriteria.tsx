import { VStack, List, ListItem, ListIcon, Box } from "@chakra-ui/react";
import { CheckCircle, XCircle } from "phosphor-react";

interface IPasswordCriteriaProps {
  label: string;
  isValid: boolean;
}

interface IPasswordCriteriasProps {
  [key: string]: IPasswordCriteriaProps;
}

const PasswordCriteria = ({ label, isValid }: IPasswordCriteriaProps) => {
  return (
    <ListItem>
      <ListIcon
        as={isValid ? CheckCircle : XCircle}
        color={isValid ? "green.500" : "red.500"}
      />
      {label}
    </ListItem>
  );
};

const PasswordCriteriaBox = (passwordCriterias: IPasswordCriteriasProps) => {
  // console.log(passwordCriterias);
  return (
    <Box rounded={"lg"} bg="white" p={3} border="1px" borderColor="gray.200">
      <VStack align={"flex-start"} textAlign="start">
        <List>
          {Object.entries(passwordCriterias).map(([key, value]) => {
            return (
              <PasswordCriteria
                key={key}
                label={passwordCriterias[key].label}
                isValid={passwordCriterias[key].isValid}
              />
            );
          })}
        </List>
      </VStack>
    </Box>
  );
};

export default PasswordCriteriaBox;
