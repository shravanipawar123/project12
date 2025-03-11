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

const ManageProgress = () => {
  const [projectStatus, setProjectStatus] = useState("");
  const toast = useToast();
  const userId = localStorage.getItem("userId") || null;
  const handleSubmit = async (e) => {
    const payload = {
      projectStatus: projectStatus,
    };
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/users/update-project-status/${userId}`,
        payload
      );
      if (response.status === 200) {
        toast({
          title: "Project status updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      // Reset form fields
      setProjectStatus("");
    } catch (error) {
      // Show error message
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {}, []);
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
            <VStack spacing={8}>
              <form onSubmit={handleSubmit}>
                <FormControl id="projectStatus">
                  <FormLabel>Project Status</FormLabel>
                  <Select
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e.target.value)}
                    required
                  >
                    <option value="">Select project status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </Select>
                </FormControl>
                <Button mt="4" type="submit" colorScheme="blue" width="100%">
                  Update Status
                </Button>
              </form>
            </VStack>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ManageProgress;
