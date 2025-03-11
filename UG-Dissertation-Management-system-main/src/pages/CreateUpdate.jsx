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
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Center,
  Image,
  Toast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaAddressBook, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import HODSidebar from "../components/HODSidebar";

const CreateUpdate = () => {
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const toast = useToast();

  const guideId = localStorage.getItem("guideId") || null;

  const userId = localStorage.getItem("userId") || "";

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: taskData.title,
      description: taskData.description,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/updates/createupdate`,
        payload
      );
      console.log("task created", response);
      if (response.status === 200) {
        setTaskData({ title: "", description: "", deadline: "" });
        setLoading(false);
        Toast({
          title: `New Update Created`,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      Toast({
        title: `Failed to create update`,
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

          <Box p="4" mt="10">
            <Heading m="2" textAlign={"center"}>
              Create an Update/Notification
            </Heading>
            <Box width="50%" m="auto" p="8" borderRadius="8">
              <form onSubmit={handleUpdateSubmit}>
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

                <Button
                  isLoading={loading}
                  mt="8"
                  width="100%"
                  colorScheme="teal"
                  type="submit"
                >
                  Create Update
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateUpdate;
