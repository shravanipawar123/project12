import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
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

const AdminDashboard = () => {
  const [profileData, setProfileData] = useState([]);
  const AdminId = localStorage.getItem("AdminId") || null;
  const AdminProfileDat = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/Admin/profile/$AdminId}`
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
    AdminProfileDat();
  }, []);
  return (
    <div>
      <Box>
        {/* ------------------------------------------ SIDEBAR DIV ------------------------------------------ */}
        <Box>
          {" "}
          <AdminSidebar />{" "}
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
          <Box bg="#EBDEF0">
            <Text fontSize="lg" p="4" textAlign={"left"}>
              Admin Dashboard
              <Text color="green.600" fontWeight="bold">
                {" "}
                {profileData?.name}
              </Text>
            </Text>
          </Box>
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
                      {/* {/* Admin DETAILS *} */}
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        align="start"
                        justify={{ base: "start", md: "space-between" }}
                        w="full"
                      >
                        <Box mb={{ base: 4, md: 0 }}>
                          {" "}
                          <Text fontSize="md" fontWeight="small">
                            Admin Name
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
              </>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AdminDashboard;
