import React, { useEffect, useState } from "react";
import axios from "axios";
import GuideSidebar from "../components/GuideSidebar";
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
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaAddressBook, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";

const GuideStudents = () => {
  const [profileData, setProfileData] = useState([]);
  const [studentsAssigned, setStudentsAssigned] = useState([]);

  const guideId = localStorage.getItem("guideId") || null;
  const guideProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/guide/profile/${guideId}`
      );
      console.log("profile data", response);

      if (response.status == 201) {
        setProfileData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getStudentsAssigned = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/guide/${guideId}/students`
      );
      console.log("profile data", response);

      if (response.status == 200) {
        setStudentsAssigned(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("students assignend", studentsAssigned);

  useEffect(() => {
    getStudentsAssigned();
    // guideProfileData();
  }, []);
  return (
    <div>
      <Box>
        {/* ------------------------------------------ SIDEBAR DIV ------------------------------------------ */}
        <Box>
          {" "}
          <GuideSidebar />
        </Box>
        {/* --------------------------------------MAIN CONTENT GOES HERE------------------------------------- */}
        <Image
          w="100%"
          src="https://kbpcoes.edu.in/images/header/logo-wide.jpg"
        />
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
              Welcome to Guide Dashboard,{" "}
              <Text color="green.600" fontWeight="bold">
                {" "}
                {profileData?.name}
              </Text>
            </Text>
          </Box>
          <Box mt="12">
            {" "}
            {/* Render the student data */}
            {studentsAssigned?.map((student) => (
              <Box key={student._id} p="4" bg="white" mb="4" borderWidth="1px">
                <Stack direction="row" spacing="4">
                  <Avatar name={student.name} />
                  <VStack align="flex-start" spacing="1">
                    <Text fontSize={"24"} fontWeight="bold">
                      {student.name}
                    </Text>
                    <Text>{student.email}</Text>
                    <Text>Group Number : {student.groupNumber}</Text>
                    <Text>Contact Number : {student.contactNumber}</Text>
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <Text fontSize={"24"}>Team Members</Text>
                    {student?.teamMembers?.map((member) => (
                      <Box>
                        <VStack>
                          <Text>- Group Number : {member.name}</Text>
                          <Text>Contact Number : {member.rollNumber}</Text>
                          <Spacer />
                          <Spacer />
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                  <Spacer />
                  {/* <Stack direction="row" spacing="4">
                    <IconButton
                      aria-label="Edit"
                      icon={<FaEdit />}
                      onClick={() => {
                        // Handle edit action
                      }}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<FaTrash />}
                      onClick={() => {
                        // Handle delete action
                      }}
                    />
                  </Stack> */}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default GuideStudents;
