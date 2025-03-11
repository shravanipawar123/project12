import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../configs/http";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  Image,
  useBreakpointValue,
  IconProps,
  Icon,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "../Assets/Admin.png"

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    const payload = { email, password };
    if (payload) {
      setLoading(true);
      loginRequestFunction(payload);
    }
  };

  //login request function
  const loginRequestFunction = async (payload) => {
    try {
      setLoading(true);
      const response = await http.post("/auth/login", payload);

      if (response.status === 200) {
        if (response.data) {
          if (response.data.message == "Request processed successfully.") {
            toast.success("Logged in Successfully", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }

        console.log(
          "Response is",
          response.data.message,
          response.data.data.access_token
        );
        const access_token = response.data.data.access_token;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("isAuth", true);
        window.location.reload();
      } else if (response.status === 401) {
        // Unauthorized error
        toast.error("Error logging in", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("isAuth", false);
      } else {
        // Other errors
        console.error("Server responded with:", response.data);
        console.error("Status code:", response.status);
        console.error("Headers:", response.headers);
        localStorage.setItem("isAuth", false);
      }
      setLoading(false);
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        // Handle timeout error
        console.error("Request timed out:", err);
        toast.error("Error logging in", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with:", err.response.data);
        console.error("Status code:", err.response.status);
        console.error("Headers:", err.response.headers);

        toast.error("Error logging in", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received. Request:", err.request);
        toast.error("Error logging in", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", err.message);
        toast.error("Error logging in", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoading(false);
      localStorage.setItem("isAuth", false);
      localStorage.setItem("role", "null");
    } finally {
      setLoading(false);
    }
  };

  //local storage imports
  const isAuth = localStorage.getItem("isAuth");
  //useeffect hook
  useEffect(() => {
    if (isAuth === "true") {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"6xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 2, md: 2 }}>
          {" "}
          <Stack  align={"center"}>
            <Image
              size={useBreakpointValue({ base: "xl", md: "xl" })}
              position={"relative"}
              zIndex={2}
              w="40rem"
              src={Admin}
            />
          </Stack>
          <Heading
          textAlign={"center"}
            color="#C05621"
            lineHeight={1.1}
            fontSize={{ base: "xl", sm: "xl", md: "3xl", lg: "3xl" }}
          >
            Admin Login
          </Heading>
        </Stack>
        <Stack
          bg={"gray.100"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Sign In
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Enter your credentials to Get Started
            </Text>
          </Stack>
          <Box onSubmit={handleSubmit} as={"form"} mt={10}>
            <Stack spacing={4}>
              <Text
                textAlign="left"
                color={"gray.700"}
                fontSize={{ base: "sm", sm: "lg" }}
                fontWeight="semibold"
              >
                Enter Your Email id
              </Text>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email id"
                bg={"gray.200"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Text
                textAlign="left"
                color={"gray.700"}
                fontSize={{ base: "sm", sm: "lg" }}
                fontWeight="semibold"
              >
                Enter Your Password
              </Text>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                bg={"gray.200"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
            <Input
              value={loading ? "Signing In..." : "Sign In"}
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.500,pink.500)",
                boxShadow: "xl",
                cursor: "pointer",
              }}
              type="submit"
            />
            <Text mt="4" color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Copyright @ {new Date().getFullYear()} UG Dissertation Management System
            </Text>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />{" "}
      <ToastContainer />
    </Box>
  );
}