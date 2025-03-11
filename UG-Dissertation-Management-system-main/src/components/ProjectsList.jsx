import React, { useState } from "react";
import {
  Box,
  Grid,
  Heading,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const dummyProjects = [
  { id: 1, name: "Attendance Management System", category: "Web Development" },
  { id: 2, name: "Chat App", category: "Mobile Development" },
  { id: 3, name: "Task Manager", category: "Web Development" },
  { id: 4, name: "E-commerce Website", category: "Web Development" },
  { id: 5, name: "Project Management Tool", category: "Web Development" },
  { id: 6, name: "Event Booking System", category: "Web Development" },
  { id: 7, name: "Blog Platform", category: "Web Development" },
  { id: 8, name: "To-Do List Application", category: "Mobile Development" },
  { id: 9, name: "Inventory Management System", category: "Web Development" },
  { id: 10, name: "Recipe Sharing App", category: "Mobile Development" },
  { id: 11, name: "Social Media Dashboard", category: "Web Development" },
  { id: 12, name: "Budget Tracker", category: "Web Development" },
  { id: 13, name: "Weather App", category: "Mobile Development" },
  { id: 14, name: "Music Player", category: "Mobile Development" },
  { id: 15, name: "Fitness Tracker", category: "Mobile Development" },
  { id: 16, name: "Online Learning Platform", category: "Web Development" },
  { id: 17, name: "Travel Planner", category: "Mobile Development" },
  { id: 18, name: "Job Search Portal", category: "Web Development" },
  { id: 19, name: "Language Learning App", category: "Mobile Development" },
  {
    id: 20,
    name: "Appointment Scheduling System",
    category: "Web Development",
  },
  { id: 21, name: "Video Streaming App", category: "Mobile Development" },
  { id: 22, name: "Social Networking Site", category: "Web Development" },
  { id: 23, name: "Task Scheduler", category: "Web Development" },
  { id: 24, name: "Real Estate Listing Website", category: "Web Development" },
  { id: 25, name: "Virtual Event Platform", category: "Web Development" },
  { id: 26, name: "Expense Tracker", category: "Mobile Development" },
  { id: 27, name: "Online Marketplace", category: "Web Development" },
  { id: 28, name: "Fitness Coaching App", category: "Mobile Development" },
  { id: 29, name: "Document Management System", category: "Web Development" },
  { id: 30, name: "Music Streaming Service", category: "Mobile Development" },
];

const ProjectsList = () => {
  // Function to filter projects by category
  const getProjectsByCategory = (category) => {
    return dummyProjects.filter((project) => project.category === category);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const handleSearch = () => {
    const foundProject = dummyProjects.find(
      (project) => project.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundProject) {
      setSearchResult(`Project "${searchTerm}" already exists.`);
    } else {
      setSearchResult(`Project "${searchTerm}" not found.`);
    }
  };

  return (
    <Box
      p={4}
      w="90%"
      m="auto"
      alignContent={"center"}
      alignItems={"center"}
      justifyContent="center"
    >
      <Heading
        bgClip="text"
        bgGradient="linear(to-r, green.400,purple.600)"
        m="8"
        textAlign={"center"}
        as="h1"
        size="lg"
        mb={4}
      >
        Existing Projects List
      </Heading>

      {/* Web Development Projects */}
      <Box mt={8}>
        <Heading textAlign={"center"} as="h2" size="md" mb={4}>
          Web Development Projects
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {getProjectsByCategory("Web Development").map((project) => (
            <Box
              bg="white"
              key={project.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              _hover={{
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Heading as="h3" size="sm" mb={2}>
                {project.name}
              </Heading>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Mobile Development Projects */}
      <Box mt={8}>
        <Heading textAlign={"center"} as="h2" size="md" mb={4}>
          Mobile Development Projects
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {getProjectsByCategory("Mobile Development").map((project) => (
            <Box
              bg="white"
              key={project.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              _hover={{
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Heading as="h3" size="sm" mb={2}>
                {project.name}
              </Heading>
            </Box>
          ))}
        </Grid>
      </Box>

      <Box mt="8" p="4" bg="white" mb={4} display="flex" alignItems="center">
        <Input
          placeholder="Search for a project..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mr={4}
        />
        <Button colorScheme="blue" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {searchResult && (
        <Alert
          status={searchResult.includes("not found") ? "success" : "error"}
          mb={4}
        >
          <AlertIcon />
          <AlertTitle mr={2}>
            {searchResult.includes("not found")
              ? "Project Not Found"
              : "Already Present"}
          </AlertTitle>
          <AlertDescription>{searchResult}</AlertDescription>
        </Alert>
      )}
    </Box>
  );
};

export default ProjectsList;
