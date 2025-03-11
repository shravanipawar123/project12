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
import loginPng from "../Assets/loginPng.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const isAuth = localStorage.getItem("isAuth") || null;

  const handleSubmit = (e) => {
    console.log("function invoked");
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    if (payload) {
      console.log("payload", payload);
      handleSendLoginRequest(payload);
    }
  };

  const handleSendLoginRequest = async (payload) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/users/login`,
        payload
      );
      console.log("Logging in", response);
      if (response.status == 201) {
        console.log("success", response);
        localStorage.setItem("access_token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("isAuth", true);
        toast({
          title: `Logged in Successfully`,
          status: "success",
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      localStorage.setItem("isAuth", false);
      toast({
        title: `Failed to Login`,
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth === "true") {
      navigate("/dashboard");
    }
  }, [isAuth]);

  return (
    <>
      <Navbar />
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"4xl"} py={12} px={6}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
          <Flex
            direction={{ base: "column", md: "row" }}
            bg="blue.50"
            boxShadow={"lg"}
            rounded={"lg"}
            p={8}
          >
            {/* Image on the left */}
            <Box flex={1} display={{ base: "none", md: "flex" }}>
              <img src={loginPng} alt="login png image" />
            </Box>
            {/* Form on the right */}
            <Box m="auto" flex={1}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
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
                    <Button
                      isLoading={loading}
                      type="submit"
                      colorScheme="blue"
                      mt={4}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </FormControl>
                </Stack>
              </form>
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
}
