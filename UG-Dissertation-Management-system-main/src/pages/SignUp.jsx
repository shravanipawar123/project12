import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import signUp from "../Assets/signUp.gif";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
      contactNumber,
      groupNumber,
    };
    if (payload) {
      console.log("payload is", payload);
      handleSendRegisterRequest(payload);
    }
  };

  const handleSendRegisterRequest = async (payload) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/users/register`,
        payload
      );
      console.log("group added", response);
      if (response.status === 201) {
        console.log("success");
        toast({
          title: `Registered Successfully`,
          status: "success",
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        title: `Failed to Register`,
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"6xl"} py={12} px={6}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign Up
          </Heading>
          <Flex
            direction={{ base: "column", md: "row" }}
            bg="blue.50"
            boxShadow={"lg"}
            rounded={"lg"}
            p={8}
          >
            <Box p="4" flex={1} display={{ base: "none", md: "flex" }}>
              <img src={signUp} alt="signUp gif" />
            </Box>
            <Box p="4" flex={1}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl id="name">
                    <FormLabel>Student Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="contactNumber">
                    <FormLabel>Contact Number</FormLabel>
                    <Input
                      type="number"
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="groupNumber">
                    <FormLabel>Group Number</FormLabel>
                    <Input
                      type="number"
                      onChange={(e) => setGroupNumber(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    isLoading={loading}
                    type="submit"
                    colorScheme="blue"
                    mt={4}
                    w="100%"
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </Stack>
              </form>
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
}
