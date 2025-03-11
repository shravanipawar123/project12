import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import http from "../configs/http";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Tasks = () => {
  const [profileData, setProfileData] = useState([]);

  const userId = localStorage.getItem("userId") || null;

  const [tasks, setTasks] = useState([]);

  const [query, setQuery] = useState("");

  const guideId = localStorage.getItem("guideId") || "";

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/guide/tasks/${guideId}`
      );
      console.log("tasks ==>", response.data);
      if (response.status == 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error.response.data);

      alert("No tasks found");
    }
  };
  const getUserProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/profile/${userId}`
      );
      console.log("profile data", response);

      if (response.status == 201) {
        console.log("success", response.data);
        setProfileData(response.data);
        localStorage.setItem("guide_Id", response?.data?.guide);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserProfileData();
    getTasks();
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
          ml={{
            base: 0,
            md: 60,
          }}
          as="main"
          borderWidth="2px"
        >
          <Navbar />
          <br />
          <br />
          <Box w={"30%"} m="auto" bg={"white"} p="8" borderRadius={"6"}>
            <Heading textAlign="center">List of Tasks</Heading>
            <br />
            <br />
            {tasks &&
              tasks?.map((el, i) => (
                <Box m="4">
                  <Text>
                    {i + 1} . {el.title}
                  </Text>

                  <Text>description :- {el.description}</Text>
                  <Text>
                    deadline :-{" "}
                    {new Date(el.deadline).toISOString().slice(0, 10)}
                  </Text>
                  <br />
                  <span>
                    {" "}
                    <Checkbox /> Mark as Done
                  </span>
                </Box>
              ))}
          </Box>

          <br />
          <br />
        </Box>
      </Box>
    </div>
  );
};

export default Tasks;
