import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/inputField";
import { Box, Button } from "@chakra-ui/react";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(valores) => {
          console.log(valores);
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
