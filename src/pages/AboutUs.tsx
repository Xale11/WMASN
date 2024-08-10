import { Box, Heading, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
// import Naija from "../assets/Naija.jpg"
// import Naija2 from "../assets/Naija2.png"
// import Naija4 from "../assets/Naija3.png"
import WMASN from "../assets/WMASN.png"
// import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { LiaLongArrowAltDownSolid } from "react-icons/lia";
import MeetTheTeam from "../components/MeetTheTeam";

const AboutUs = () => {

    // const navigate = useNavigate()

    const ourStoryText = "What Makes a Space Nigerian (W.M.A.S.N) is a collective dedicated to exploring and redefining Nigerian architecture. Through speculative exhibitions, we delve into the diverse typologies of Nigerian spaces, blending anthropological insight with creative vision to highlight how architecture can more deeply resonate with Nigerian cultures.\n\nOur work is driven by the belief that architecture should reflect and respond to the unique cultural and environmental contexts in which it exists. By using exhibitions as a platform, we stimulate conversations and inspire new approaches to designing spaces that authentically represent and serve Nigerian communities."
    

    return (
        <Box bg={"white"} w={"100vw"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} gap={"1em"}>
            <Navbar/>
            
            <VStack w={"100%"} justify={"center"} m={"1.4em 0em"}>
                <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>ABOUT US</Heading>
                <Text fontFamily={"Roboto-Light"} textAlign={"center"} w={{base: "90%"}}>What Makes a Space Nigerian (W.M.A.S.N) explores Nigerian architecture through speculative exhibitions.</Text>
            </VStack>

            <HStack w={"100%"} bg={"#2c2c2c"} marginBottom={"2em"} color={"white"} p={"2em 0em"} position={"relative"}>
                <VStack display={{base: "none", xl: "flex"}}  w={{base: "50%"}}>
                    <Image src={WMASN}/>
                </VStack>

                <VStack w={{base: "100%", xl: "50%"}} spacing={"3em"}>
                    <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>OUR STORY</Heading>
                    <Text w={{base: "90%", lg: "50%"}} fontFamily={"Roboto"} textAlign={"center"} whiteSpace={"pre-wrap"}>{ourStoryText}</Text>
                </VStack>
                <Box position={"absolute"} display={{base: "none", xl: "flex"}} bottom={5} left={0} right={0} margin={"0 auto"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} w={"fit-content"}>
                    <Text fontFamily={"Roboto-Light"} fontSize={"0.6em"}>meet the team</Text>
                    <Icon as={LiaLongArrowAltDownSolid} />
                </Box>
            </HStack>

            <MeetTheTeam/>

            <Footer/>
        </Box>
      )

}

export default AboutUs