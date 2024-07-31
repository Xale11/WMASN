import { Box, Flex, Heading, Icon, Image, Text, Popover, PopoverBody, PopoverContent, PopoverTrigger, Divider } from '@chakra-ui/react'
import WMASN from "../assets/WMASN.png"
import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
// import { BsTwitterX } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const navigate = useNavigate()

  return (
    <Box  bg={"#2c2c2c"} w={"100%"} h={{base: "25em", lg: "19em"}} display={"flex"} justifyContent={{base: "space-around"}} flexWrap={"wrap"} color={"white"} fontFamily={"Roboto"}>
      <Box w={{base: "100%", lg: "20%"}} display={"flex"} justifyContent={{base: "center", lg: "start"}} alignItems={{base: "center", lg: "start"}}>
        <Image src={WMASN} objectFit={"contain"} width={"170px"} margin={{base: "0em", lg: "2em 0em 0em 1.5em"}}/>
      </Box>
      <Box w={{base: "30%", lg: "20%"}} display={"flex"} flexDirection={"column"} gap={"1em"} alignItems={{base: "center", lg: "start"}}>
        <Heading size={"sm"} marginTop={{base: "0em", lg: "2em"}}>Information</Heading>
        <Text fontSize={{base: "0.75em", md: "1em"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} onClick={() => {navigate("/")}}>Main</Text>
        <Text fontSize={{base: "0.75em", md: "1em"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} onClick={() => {navigate("/gallery")}}>Gallery</Text>
        <Popover>
          <PopoverTrigger>
            <Text fontSize={{base: "0.75em", md: "1em"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}}>Artefacts</Text>
          </PopoverTrigger>
          <PopoverContent border={"0px"} bg={"#2c2c2c"} borderRadius={"1em"}>
              <PopoverBody bg={"#2c2c2c"} borderRadius={"1em"} border={"1px solid white"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"0.5em"}>
                  <Text fontSize={{base: "0.75em", md: "1em"}} onClick={() => navigate("/artefacts/submitted")} _hover={{cursor: "pointer", textDecoration: "underline"}}>Submitted Artefacts</Text>
                  <Divider/>
                  <Text fontSize={{base: "0.75em", md: "1em"}} onClick={() => navigate("/artefacts/commissioned")} _hover={{cursor: "pointer", textDecoration: "underline"}}>Submitted Artefacts</Text>
              </PopoverBody>
          </PopoverContent>
        </Popover>
        <Text fontSize={{base: "0.75em", md: "1em"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} onClick={() => {navigate("/store")}}>Store</Text>
        <Text fontSize={{base: "0.75em", md: "1em"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} onClick={() => {navigate("/contacts")}}>Contacts</Text>
      </Box>
      <Box w={{base: "30%", lg: "20%"}} display={"flex"} flexDirection={"column"} gap={"1em"} alignItems={{base: "center", lg: "start"}}>
        <Heading size={"sm"} marginTop={{base: "0em", lg: "2em"}}>Contacts</Heading>

        <Box display={"flex"} gap={"1em"} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}}>
          <Box>
            <Icon as={CiLocationOn}/>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {/* <Text fontSize={{base: "0.75em", md: "1em"}}>Example</Text> */}
            <Text fontSize={{base: "0.75em", md: "1em"}}>Milton Keynes</Text>
            <Text fontSize={{base: "0.75em", md: "1em"}}>MK12</Text>
          </Box>
        </Box>

        <Box display={"flex"} gap={"1em"} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}}>
          <Box>
            <Icon as={FiPhone}/>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Text fontSize={{base: "0.75em", md: "1em"}}>+447803827743</Text>
          </Box>
        </Box>

        <Box display={"flex"} gap={"1em"} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}}>
          <Box>
            <Icon as={IoMailOutline}/>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Text fontSize={{base: "0.75em", md: "1em"}}>WMAS.Nigerian@gmail.com</Text>
          </Box>
        </Box>
      </Box>
      <Box w={{base: "30%", lg: "40%"}} display={"flex"} flexDirection={"column"} gap={"1em"} alignItems={{base: "center", lg: "start"}}>
        <Heading size={"sm"} marginTop={{base: "0em", lg: "2em"}}>Social Media</Heading>
        <Flex gap={"2em"} width={"95%"} fontSize={{base: "1em", lg: "1.25em"}} flexDirection={{base: "row", lg: "row"}} flexWrap={"wrap"} justifyContent={{base: "center", lg: "start"}}>
            {/* <Icon onClick={() => {window.location.href = "https://www.facebook.com"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} as={FaFacebookF}/>
            <Icon onClick={() => {window.location.href = "https://www.x.com"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} as={BsTwitterX}/> */}
            <Icon onClick={() => {window.location.href = "https://www.linkedin.com/company/w-masn/"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} as={FaLinkedin}/>
            <Icon onClick={() => {window.location.href = "https://www.instagram.com/w.m.a.s.n/"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} as={FaInstagram}/>
            {/* <Icon onClick={() => {window.location.href = "https://www.pinterest.com"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} as={FaPinterestP}/>
            <Icon onClick={() => {window.location.href = "https://www.tiktok.com"}} transition={"all 300ms ease-in-out"} _hover={{cursor: "pointer", color: "#2F3F89"}} as={FaTiktok}/> */}
        </Flex>
      </Box>
    </Box>
  )
}

export default Footer