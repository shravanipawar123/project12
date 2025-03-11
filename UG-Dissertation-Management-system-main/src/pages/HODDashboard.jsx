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
  Spacer,
  Avatar,
  VStack,
  useToast,
  Heading,
  Container,
  IconButton,
  useDisclosure,
  Modal,
  Image,
  Input,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaAddressBook, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import HODSidebar from "../components/HODSidebar";
import StudentsList from "../components/StudentsList";

const HODDashboard = () => {
  const [studentsData, setstudentsData] = useState([]);
  const [guidesData, setGuidesData] = useState([]);
  const guideId = localStorage.getItem("guideId") || null;
  const getstudentsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/allstudents`
      );
      console.log("students data", response);

      if (response.status == 200) {
        setstudentsData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getGuidesData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/guide/all`);
      console.log("guides data", response);

      if (response.status == 200) {
        setGuidesData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("students data - - ->", studentsData);
  useEffect(() => {
    getstudentsData();
    getGuidesData();
  }, []);
  return (
    <div>
      <Box>
        {/* ------------------------------------------ SIDEBAR DIV ------------------------------------------ */}
        <Box>
          {" "}
          <HODSidebar />
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
          <Image
            w="100%"
            src="https://kbpcoes.edu.in/images/header/logo-wide.jpg"
          />
          <Box bg="#EBDEF0">
            <Text fontSize="lg" p="4" textAlign={"left"}>
              Welcome to HOD Dashboard,{" "}
            </Text>
          </Box>
          <Box mt="12">
            {" "}
            {studentsData && (
              <>
                <Flex align="center" justify="center" direction="column">
                  <Container
                    maxW="3xl"
                    bg="#F7F1F2"
                    rounded="lg"
                    shadow="md"
                    p={8}
                    width="full"
                  >
                    <VStack align="start" spacing={6}>
                      {/* Guide DETAILS */}
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        align="start"
                        justify={{ base: "start", md: "space-between" }}
                        w="full"
                      >
                        <Box mb={{ base: 4, md: 0 }}>
                          {" "}
                          <Text fontSize="md" fontWeight="small">
                            Total Number of Students
                          </Text>
                          <Text color="gray.800" fontWeight="medium">
                            {" "}
                            {studentsData?.length}
                          </Text>
                        </Box>
                      </Flex>
                    </VStack>
                  </Container>
                </Flex>
              </>
            )}
          </Box>
          <TableContainer mt="8">
            <Table variant="striped" colorScheme="red">
              <TableCaption>All Students List</TableCaption>
              <Thead>
                <Tr>
                  <Th>Group No.</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Contact Number</Th>
                  <Th>Project Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                <StudentsList studentsData={studentsData} />
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Total Students={studentsData?.length}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Box mt="12">
            {" "}
            {studentsData && (
              <>
                <Flex align="center" justify="center" direction="column">
                  <Container
                    maxW="3xl"
                    bg="#F7F1F2"
                    rounded="lg"
                    shadow="md"
                    p={8}
                    width="full"
                  >
                    <VStack align="start" spacing={6}>
                      {/* Guide DETAILS */}
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        align="start"
                        justify={{ base: "start", md: "space-between" }}
                        w="full"
                      >
                        <Box mb={{ base: 4, md: 0 }}>
                          {" "}
                          <Text fontSize="md" fontWeight="small">
                            Total Number of Guides
                          </Text>
                          <Text color="gray.800" fontWeight="medium">
                            {" "}
                            {guidesData?.length}
                          </Text>
                        </Box>
                      </Flex>
                    </VStack>
                  </Container>
                </Flex>
              </>
            )}
          </Box>
          <TableContainer mt="8">
            <Table variant="striped" colorScheme="red">
              <TableCaption>All Guides List</TableCaption>
              <Thead>
                <Tr>
                  <Th>Sr.no.</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {guidesData?.map((el, i) => (
                  <Tr _hover={{ color: "red" }} key={i + 1}>
                    <Td>{i + 1}</Td>
                    <Td>{el.name}</Td>
                    <Td>{el.email}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Total Guides={guidesData?.length}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default HODDashboard;
