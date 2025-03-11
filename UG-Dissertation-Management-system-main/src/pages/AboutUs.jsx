import React from "react";
import {
  Flex,
  chakra,
  Box,
  Icon,
  SimpleGrid,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
const AboutUs = () => {
  const Feature = (props) => {
    return (
      <Flex>
        <Icon
          boxSize={5}
          mt={1}
          mr={2}
          color="brand.500"
          _dark={{
            color: "brand.300",
          }}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </Icon>
        <chakra.p
          fontSize="lg"
          color="gray.700"
          _dark={{
            color: "gray.400",
          }}
          {...props}
        />
      </Flex>
    );
  };

  return (
    <>
      <Navbar />{" "}
      <Heading textAlign="center" m="4">
        About Us
      </Heading>{" "}
      <Flex
        bg="#edf3f8"
        p={20}
        w="auto"
        justifyContent="center"
        alignItems="center"
      >
        <Box shadow="xl" bg="white" px={8} py={20} mx="auto">
          <SimpleGrid
            alignItems="center"
            columns={{
              base: 1,
              lg: 2,
            }}
            spacingY={{
              base: 10,
              lg: 32,
            }}
            spacingX={{
              base: 10,
              lg: 24,
            }}
          >
            <Box>
              <chakra.h2
                mb={3}
                fontSize={{
                  base: "3xl",
                  md: "4xl",
                }}
                fontWeight="extrabold"
                textAlign={{
                  base: "center",
                  sm: "left",
                }}
                _light={{
                  color: "black",
                }}
                lineHeight="shorter"
                letterSpacing="tight"
              >
                Manage Your Projects
              </chakra.h2>
              <chakra.p
                mb={6}
                fontSize={{
                  base: "lg",
                  md: "xl",
                }}
                textAlign={{
                  base: "center",
                  sm: "left",
                }}
                color="gray.600"
              >
                project management system created for college students and
                teachers
              </chakra.p>
              <Button
                as="a"
                variant="solid"
                w={{
                  base: "full",
                  sm: "auto",
                }}
                colorScheme="brand"
                size="lg"
              >
                Manage Your Projects
              </Button>
            </Box>
            <VStack
              direction="column"
              flexGrow={1}
              spacing={5}
              alignItems="start"
            >
              <Feature>Add Projects</Feature>
              <Feature>Project Management</Feature>
              <Feature>Track your projects with ease</Feature>
              <Feature>Add Notifications</Feature>
              <Feature>Add Reviews</Feature>
            </VStack>
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
};

export default AboutUs;
