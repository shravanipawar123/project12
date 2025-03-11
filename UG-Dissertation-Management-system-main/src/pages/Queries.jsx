import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import http from "../configs/http";
import { Box, Heading, Text, VStack, Button, Input } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Queries = () => {
  const [profileData, setProfileData] = useState([]);

  const userId = localStorage.getItem("userId") || null;
  const [query, setQuery] = useState("");

  const guideId = localStorage.getItem("guideId") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8000/users/students/${userId}/add-query`,
        {
          query,
          guideId,
        }
      );
      // Reset form fields after successful submission
      setQuery("");
      alert("Query added successfully!");
    } catch (error) {
      console.error(error.response.data);
      // Handle error, show error message to the user, etc.
      alert("Failed to add query. Please try again.");
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
            <Heading textAlign="center">Submit Query</Heading>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="query">Query:</label>
                <Input
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <br />
              <Button type="submit">Submit</Button>
            </form>
          </Box>

          <br />
          <br />
        </Box>
      </Box>
    </div>
  );
};

export default Queries;
