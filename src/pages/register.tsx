import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";

interface registerProps {}

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
  register(options: {username:$username, password:$password}) {
    user{
      id
      username
      createdAt
    }
    errors{
      field
      message
    }
  }
}
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(valores) => {
          return register(valores);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="Nombre de usuario"
              label="Nombre de usuario"
            />
            <Box mt={3}>
              <InputField
                name="password"
                label="Clave de acceso"
                placeholder="Clave"
                type="password"
              />
            </Box>
            <Box padding={4} textAlign="center">
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Registrarme
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
