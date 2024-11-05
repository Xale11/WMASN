import { Box, Heading, HStack, Image, Text, useToast, VStack } from "@chakra-ui/react"
import aboutUsImg from "../assets/WMASN PHOTOS LR-42.jpg"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
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
        <Box bg={"white"} fontFamily={"swis721-ex-bt"} w={"100vw"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} gap={"1em"}>
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
            
            <VStack w={"100%"} justify={"center"} m={"1.4em 0em"} spacing={6}>
                <Heading fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} color={"#2F3F89"} letterSpacing={"2px"}>ABOUT US</Heading>
                <Text fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} textAlign={"center"} w={{base: "90%"}}>{subtitle}.</Text>
            </VStack>

            <HStack justify={"center"} w={"100%"} marginBottom={"2em"} color={"#2F3F89"} p={"2em 0em"} position={"relative"}>
                <VStack w={{base: "100%", xl: "50%"}} spacing={"3em"}>
                    <Text w={{base: "90%", lg: "90%"}} fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} whiteSpace={"pre-wrap"}>{ourStory}</Text>
                </VStack>

                <VStack display={{base: "none", xl: "flex"}} maxH={"20%"} maxW={{base: "40%"}}>
                    <Image objectFit={"contain"} src={aboutUsImg}/>
                </VStack>
            </HStack>

            <VStack w={"100%"} justify={"start"} m={"1.4em 0em"}>
                <Heading fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} letterSpacing={"5px"}>Team</Heading>
            </VStack>

            <MeetTheTeam theTeam={theTeam}/>

            <Footer/>
        </Box>
      )

}

export default AboutUs