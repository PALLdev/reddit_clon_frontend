import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <>
      <NavBar />
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          onSubmit={async (valores, { setErrors }) => {
            const response = await register({ options: valores }); // response me permite acceder a todos los datos de mi register mutation
            if (response.data?.register.errors) {
              // handling errors (Optional chain(?): retorna undefined si no existe data)
              // [{field: "username", message: "existe un error"}] // asi vienen mis errores desde graphql (array de objetos)
              // setErrors({  // asi maneja los errores formik (un objeto)
              //   username: "Hay un error en el username"
              // })
              setErrors(toErrorMap(response.data.register.errors)); // util que transforma array de errores en un objeto
            } else if (response.data?.register.user) {
              // onsubmit worked, redirecciono al home
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="email"
                placeholder="Correo electronico"
                label="Correo electronico"
              />
              <Box mt={3}>
                <InputField
                  name="username"
                  label="Nombre de usuario"
                  placeholder="Nombre de usuario"
                />
              </Box>
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
                  colorScheme="pink"
                  isLoading={isSubmitting}
                >
                  Registrarme
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
