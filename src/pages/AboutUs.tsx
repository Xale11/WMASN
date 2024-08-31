import { Box, Heading, HStack, Icon, Image, Text, useToast, VStack } from "@chakra-ui/react"
// import Naija from "../assets/Naija.jpg"
// import Naija2 from "../assets/Naija2.png"
// import Naija4 from "../assets/Naija3.png"
import WMASN from "../assets/WMASN.png"
// import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { LiaLongArrowAltDownSolid } from "react-icons/lia";
import MeetTheTeam from "../components/MeetTheTeam";
import { getAboutUsInfo, TeamMember } from "../data/Team";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const AboutUs = () => {
    const [ourStory, setOurStory] = useState<string>("")
    const [subtitle, setSubtitle] = useState<string>("")
    const [theTeam, setTheTeam] = useState<TeamMember[]>([])

    const toast = useToast()

    // const navigate = useNavigate()


    // const ourStoryText = "What Makes a Space Nigerian (W.M.A.S.N) is a collective dedicated to exploring and redefining Nigerian architecture. Through speculative exhibitions, we delve into the diverse typologies of Nigerian spaces, blending anthropological insight with creative vision to highlight how architecture can more deeply resonate with Nigerian cultures.\n\nOur work is driven by the belief that architecture should reflect and respond to the unique cultural and environmental contexts in which it exists. By using exhibitions as a platform, we stimulate conversations and inspire new approaches to designing spaces that authentically represent and serve Nigerian communities."
    

    useEffect(() => {
        const getAboutPageData = async () => {
            try {
                const data = await getAboutUsInfo()
                if (data !== "error"){
                    setOurStory(data[0].ourStory)
                    setSubtitle(data[0].subtitle)
                    setTheTeam(data[0].theTeam)
                } else {
                    toast({
                        title: "Error Fetching Team Data",
                        status: "error",
                        isClosable: true,
                        duration: 3000
                    })
                }
            } catch (error) {
                toast({
                    title: "Error Fetching Team Data",
                    status: "error",
                    isClosable: true,
                    duration: 3000
                })
            }
        }
        getAboutPageData()
    }, [])

    return (
        <Box bg={"white"} w={"100vw"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} gap={"1em"}>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>WMASN | Nigerian Architecture, Artifacts & Spaces by Moyo Adebayo</title>
                <meta 
                    name="description" 
                    content="Learn our story and meet the WMASN team. What Makes a Space Nigerian (W.M.A.S.N) explores Nigerian architecture through speculative exhibitions." 
                />
                </Helmet>
            <Navbar/>
            
            <VStack w={"100%"} justify={"center"} m={"1.4em 0em"}>
                <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>ABOUT US</Heading>
                <Text fontFamily={"Roboto-Light"} textAlign={"center"} w={{base: "90%"}}>{subtitle}.</Text>
            </VStack>

            <HStack w={"100%"} bg={"#2c2c2c"} marginBottom={"2em"} color={"white"} p={"2em 0em"} position={"relative"}>
                <VStack display={{base: "none", xl: "flex"}}  w={{base: "50%"}}>
                    <Image src={WMASN}/>
                </VStack>

                <VStack w={{base: "100%", xl: "50%"}} spacing={"3em"}>
                    <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>OUR STORY</Heading>
                    <Text w={{base: "90%", lg: "50%"}} fontFamily={"Roboto"} textAlign={"center"} whiteSpace={"pre-wrap"}>{ourStory}</Text>
                </VStack>
                <Box position={"absolute"} display={{base: "none", xl: "flex"}} bottom={5} left={0} right={0} margin={"0 auto"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} w={"fit-content"}>
                    <Text fontFamily={"Roboto-Light"} fontSize={"0.6em"}>meet the team</Text>
                    <Icon as={LiaLongArrowAltDownSolid} />
                </Box>
            </HStack>

            <MeetTheTeam theTeam={theTeam}/>

            <Footer/>
        </Box>
      )

}

export default AboutUs