import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import http from "../configs/http";
import {
  Box,
  Stack,
  Text,
  Heading,
  SimpleGrid,
  GridItem,
  Select,
  FormLabel,
  InputGroup,
  Input,
  Button,
  Flex,
  useToast,
  Spacer,
  IconButton,
  VStack,
  FormControl,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaAddressBook, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";

const GuideProfiles = () => {
  const [guides, setGuides] = useState([]);

  const toast = useToast();
  const userId = localStorage.getItem("userId") || null;
  const getGuideProfiles = async (e) => {
    try {
      const response = await axios.get(`http://localhost:8000/guide/all`);
      if (response.status === 200) {
        console.log("res data", response.data);
        setGuides(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGuideProfiles();
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
          {/* -------------------------------- YOUR GUIDE STARTS HERE ---------------------------- */}
          <Box
            mt="8"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SimpleGrid columns={[1, null, 2, 3]} spacing="10">
              {guides.map((guide) => (
                <>
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p="6"
                    m="4"
                    boxShadow="md"
                  >
                    <VStack align="start">
                      <Heading size="md">{guide.name}</Heading>
                      <Text>
                        <strong>Email:</strong> {guide.email}
                      </Text>
                      {guide.experience && (
                        <Text>
                          <strong>Experience:</strong> {guide.experience}
                        </Text>
                      )}
                      {guide.speciality && (
                        <Text>
                          <strong>Speciality:</strong> {guide.speciality}
                        </Text>
                      )}
                      {guide.education && (
                        <Text>
                          <strong>Education:</strong> {guide.education}
                        </Text>
                      )}
                    </VStack>
                  </Box>
                </>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default GuideProfiles;
