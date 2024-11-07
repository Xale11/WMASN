import {
  Box,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import NavbarAdmin from "../adminComponents/NavbarAdmin";
import { useContext, useEffect, useState } from "react";
import { editContactDets, editIntro, getHomePageInfo } from "../data/HomeData";
import { useNavigate } from "react-router-dom";
import { ContextAPI, ContextData } from "../context/ContextProvider";

const HomeAdmin = () => {

  const toast = useToast()

  const [intro, setIntro] = useState<string>("")
  const [number, setNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [location, setLocation] = useState<string>("")

  const fetchHomePageInfo = async () => {
    const res = await getHomePageInfo()
    if (res === "error"){
      toast({
        status: "error",
        title: "Error Fetching Data. Please Refresh.",
        duration: 5000,
        position: "top"
      })
    } else {
      setIntro(res.intro)
      setNumber(res.number)
      setEmail(res.email)
      setLocation(res.location)
    }
  }

  const updateContactDets = async () => {
    if (number === "" || email === "" || location === ""){
      toast({
        title: "Missing Inputs",
        description: "Please make sure to fill out all inputs",
        status: "error", 
        duration: 5000
      })
    } else {
      const res = await editContactDets({
        number: number,
        intro: intro,
        email: email,
        location: location
      })
      if (res === "error"){
        toast({
          status: "error",
          title: "Error Updating Text. Please Try Again.",
          duration: 5000,
          position: "top"
        })
      } else {
        toast({
          status: "success",
          title: "Updated Successfully.",
          duration: 5000,
          position: "top"
        })
      }
    }
  }

  const updateIntro = async () => {
    if (intro === ""){
      toast({
        title: "Missing Inputs",
        description: "Please make sure to fill out all inputs",
        status: "error", 
        duration: 5000
      })
    } else {
      const res = await editIntro(intro)
      if (res === "error"){
        toast({
          status: "error",
          title: "Error Updating Text. Please Try Again.",
          duration: 5000,
          position: "top"
        })
      } else {
        toast({
          status: "success",
          title: "Updated Successfully.",
          duration: 5000,
          position: "top"
        })
      }
    }
  }
  

  useEffect(() => {
    fetchHomePageInfo()
  }, [])

  const navigate = useNavigate()

  const {loggedIn} = useContext(ContextAPI) as ContextData

  if (!loggedIn) {
    navigate("/admin")
  }

  return (
    <Box bg={"white"} w={"100vw"} h={"100vh"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"1em"}>
      <NavbarAdmin />
      <Heading  letterSpacing={"5px"}>
        HOME ADMIN
      </Heading>
      <Tabs w={"95%"}>
        <TabList>
          <Tab>About Us Intro</Tab>
          <Tab>Contact</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display={"flex"} flexDir={"column"} justifyContent={"center"}>
            <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
              <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">ABOUT US INTRO</FormLabel>
              <Input as={"textarea"} whiteSpace={"pre-wrap"} h={"10em"} value={intro} onChange={(e) => {setIntro(e.target.value)}} name="About Us Intro" id="About Us Intro" type={"text"}  placeholder="Message here..." border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
            </Box>
            <Box as="button" onClick={updateIntro} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
              <Text letterSpacing={"3px"}>SAVE</Text>
            </Box>
          </TabPanel>
          <TabPanel display={"flex"} flexDir={"column"} justifyContent={"center"} gap={"1em"}>
            <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
              <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">EMAIL</FormLabel>
              <Input whiteSpace={"pre-wrap"} value={email} onChange={(e) => {setEmail(e.target.value)}} name="EMAIL" id="EMAIL" type={"text"}  placeholder="Type here..." border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
            </Box>
            <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
              <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">NUMBER</FormLabel>
              <Input whiteSpace={"pre-wrap"} value={number} onChange={(e) => {setNumber(e.target.value)}} name="NUMBER" id="NUMBER" type={"text"}  placeholder="Type here..." border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
            </Box>
            <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
              <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">LOCATION</FormLabel>
              <Input whiteSpace={"pre-wrap"} value={location} onChange={(e) => {setLocation(e.target.value)}} name="LOCATION" id="LOCATION" type={"text"}  placeholder="Type here..." border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
            </Box>
            <Box as="button" onClick={updateContactDets} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
              <Text letterSpacing={"3px"}>SAVE</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HomeAdmin