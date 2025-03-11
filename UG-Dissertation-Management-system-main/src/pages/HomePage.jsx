import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import projectCalender from "../Assets/projectCalender.pdf";
import synopsis from "../Assets/synopsis.pdf";
import btechProject from "../Assets/btechProject.pdf";
import guideList from "../Assets/guideList.pdf";
import ProjectsList from "../components/ProjectsList";

const HomePage = () => {
  const [updates, setUpdates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const getAllUpdates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/updates/allupdates`
      );
      console.log("updates data", response);
      if (response.status === 200) {
        setUpdates(response.data.slice(-4));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pdfData = [
    { name: "Project Calendar", pdfUrl: projectCalender },
    { name: "Report Format", pdfUrl: synopsis },
    { name: "Guide List", pdfUrl: guideList },
    { name: "Project List Along with Status", pdfUrl: btechProject },
  ];

  const openModal = (pdf) => {
    setSelectedPdf(pdf);
  };

  const closeModal = () => {
    setSelectedPdf(null);
  };

  useEffect(() => {
    getAllUpdates();
  }, []);
  return (
    <>
      <Navbar />
      <Box>
        <SimpleGrid
          p="4"
          mt={{ sm: 0, base: 4 }}
          columns={{
            base: 1,
            md: 2,
          }}
          spacing={0}
          _after={{
            bg: "brand.500",
            opacity: 0.25,
            pos: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
            content: '" "',
          }}
        >
          <Flex direction="column" alignItems="start" justifyContent="center">
            <Box mt="4" mx="auto">
              <Box
                w={{
                  base: "full",
                  md: 11 / 12,
                  xl: 9 / 12,
                }}
                mx="auto"
                textAlign={{
                  md: "center",
                }}
              >
                base: "left",
                <chakra.h1
                  mb={6}
                  fontSize={{
                    base: "4xl",
                    md: "6xl",
                  }}
                  fontWeight="bold"
                  lineHeight="none"
                  letterSpacing={{
                    base: "normal",
                    md: "tight",
                  }}
                  color="gray.900"
                  _dark={{
                    color: "gray.100",
                  }}
                >
                  UG{" "}
                  <Text
                    display={{
                      base: "block",
                      lg: "inline",
                    }}
                    w="full"
                    bgClip="text"
                    bgGradient="linear(to-r, green.400,purple.500)"
                    fontWeight="extrabold"
                  >
                    Dissertation
                  </Text>{" "}
                  Management System
                </chakra.h1>
                <chakra.p
                  color="gray.600"
                  _dark={{
                    color: "gray.300",
                  }}
                >
                  UG Dissertation Management System is a webapp to manage final
                  year projects at one place for Project Head,Project Guide and
                  Students
                </chakra.p>
              </Box>
            </Box>
          </Flex>
          <Box>
            <Flex
              _dark={{
                bg: "#3e3e3e",
              }}
              p={50}
              w="full"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                bg="white"
                _dark={{
                  bg: "gray.800",
                }}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
              >
                <Heading
                  textAlign="center"
                  w="full"
                  bgClip="text"
                  bgGradient="linear(to-r, red.400,blue.500)"
                  fontWeight="extrabold"
                >
                  Updates
                </Heading>
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge rounded="full" px="2" colorScheme="teal">
                      New
                    </Badge>
                  </Box>
                  {updates &&
                    updates.slice(0, 4).map((update) => (
                      <Box key={update.id} m="4">
                        <Text
                          mt="1"
                          fontWeight="semibold"
                          fontSize="16"
                          color="blue.300"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          {update.name}
                        </Text>
                        <Text
                          mt="1"
                          fontSize="12"
                          lineHeight="tight"
                          noOfLines={2}
                        >
                          {update.description}
                        </Text>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>
        <Box
          w="90%"
          m="auto"
          alignContent={"center"}
          alignItems={"center"}
          justifyContent="center"
        >
          <Heading
            textAlign={"center"}
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
          >
            Report Formats
          </Heading>
          <Flex
            _dark={{
              bg: "#3e3e3e",
            }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={12}
              w="100%"
              maxW="1200px"
            >
              {pdfData.map((pdf, index) => (
                <GridItem
                  alignItems={"center"}
                  alignContent={"center"}
                  justifyContent={"center"}
                  key={index}
                >
                  <Box
                    bg="white"
                    _dark={{
                      bg: "gray.800",
                    }}
                    borderWidth="1px"
                    alignItems={"center"}
                    alignContent={"center"}
                    justifyContent={"center"}
                    rounded="lg"
                    shadow="lg"
                    onClick={() => openModal(pdf)}
                    cursor="pointer"
                  >
                    <Box
                      p="6"
                      textAlign={"center"}
                      alignItems={"center"}
                      alignContent={"center"}
                      justifyContent={"center"}
                    >
                      <Heading fontSize="xl">{pdf.name}</Heading>
                    </Box>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
        <ProjectsList />
        <Modal isOpen={selectedPdf !== null} onClose={closeModal} size="7xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedPdf?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <iframe
                  width="100%"
                  height="600px"
                  src={selectedPdf?.pdfUrl}
                ></iframe>
              </Center>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Features />
      </Box>
    </>
  );
};

export default HomePage;
