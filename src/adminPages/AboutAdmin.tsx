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
import { editAboutUsText, getAboutUsInfo, TeamMember } from "../data/Team";
import OurTeamView from "../adminComponents/OurTeamView";
import { useNavigate } from "react-router-dom";
import { ContextAPI, ContextData } from "../context/ContextProvider";

const AboutAdmin = () => {

  const toast = useToast()

  const [id, setId] = useState<string | undefined>("")
  const [subtitle, setSubtitle] = useState<string>("")
  const [ourStory, setOurStory] = useState<string>("")
  const [theTeam, setTheTeam] = useState<TeamMember[]>([])

  const fetchAboutUsInfo = async () => {
    const res = await getAboutUsInfo()
    if (res === "error"){
      toast({
        status: "error",
        title: "Error Fetching Data. Please Refresh.",
        duration: 5000,
        position: "top"
      })
    } else {
      setSubtitle(res[0]?.subtitle)
      setOurStory(res[0]?.ourStory)
      setTheTeam(res[0]?.theTeam)
      setId(res[0]?.id)
    }
  }

  const editSubtitleAndOurStory = async () => {
    if (subtitle === "" || ourStory === ""){
      toast({
        title: "Missing Inputs",
        description: "Please make sure to fill out all inputs",
        status: "error", 
        duration: 5000
      })
    } else {
      const res = await editAboutUsText({
        id: id,
        subtitle: subtitle,
        ourStory: ourStory,
        theTeam: theTeam
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

  useEffect(() => {
    fetchAboutUsInfo()

  }, [])

  const navigate = useNavigate()

  const {loggedIn} = useContext(ContextAPI) as ContextData

  if (!loggedIn) {
    navigate("/admin")
  }

  return (
    <Box bg={"white"} w={"100vw"} h={"100vh"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"1em"}>
      <NavbarAdmin />
      <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
        ABOUT US ADMIN
      </Heading>
      <Tabs w={"95%"}>
        <TabList>
          <Tab>Subtitle</Tab>
          <Tab>Our Story</Tab>
          <Tab>The Team</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display={"flex"} flexDir={"column"} justifyContent={"center"}>
            <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
              <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">SUBTITLE</FormLabel>
              <Input as={"textarea"} whiteSpace={"pre-wrap"} h={"10em"} value={subtitle} onChange={(e) => {setSubtitle(e.target.value)}} name="Subtitle" id="Subtitle" type={"text"} fontFamily={"Roboto"} placeholder="Message here..." border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
            </Box>
            <Box as="button" onClick={editSubtitleAndOurStory}  borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
              <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>SAVE</Text>
            </Box>
          </TabPanel>
          <TabPanel display={"flex"} flexDir={"column"} justifyContent={"center"}>
            <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
              <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">OUR STORY</FormLabel>
              <Input as={"textarea"} whiteSpace={"pre-wrap"} h={"10em"} value={ourStory} onChange={(e) => {setOurStory(e.target.value)}} name="Our Story" id="Our Story" type={"text"} fontFamily={"Roboto"} placeholder="Message here..." border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
            </Box>
            <Box as="button" onClick={editSubtitleAndOurStory}  borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
              <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>SAVE</Text>
            </Box>
          </TabPanel>
          <TabPanel display={"flex"} justifyContent={"center"}>
            <OurTeamView theTeam={theTeam} id={id}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default AboutAdmin