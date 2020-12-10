import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: LogoutFetching }, logout] = useLogoutMutation();
  let body = null;

  // data is loading
  if (fetching) {
    body = null;
  } else if (!data?.me) {
    // user is not logged in
    body = (
      <>
        <NextLink href={"/login"}>
          <Link mr={4}>Login</Link>
        </NextLink>
        <NextLink href={"/register"}>
          <Link mr={4}>Registro</Link>
        </NextLink>
      </>
    );
  } else {
    // user is logged in
    body = (
      <Flex>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout();
          }}
          variant="link"
          color={"slateblue"}
          mr={3}
          isLoading={LogoutFetching}
        >
          Cerrar sesión
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tan" height="4rem" alignItems="center">
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
