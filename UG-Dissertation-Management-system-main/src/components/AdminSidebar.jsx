import { Image, useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
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

const AdminSidebar = () => {
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
          Guide Dashboard
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
          <Link to="/guidedashboard">Home</Link>
        </NavItem>
        <NavItem icon={FaHandsHelping}>
          {" "}
          <Link to="/guidestudents">Your Students</Link>
        </NavItem>
        <NavItem icon={FaHandsHelping}>
          {" "}
          <Link to="/newupdate">Create New Update</Link>
        </NavItem>
        <NavItem onClick={handleGuideLogout} icon={FaHandsHelping}>
          Logout
        </NavItem>
      </Flex>
    </Box>
  );
  const navigate = useNavigate();

  const handleGuideLogout = () => {
    localStorage.removeItem("isAuthGuide");
    localStorage.removeItem("guideId");
    // Redirect to the guide login page
    navigate("/guidelogin");
  };
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

export default AdminSidebar;
