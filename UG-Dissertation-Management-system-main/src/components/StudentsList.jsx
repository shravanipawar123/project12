import React, { useEffect, useState } from "react";

import http from "../configs/http";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const StudentsList = ({ studentsData }) => {
  const navigate = useNavigate();
  // Add a utility function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  console.log("studentsData", studentsData);

  return (
    <>
      {studentsData?.map((el, i) => (
        <Tr _hover={{ color: "red" }} key={i + 1}>
          <Td>{el.groupNumber}</Td>
          <Td>{el.name}</Td>
          <Td>{el.email}</Td>

          <Td>{el.contactNumber}</Td>
          <Td>{el.projectStatus}</Td>
        </Tr>
      ))}
    </>
  );
};

export default StudentsList;
