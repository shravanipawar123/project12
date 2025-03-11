import React from "react";
import {
  chakra,
  Button,
  Box,
  Text,
  Stack,
  Icon,
  Image,
  SimpleGrid,
  Flex,
  Badge,
  Heading,
} from "@chakra-ui/react";

const Features = () => {
  return (
    <div>
      <Flex
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={20}
        w="full"
        justifyContent="center"
        alignItems="center"
        pos="absolute"
      >
        <Box
          shadow="xl"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          px={8}
          py={20}
          mx="auto"
        >
          <SimpleGrid
            alignItems="start"
            columns={{
              base: 1,
              md: 2,
            }}
            mb={24}
            spacingY={{
              base: 10,
              md: 32,
            }}
            spacingX={{
              base: 10,
              md: 24,
            }}
          >
            <Box>
              <chakra.h2
                mb={4}
                fontSize={{
                  base: "2xl",
                  md: "4xl",
                }}
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign={{
                  base: "center",
                  md: "left",
                }}
                color="gray.900"
                _dark={{
                  color: "gray.400",
                }}
                lineHeight={{
                  md: "shorter",
                }}
              >
                Streamline Project Management
              </chakra.h2>
              <chakra.p
                mb={5}
                textAlign={{
                  base: "center",
                  sm: "left",
                }}
                color="gray.600"
                _dark={{
                  color: "gray.400",
                }}
                fontSize={{
                  md: "lg",
                }}
              >
                a user-friendly web application that allows undergraduate
                students to efficiently register, log in, and manage their
                dissertation projects. The system should provide a centralized
                platform for students to document project details, track
                progress, and submit updates.
              </chakra.p>
            </Box>
            <Box
              w="full"
              h="full"
              bg="gray.200"
              _dark={{
                bg: "gray.700",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1478&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="project management"
              />
            </Box>
          </SimpleGrid>
          <SimpleGrid
            alignItems="center"
            columns={{
              base: 1,
              md: 2,
            }}
            flexDirection="column-reverse"
            mb={24}
            spacingY={{
              base: 10,
              md: 32,
            }}
            spacingX={{
              base: 10,
              md: 24,
            }}
          >
            <Box
              order={{
                base: "initial",
                md: 2,
              }}
            >
              <chakra.h2
                mb={4}
                fontSize={{
                  base: "2xl",
                  md: "4xl",
                }}
                fontWeight="extrabold"
                letterSpacing="tight"
                textAlign={{
                  base: "center",
                  md: "left",
                }}
                color="gray.900"
                _dark={{
                  color: "gray.400",
                }}
                lineHeight={{
                  md: "shorter",
                }}
              >
                Real-time progress monitoring and feedback
              </chakra.h2>
              <chakra.p
                mb={5}
                textAlign={{
                  base: "center",
                  sm: "left",
                }}
                color="gray.600"
                _dark={{
                  color: "gray.400",
                }}
                fontSize={{
                  md: "lg",
                }}
              >
                Enables faculty to monitor student project progress in real
                time, allowing for timely intervention, guidance, and support.
              </chakra.p>
            </Box>
            <Box
              w="full"
              h="full"
              bg="gray.200"
              _dark={{
                bg: "gray.700",
              }}
            >
              {" "}
              <Image
                w="100%"
                src="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="project management"
              />
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
      ;
    </div>
  );
};

export default Features;
