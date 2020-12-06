import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import React from "react";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput, // primer parametro que recibe updatequery
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  // inicializando client urql on our server
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    // send a cookie to be used when we register, or when we login
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              // updater function
              (result, query) => {
                // si el result de mi login query es un error
                if (result.login.errors) {
                  return query; //return current query
                } else {
                  return {
                    // typesafe updating our Me query (is expecting an user)
                    me: result.login.user,
                  };
                }
              }
            );
          },
          // se ejecuta cuando haga un register mutation, va a actualizar el cache (especificamente actualizara Me Query)
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              // updater function
              (result, query) => {
                // si el result de mi login query es un error
                if (result.register.errors) {
                  return query; //return current query
                } else {
                  return {
                    // typesafe updating our Me query (is expecting an user)
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
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
