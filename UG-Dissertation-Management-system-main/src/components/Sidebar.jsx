import { Image, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  useColorModeValue,
  Flex,
  Icon,
  Box,
  Text,
  Input,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  InputGroup,
  InputLeftElement,
  Avatar,
} from "@chakra-ui/react";

import { MdHome, MdKeyboardArrowRight, MdCreate } from "react-icons/md";

import {
  FaHandsHelping,
  FaRss,
  FaClipboardCheck,
  FaBell,
} from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { FiSearch, FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="#EDF4F2"
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="md"
          ml="2"
          color="brand.500"
          _dark={{
            color: "white",
          }}
          textTransform="uppercase"
          fontWeight="semibold"
        >
          UG Dissertaion
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome}>
          <Link to="/dashboard">Home</Link>
        </NavItem>
        <NavItem icon={FaHandsHelping}>
          {" "}
          <Link to="/yourguide">Your Guide</Link>
        </NavItem>
        <NavItem icon={FaHandsHelping}>
          {" "}
          <Link to="/guideprofiles">Guide Profiles</Link>
        </NavItem>
        <NavItem icon={MdCreate}>
          {" "}
          <Link to="/manageprogress">Manage Progress</Link>
        </NavItem>
        <NavItem icon={MdCreate}>
          {" "}
          <Link to="/editdata">Project Information</Link>
        </NavItem>
        <NavItem icon={FaClipboardCheck}>
          {" "}
          <Link to="/submitquery">Submit Queries</Link>
        </NavItem>
        <NavItem icon={FaClipboardCheck}>
          {" "}
          <Link to="/allqueries">All Queries</Link>
        </NavItem>
        <NavItem icon={FaClipboardCheck}>
          {" "}
          <Link to="/tasks">Tasks</Link>
        </NavItem>
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
      }}
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
