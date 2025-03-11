import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import loginPng from "../Assets/loginPng.png";

export default function GuideLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  localStorage.removeItem("isAuth");
  const isAuthGuide = localStorage.getItem("isAuthGuide") || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    if (payload) {
      handleSendLoginRequest(payload);
    }
  };

  const handleSendLoginRequest = async (payload) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/guide/login`,
        payload
      );
      if (response.status === 201) {
        localStorage.setItem("access_token", response.data.token);
        localStorage.setItem("guideId", response.data.guideId);
        localStorage.setItem("isAuthGuide", true);
        toast({
          title: `Logged in Successfully`,
          status: "success",
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (err) {
      localStorage.setItem("isAuthGuide", false);
      toast({
        title: `Failed to Login`,
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthGuide === "true") {
      navigate("/guidedashboard");
    }
  }, [isAuthGuide]);

  return (
    <>
      <Navbar />
      <Flex minH={"90vh"} align={"center"} justify={"center"} bg="blue.50">
        <Stack spacing={8} mx={"auto"} maxW={"4xl"} py={12} px={6}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login as a Guide
          </Heading>
          <Flex
            direction={{ base: "column", md: "row" }}
            bg="red.100"
            boxShadow={"lg"}
            rounded={"lg"}
            p={8}
          >
            <Box flex={1} display={{ base: "none", md: "flex" }}>
              <img src={loginPng} alt="loginPng" />
            </Box>
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
                      w="100%"
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
