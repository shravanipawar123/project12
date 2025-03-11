import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import http from "../configs/http";
import {
  Box,
  Flex,
  chakra,
  Icon,
  Stack,
  Text,
  Spacer,
  Avatar,
  VStack,
  useToast,
  Heading,
  Container,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaAddressBook, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [profileData, setProfileData] = useState([]);
  const userId = localStorage.getItem("userId") || null;
  const getUserProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/profile/${userId}`
      );
      console.log("profile data", response);

      if (response.status == 201) {
        setProfileData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserProfileData();
  }, []);
  return (
    <div>
      <Box>
        {/* ------------------------------------------ SIDEBAR DIV ------------------------------------------ */}
        <Box>
          {" "}
          <Sidebar />
        </Box>
        {/* --------------------------------------MAIN CONTENT GOES HERE------------------------------------- */}
        <Box
          minH="100vh"
          ml={{
            base: 0,
            md: 60,
          }}
          as="main"
          borderWidth="2px"
        >
          <Navbar />
          <Box mt="12">
            {" "}
            {profileData && (
              <>
                <Flex align="center" justify="center" direction="column">
                  <Container
                    maxW="3xl"
                    bg="#F1F1F2"
                    rounded="lg"
                    shadow="md"
                    p={8}
                    width="full"
                  >
                    <VStack align="start" spacing={6}>
                      {/* Group DETAILS */}
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        align="start"
                        justify={{ base: "start", md: "space-between" }}
                        w="full"
                      >
                        <Box mb={{ base: 4, md: 0 }}>
                          {" "}
                          <Text fontSize="md" fontWeight="small">
                            Group Name
                          </Text>
                          <Text color="gray.800" fontWeight="medium">
                            {" "}
                            {profileData?.name}
                          </Text>
                        </Box>
                        <Box>
                          {" "}
                          <Text fontSize="md" fontWeight="small">
                            Contact Email
                          </Text>
                          <Text color="gray.800" fontWeight="medium">
                            {profileData?.email}
                          </Text>
                        </Box>
                      </Flex>
                    </VStack>
                  </Container>
                </Flex>
                <Flex align="center" justify="center" direction="column">
                  <Container
                    maxW="3xl"
                    bg="#FDF6F6"
                    rounded="lg"
                    shadow="md"
                    p={8}
                    width="full"
                  >
                    <VStack align="start" spacing={6}>
                      {/* Group DETAILS */}
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        align="start"
                        justify={{ base: "start", md: "space-between" }}
                        w="full"
                      >
                        <Box mb={{ base: 4, md: 0 }}>
                          {" "}
                          <Text fontSize="md" fontWeight="small">
                            Contact Number
                          </Text>
                          <Text color="gray.800" fontWeight="medium">
                            {" "}
                            {profileData?.contactNumber}
                          </Text>
                        </Box>
                        <Box>
                          {" "}
                          <Text fontSize="md" fontWeight="small">
                            Group Number
                          </Text>
                          <Text color="gray.800" fontWeight="medium">
                            {profileData?.groupNumber}
                          </Text>
                        </Box>
                      </Flex>
                    </VStack>
                  </Container>
                </Flex>
                <Flex align="center" justify="center" direction="column">
                  <Container
                    maxW="3xl"
                    bg="#FFF2D7"
                    rounded="lg"
                    shadow="md"
                    p={8}
                    width="full"
                  >
                    <VStack align="start" spacing={6}>
                      {/* Group DETAILS */}
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        align="start"
                        justify={{ base: "start", md: "space-between" }}
                        w="full"
                      >
                        <Box mb={{ base: 4, md: 0 }}>
                          {" "}
                          <Text fontSize="md" fontWeight="small">
                            Project Status
                          </Text>
                          <Text color="gray.800" fontWeight="medium">
                            {" "}
                            {profileData?.projectStatus}
                          </Text>
                        </Box>
                        <Box>
                          {" "}
                          <Text fontSize="md" fontWeight="small">
                            Team Lead
                          </Text>
                          <Text color="gray.800" fontWeight="medium">
                            {profileData?.groupNumber}
                          </Text>
                        </Box>
                      </Flex>
                    </VStack>
                  </Container>
                </Flex>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
