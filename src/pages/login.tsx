import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (valores, { setErrors }) => {
          const response = await login({ options: valores }); // response me permite acceder a todos los datos de mi mutation
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors)); // util que transforma array de errores en un objeto
          } else if (response.data?.login.user) {
            // onsubmit worked, redirecciono al home
            router.push("/");
          }
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
              <Button
                type="submit"
                colorScheme="green"
                isLoading={isSubmitting}
              >
                Ingresar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
