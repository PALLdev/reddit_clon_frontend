import { ChakraProvider } from "@chakra-ui/react";
import { Provider, createClient } from "urql";
import theme from "../theme";
import { AppProps } from "next/app";

const client = createClient({
  // inicializando client urql on our server
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    // send a cookie to be used when we register, or when we login
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
