import React, { useEffect, useState } from "react";
import axios from "axios";
import GuideSidebar from "../components/GuideSidebar";
import http from "../configs/http";
import {
  Box,
  Text,
  Spacer,
  Avatar,
  VStack,
  useToast,
  Heading,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Center,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaAddressBook, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";

const GuideTasks = () => {
  const [profileData, setProfileData] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const toast = useToast();

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

  useEffect(() => {
    guideProfileData();
  }, []);

  const userId = localStorage.getItem("userId") || "";

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/guide/create-task/${guideId}`,
        {
          ...taskData,
          assignedTo: userId,
        }
      );
      console.log("task created", response);
      if (response.status === 201) {
        // Reset task form fields after successful submission
        setTaskData({ title: "", description: "", deadline: "" });
        toast({
          title: `Task Created`,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: `Failed to Create Task`,
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Box>
        {/* ------------------------------------------ SIDEBAR DIV ------------------------------------------ */}
        <Box>
          {" "}
          <GuideSidebar />
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
              Welcome to Guide Dashboard,{" "}
              <Text color="green.600" fontWeight="bold">
                {" "}
                {profileData?.name}
              </Text>
            </Text>
          </Box>
          <Box p="4" mt="10">
            <Heading m="2" textAlign={"center"}>
              Create Task
            </Heading>
            <Box width="50%" m="auto" bg="#EBDEF0" p="8" borderRadius="8">
              <form onSubmit={handleTaskSubmit}>
                <FormControl id="title" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    border={"solid black 1px"}
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="description" mt="4">
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    border={"solid black 1px"}
                    type="text"
                    name="description"
                    value={taskData.description}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="deadline" mt="4">
                  <FormLabel>Deadline</FormLabel>
                  <Input
                    border={"solid black 1px"}
                    type="date"
                    name="deadline"
                    value={taskData.deadline}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <Button mt="8" width="100%" colorScheme="teal" type="submit">
                  Create Task
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default GuideTasks;
