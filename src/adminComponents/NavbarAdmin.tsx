import {
  Box,
  Button,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const NavbarAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location.pathname]);

  const navOptions = [
    "main",
    "gallery",
    "artefacts",
    "about",
    "projects",
    "store",
  ];

  return (
    <Box
      w={"100vw"}
      h={{ base: "4em", md: "5em", lg: "6em" }}
      bg={"#2F3F89"}
      display={"flex"}
      alignItems={"center"}
      position={"relative"}
      zIndex={3}>
      <Box
        onClick={() => {
          navigate("/admin/home");
        }}
        width={{ base: "80%", sm: "25%", lg: "20%" }}
        h={"100%"}
        cursor={"pointer"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}>
        <Heading
          color={"white"}
          objectFit="contain"
          w={{ base: "250px", sm: "150px", lg: "250px" }}
        >WMASN ADMIN</Heading>
      </Box>
      <Box
        width={{ base: "20%", sm: "75%", lg: "80%" }}
        h={"100%"}
        color={"white"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
        letterSpacing={"4px"}>
        <Icon
          as={IoMenu}
          onClick={() => {
            onOpen();
          }}
          fontSize={"2.5em"}
          display={{ base: "inline", sm: "none" }}
        />
        <Text
          display={{ base: "none", sm: "inline" }}
          fontSize={{ base: "auto", sm: "0.5em", md: "0.75em", lg: "1em" }}
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/home")}
          padding={"0.5em"}
          borderTop={url === "/" ? "2px solid white" : ""}
          borderBottom={url === "/" ? "2px solid white" : ""}>
          MAIN
        </Text>
        <Text
          display={{ base: "none", sm: "inline" }}
          fontSize={{ base: "auto", sm: "0.5em", md: "0.75em", lg: "1em" }}
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/gallery")}
          padding={"0.5em"}
          borderTop={url === "/gallery" ? "2px solid white" : ""}
          borderBottom={url === "/gallery" ? "2px solid white" : ""}>
          GALLERY
        </Text>
        <Text
          display={{ base: "none", sm: "inline" }}
          fontSize={{ base: "auto", sm: "0.5em", md: "0.75em", lg: "1em" }}
          _hover={{ cursor: "pointer" }}
          padding={"0.5em"}
          onClick={() => navigate("/admin/artefacts")}
          borderTop={url?.includes("/artefacts") ? "2px solid white" : ""}
          borderBottom={
            url?.includes("/artefacts") ? "2px solid white" : ""
          }>
          ARTEFACTS
        </Text>

        <Text
          display={{ base: "none", sm: "inline" }}
          fontSize={{ base: "auto", sm: "0.5em", md: "0.75em", lg: "1em" }}
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/about")}
          padding={"0.5em"}
          borderTop={url === "/about" ? "2px solid white" : ""}
          borderBottom={url === "/about" ? "2px solid white" : ""}>
          ABOUT US
        </Text>
        <Text
          display={{ base: "none", sm: "inline" }}
          fontSize={{ base: "auto", sm: "0.5em", md: "0.75em", lg: "1em" }}
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/projects")}
          padding={"0.5em"}
          borderTop={url === "/projects" ? "2px solid white" : ""}
          borderBottom={url === "/projects" ? "2px solid white" : ""}>
          PROJECTS
        </Text>
        <Text
          display={{ base: "none", sm: "inline" }}
          fontSize={{ base: "auto", sm: "0.5em", md: "0.75em", lg: "1em" }}
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/store")}
          padding={"0.5em"}
          borderTop={url === "/store" ? "2px solid white" : ""}
          borderBottom={url === "/store" ? "2px solid white" : ""}>
          STORE
        </Text>
      </Box>
      {/* Mobile View */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          display={"flex"}
          flexDirection={"column"}
          w={"90vw"}
          h={"90vh"}
          bg={"rgba(0, 0, 0, 0"}>
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            w={"100%"}
            h={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"1.5em"}>
            <Icon
              as={IoMdClose}
              onClick={onClose}
              position={"absolute"}
              fontSize={"2em"}
              color={"white"}
              top={"3%"}
              right={"3%"}
            />
            {navOptions.map((link, i) => {
              if (link === "artefacts") {
                return (
                  <>
                    <Button
                      key={i}
                      bg={"#2F3F89"}
                      color={"white"}
                      w={"90%"}
                      onClick={() => {
                        navigate(`/${link}/submitted`);
                        onClose();
                      }}>
                      SUBMITTED ARTEFACTS
                    </Button>
                    <Button
                      key={i + 1}
                      bg={"#2F3F89"}
                      color={"white"}
                      w={"90%"}
                      onClick={() => {
                        navigate(`/${link}/commissioned`);
                        onClose();
                      }}>
                      COMMISSIONED ARTEFACTS
                    </Button>
                  </>
                );
              }

              return (
                <Button
                  key={i}
                  bg={"#2F3F89"}
                  color={"white"}
                  w={"90%"}
                  onClick={() => {
                    navigate(`/${link === "main" ? "" : `${link}`}`);
                    onClose();
                  }}>
                  {link.toUpperCase()}
                </Button>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NavbarAdmin;
