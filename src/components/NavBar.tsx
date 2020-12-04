import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
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
          <Link>Registro</Link>
        </NextLink>
      </>
    );
  } else {
    // user is logged in
    body = <Box>{data.me.username}</Box>;
  }

  return (
    <Flex bg="tomato" padding={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
