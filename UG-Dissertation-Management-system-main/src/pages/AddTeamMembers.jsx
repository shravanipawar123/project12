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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaAddressBook, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";

const AddTeamMembers = () => {



  useEffect(() => {
   
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
          <Box p="4">
           
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AddTeamMembers;
