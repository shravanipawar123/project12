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
import { FaTrash } from "react-icons/fa";

import Navbar from "../components/Navbar";

const YourGuide = () => {
  const [loading, setLoading] = useState(false);
  const [guideName, setGuideName] = useState("");
  const [guidesData, setGuidesData] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState("");
  const [teamLead, setTeamLead] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [memberRollNumber, setMemberRollNumber] = useState("");
  const [studentProfileData, setStudentProfileData] = useState([]);
  const [singleGuideData, setSingleGuide] = useState([]);
  const userId = localStorage.getItem("userId") || null;
  const toast = useToast();

  const addMember = () => {
    setTeamMembers([
      ...teamMembers,
      { name: memberName, rollNumber: memberRollNumber },
    ]);
  };

  const removeMember = (indexToRemove) => {
    setTeamMembers(teamMembers.filter((_, index) => index !== indexToRemove));
  };

  const getGuidesData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/guide/all`);
      console.log("Guides data", response);

      if (response.status == 200) {
        setGuidesData(response.data);
        console.log(guidesData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleGuideData = async (idToBeUsedForGettingGuideProfile) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/guide/profile/${idToBeUsedForGettingGuideProfile}`
      );
      console.log("single guide ", response.data);
      setSingleGuide(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getStudentProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/profile/${userId}`
      );

      if (response.status == 200) {
        setStudentProfileData(response.data);
        console.log("student prodile data ==>", response.data);
        localStorage.setItem("studentProfileData", response.data.name);
        // setTimeout(() => {
        //   getSingleGuideData(studentProfileData.guide);
        // }, 6000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const selectedGuideName = selectedGuide;

    const selectedGuideObject = guidesData.find(
      (guide) => guide.name === selectedGuideName
    );

    const selectedGuideId = selectedGuideObject?._id;
    console.log("selected guide object", selectedGuideObject);
    console.log("selectedGuideId is", selectedGuide);

    let payload = {
      guideId: selectedGuide,
      teamMembers,
      teamLead,
    };
    console.log("payload", payload);
    if (payload) {
      patchGuidesandTeamMembersData(payload);
    }
    if (selectedGuide) {
      assignStudentsToGuide(selectedGuideId, teamMembers, teamLead);
    }
  };

  const patchGuidesandTeamMembersData = async (payload) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:8000/users/profile/${userId}`,
        payload
      );
      console.log("updated data is", response);

      if (response.status == 200) {
        toast({
          title: `Data Saved Successfully`,
          status: "success",
          isClosable: true,
        });
        console.log(guidesData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast({
        title: `Failed to Save Data`,
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  //assigning students to guide
  const assignStudentsToGuide = async () => {
    try {
      const payload = {
        guideId: selectedGuide,
        studentId: userId,
      };

      setLoading(true);
      const response = await axios.patch(
        `http://localhost:8000/guide/add-student/${selectedGuide}/${userId}`
      );

      console.log("Updated data is", response);

      if (response.status === 200) {
        toast({
          title: "students assigned to guide  Successfully",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to Save Data",
          status: "error",
          isClosable: true,
        });
      }

      setLoading(false);
    } catch (err) {
      console.error("Error updating guide data:", err);
      toast({
        title: "Failed to Save Data",
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuidesData();
    getStudentProfileData();
  }, []);

  console.log("studentProfileData:", studentProfileData);
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
          {studentProfileData?.teamMembers?.length == 0 && (
            <Box p="4">
              <form onSubmit={handleSubmitForm}>
                <Box pt={4}>
                  {/* ----------------------- Information form starts here------------------------------ */}
                  <Box bg="#add8e6" p={4} rounded={4}>
                    <SimpleGrid
                      display={{
                        base: "initial",
                        md: "grid",
                      }}
                      columns={{
                        md: 3,
                      }}
                      spacing={{
                        md: 6,
                      }}
                    >
                      {/* GUIDE INFO */}
                      <GridItem
                        mt="2"
                        colSpan={{
                          md: 1,
                        }}
                      >
                        <Box px={[4, 1]}>
                          <Heading
                            fontSize="2xl"
                            fontWeight="lg"
                            lineHeight="6"
                          >
                            Guide Information
                          </Heading>
                          <Text mt={1} fontSize="sm">
                            Provide guide details
                          </Text>
                        </Box>
                      </GridItem>

                      <GridItem
                        mt={{ base: "10px", md: "10px", xl: "0px" }}
                        colSpan={{
                          md: 2,
                        }}
                      >
                        <Box
                          shadow="base"
                          rounded={[null, "md"]}
                          overflow={{
                            sm: "hidden",
                          }}
                        >
                          <Stack
                            px={4}
                            py={5}
                            bg="beige"
                            _dark={{
                              bg: "#2D3748",
                            }}
                            spacing={6}
                            p={{
                              sm: 6,
                            }}
                          >
                            <SimpleGrid columns={3} spacing={6}>
                              <Box as={GridItem} colSpan={[3, 2]}>
                                <FormLabel>
                                  Guide Name{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </FormLabel>
                                <InputGroup>
                                  <Select
                                    color="#322659"
                                    _dark={{ color: "white" }}
                                    onChange={(e) => {
                                      const selectedGuideId = e.target.value; // Store the selected guide ID
                                      const selectedGuideObject =
                                        guidesData.find(
                                          (guide) =>
                                            guide._id === selectedGuideId
                                        );
                                      console.log(
                                        "Selected Guide ID:",
                                        selectedGuideId
                                      );
                                      console.log(
                                        "Selected Guide Object:",
                                        selectedGuideObject
                                      );
                                      setSelectedGuide(selectedGuideId);
                                    }}
                                    required
                                    focusBorderColor="brand.400"
                                    rounded="md"
                                    value={selectedGuide}
                                  >
                                    <option>Select Guide</option>
                                    {guidesData.map((guide) => (
                                      <option key={guide._id} value={guide._id}>
                                        {guide.name}
                                        <br />
                                        {guide.education}
                                        <br />
                                        {guide.speciality}
                                      </option>
                                    ))}
                                  </Select>
                                </InputGroup>
                              </Box>
                            </SimpleGrid>
                          </Stack>
                        </Box>
                      </GridItem>
                      {/* TEAM MEMBERS INFO */}
                      <GridItem
                        mt="2"
                        colSpan={{
                          md: 1,
                        }}
                      >
                        <Box px={[4, 1]}>
                          <Heading
                            fontSize="2xl"
                            fontWeight="lg"
                            lineHeight="6"
                          >
                            Team Members
                          </Heading>
                          <Text mt={1} fontSize="sm">
                            Add team members
                          </Text>
                        </Box>
                      </GridItem>
                      <GridItem
                        mt={{ base: "10px", md: "10px", xl: "0px" }}
                        colSpan={{
                          md: 2,
                        }}
                      >
                        <Box
                          shadow="base"
                          rounded={[null, "md"]}
                          overflow={{
                            sm: "hidden",
                          }}
                        >
                          <Stack
                            px={4}
                            py={5}
                            bg="beige"
                            _dark={{
                              bg: "#2D3748",
                            }}
                            spacing={6}
                            p={{
                              sm: 6,
                            }}
                          >
                            <SimpleGrid columns={3} spacing={6}>
                              <Box as={GridItem} colSpan={[3, 2]}>
                                <FormLabel>Team Members</FormLabel>
                                <Stack spacing={4}>
                                  {teamMembers.map((member, index) => (
                                    <Flex key={index} align="center">
                                      <Text>Name: {member.name}</Text>
                                      <Spacer />
                                      <Text>
                                        Roll Number: {member.rollNumber}
                                      </Text>
                                      <IconButton
                                        colorScheme="red"
                                        ml="4"
                                        icon={<FaTrash />}
                                        aria-label="Delete"
                                        onClick={() => removeMember(index)}
                                      />
                                    </Flex>
                                  ))}
                                </Stack>
                              </Box>

                              <Box as={GridItem} colSpan={[3, 2]}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                  color="#322659"
                                  _dark={{ color: "white" }}
                                  onChange={(e) =>
                                    setMemberName(e.target.value)
                                  }
                                  required
                                  type="text"
                                  placeholder="Enter Name"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                />
                              </Box>
                              <Box as={GridItem} colSpan={[3, 2]}>
                                <FormLabel>Roll Number</FormLabel>
                                <Input
                                  color="#322659"
                                  _dark={{ color: "white" }}
                                  onChange={(e) =>
                                    setMemberRollNumber(e.target.value)
                                  }
                                  required
                                  type="text"
                                  placeholder="Enter Roll Number"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                />
                                <Button
                                  colorScheme="teal"
                                  m="2"
                                  onClick={addMember}
                                >
                                  Add Member
                                </Button>
                              </Box>
                            </SimpleGrid>
                          </Stack>
                        </Box>
                      </GridItem>

                      {/* TEAM LEAD INFO */}
                      <GridItem
                        mt="2"
                        colSpan={{
                          md: 1,
                        }}
                      >
                        <Box px={[4, 1]}>
                          <Heading
                            fontSize="2xl"
                            fontWeight="lg"
                            lineHeight="6"
                          >
                            Team Lead
                          </Heading>
                          <Text mt={1} fontSize="sm">
                            Team Lead Name
                          </Text>
                        </Box>
                      </GridItem>
                      <GridItem
                        mt={{ base: "10px", md: "10px", xl: "0px" }}
                        colSpan={{
                          md: 2,
                        }}
                      >
                        <Box
                          shadow="base"
                          rounded={[null, "md"]}
                          overflow={{
                            sm: "hidden",
                          }}
                        >
                          <Stack
                            px={4}
                            py={5}
                            bg="beige"
                            _dark={{
                              bg: "#2D3748",
                            }}
                            spacing={6}
                            p={{
                              sm: 6,
                            }}
                          >
                            <SimpleGrid columns={3} spacing={6}>
                              <Box as={GridItem} colSpan={[3, 2]}>
                                <FormLabel>Team Lead Name</FormLabel>
                                <Input
                                  color="#322659"
                                  _dark={{ color: "white" }}
                                  onChange={(e) => setTeamLead(e.target.value)}
                                  required
                                  type="text"
                                  placeholder="Enter Name"
                                  focusBorderColor="brand.400"
                                  rounded="md"
                                />
                              </Box>
                            </SimpleGrid>
                          </Stack>
                        </Box>
                      </GridItem>
                    </SimpleGrid>{" "}
                    <Input
                      value={loading ? "Submitting ..." : "Submit Data"}
                      p="2"
                      w="100%"
                      mt="5"
                      fontWeight="bold"
                      bg={"green.400"}
                      color={"white"}
                      _hover={{
                        bg: "green.700",
                        cursor: "pointer",
                      }}
                      type="submit"
                    />
                  </Box>

                  {/* ---------------------- form ends here ------------------------------ */}
                </Box>
              </form>
            </Box>
          )}
          {studentProfileData.teamMembers && (
            <Box p="4">
              <Text>
                Your Guide Name : <b>{singleGuideData?.name} </b>
              </Text>
              <Text> Guide Email : {singleGuideData?.email} </Text>
              <br />
              <Text>Team Members:</Text>
              {studentProfileData &&
                studentProfileData.teamMembers.map((el) => (
                  <div kry={el._id}>
                    <Text>
                      Name : <b>{el.name}</b>, Roll No.: {el.rollNumber}
                    </Text>
                  </div>
                ))}
              <br />
              <Text>Team Lead: {studentProfileData?.teamLead}</Text>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default YourGuide;
