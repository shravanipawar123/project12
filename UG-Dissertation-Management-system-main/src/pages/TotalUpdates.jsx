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
  const [updates, setUpdates] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const toast = useToast();

  const getAllUpdates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/updates/allupdates`
      );
      console.log("updates data", response);
      if (response.status === 200) {
        setUpdates(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const guideId = localStorage.getItem("guideId") || null;

  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    getAllUpdates();
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
          <Text m="8">List of Updates Created</Text>
          <Box p="4" mt="10">
            {updates &&
              updates.map((update) => (
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
                  <Text mt="1" fontSize="12" lineHeight="tight" noOfLines={2}>
                    {update.description}
                  </Text>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateUpdate;
