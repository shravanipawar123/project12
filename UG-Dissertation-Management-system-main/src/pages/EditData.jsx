import React, { useState, useEffect } from "react";
import axios from "axios";
// Chakra imports
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  Flex,
  InputLeftAddon,
  Textarea,
  FormHelperText,
  Avatar,
  Icon,
  VisuallyHidden,
  Checkbox,
  Radio,
  GridItem,
  Stack,
  useToast,
  chakra,
  FormControl,
  HStack,
  Divider,
  RadioGroup,
  Input,
  FormLabel,
  Text,
  InputGroup,
  List,
  ListItem,
  Select,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const EditData = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTechstack, setProjectTechstack] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [softwaresUsed, setSoftwaresUsed] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId") || null;

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      studentId: userId,
      projectName,
      projectDescription,
      projectTechstack,
      projectCategory,
      projectUrl,
      softwaresUsed,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/users/add-project-info",
        payload
      );
      console.log(response.data);
      toast({
        title: "Project Information Added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error adding project information:", error);
      toast({
        title: "Error",
        description: "Failed to add project information",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
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
          ml={{
            base: 0,
            md: 60,
          }}
          as="main"
          borderWidth="4px"
        >
          {" "}
          <Navbar />
          {/* ----------------------------FORM UI STARTS HERE----------------------- */}
          <Box m="4">
            <form onSubmit={handleSubmit}>
              <Box pt={4}>
                {/* ----------------------- Project Information form starts here------------------------------ */}
                <Box bg="#add8e6" p={4} rounded={4}>
                  <SimpleGrid columns={1} spacing={6}>
                    <Box>
                      <Heading fontSize="2xl" fontWeight="lg" lineHeight="6">
                        Project Information
                      </Heading>
                      <Text mt={1} fontSize="sm">
                        Provide Project details
                      </Text>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Project Name *</FormLabel>
                        <Input
                          bg="white"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          required
                          placeholder="Enter project name"
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Project Description *</FormLabel>
                        <Textarea
                          bg="white"
                          value={projectDescription}
                          onChange={(e) =>
                            setProjectDescription(e.target.value)
                          }
                          required
                          placeholder="Enter project description"
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Project Techstack/Languages *</FormLabel>
                        <Input
                          bg="white"
                          value={projectTechstack}
                          onChange={(e) => setProjectTechstack(e.target.value)}
                          required
                          placeholder="Enter project tech used"
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Project Category *</FormLabel>
                        <Select
                          bg="white"
                          value={projectCategory}
                          onChange={(e) => setProjectCategory(e.target.value)}
                          required
                        >
                          <option value="">Select project category</option>
                          <option value="Web Development">
                            Web Development
                          </option>
                          <option value="Mobile Development">
                            Mobile Development
                          </option>
                          <option value="Data Science">Data Science</option>
                          <option value="Others">Others</option>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Softwares Used *</FormLabel>
                        <Input
                          bg="white"
                          value={softwaresUsed}
                          onChange={(e) => setSoftwaresUsed(e.target.value)}
                          required
                          placeholder="Enter softwares used for creating project"
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel display={"flex"}>
                          Project Url/Deployed Link{" "}
                          <Text ml="2" mt="1" fontSize={"small"}>
                            (optional)
                          </Text>
                        </FormLabel>
                        <Input
                          bg="white"
                          value={projectUrl}
                          onChange={(e) => setProjectUrl(e.target.value)}
                          placeholder="Project Deployed Link"
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <Button
                        width={"full"}
                        isLoading={loading}
                        type="submit"
                        colorScheme="blue"
                      >
                        Save
                      </Button>
                    </Box>
                  </SimpleGrid>
                </Box>
              </Box>
            </form>
          </Box>
          {/* ----------------------------FORM UI ENDS HERE----------------------- */}
        </Box>
      </Box>
    </div>
  );
};

export default EditData;
