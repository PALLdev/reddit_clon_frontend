import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          // se ejecuta cuando haga un logout mutation (osea un user cierre sesion), actualizara el ME query a null
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          // se ejecuta cuando haga un login mutation (osea se logee un user), va a actualizar el cache (especificamente actualizara Me Query)
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
          // se ejecuta cuando haga un register mutation (osea se registre un user), va a actualizar el cache (especificamente actualizara Me Query)
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
    ssrExchange,
    fetchExchange,
  ],
});
