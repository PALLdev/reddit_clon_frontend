import { Box } from "@chakra-ui/react";
import React from "react";
interface WrapperProps {
  variant?: "small" | "regular"; // ? = hace que la propiedad sea opcional
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      width="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
