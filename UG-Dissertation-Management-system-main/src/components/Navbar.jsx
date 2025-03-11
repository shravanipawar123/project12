import React from "react";
import {
  chakra,
  Flex,
  HStack,
  Button,
  Box,
  VStack,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
  IconButton,
  CloseButton,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const mobileNav = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth") || false;

  const handleLogout = () => {
    toast({
      title: `Logging Out`,
      status: "error",
      isClosable: true,
    });
    localStorage.removeItem(["isAuth"]);
    navigate("/signin");
    window.location.reload();
  };
  return (
    <React.Fragment>
      <Image
        w="100%"
        src="https://kbpcoes.edu.in/images/header/logo-wide.jpg"
      />
      <chakra.header
        bgColor="#E9D8FD"
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              {/* <Logo /> */}
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              <Link to="/">UG Dissertation Management System</Link>
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <Link to="/aboutus">
                <Button variant="ghost">About us </Button>
              </Link>{" "}
              {isAuth === "true" ? (
                <>
                  <Button variant="ghost">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>{" "}
                  <Button onClick={handleLogout} variant="ghost">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost">
                    <Link to="/signup">Sign up</Link>
                  </Button>{" "}
                  <Button variant="ghost">
                    <Link to="/signin">Sign in</Link>
                  </Button>
                </>
              )}
              {isAuth && (
                <Text border={"solid green 2px"} p="2" color={"green.400"}>
                  {localStorage.getItem("studentProfileData")}
                </Text>
              )}
            </HStack>

            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bgColor="#E9D8FD"
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Link to="/aboutus">
                  <Button variant="ghost">About us </Button>
                </Link>{" "}
                {isAuth && (
                  <Text>{localStorage.getItem("studentProfileData")}</Text>
                )}
                {isAuth ? (
                  <Button variant="ghost">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost">
                      <Link to="/signup">Sign up</Link>
                    </Button>{" "}
                    <Button variant="ghost">
                      <Link to="/signin">Sign in</Link>
                    </Button>
                  </>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default Navbar;
