import { Box, Heading, Image, Text } from "@chakra-ui/react"
// import Naija from "../assets/Naija.jpg"
// import Naija2 from "../assets/Naija2.png"
// import Naija4 from "../assets/Naija3.png"
import Arrow from "../assets/Arrow.png"
import { useNavigate } from "react-router-dom"

interface Props {
    intro: string
}

const HomeIntro = ({intro}: Props) => {

    const navigate = useNavigate()

    // const AboutUsIntro = "What Makes a Space Nigerian (W.M.A.S.N) is a dynamic collective dedicated to the exploration and reinterpretation of various Nigerian architectural typologies. By employing a speculative yet anthropologic approach, the collective aims to advance the development of architectural spaces that resonate deeply with the diverse cultures of Nigeria.\n\nOur primary method of engaging with these ideas is through thoughtfully curated exhibitions, which serve as a powerful design device. These exhibitions are meticulously crafted to provoke and stimulate meaningful conversations about the unique and evolving typologies within Nigerian architecture. Through this dialogue, we strive to foster a greater understanding and appreciation of the cultural nuances that should inform the design of spaces within Nigeria."

    // const AboutUsIntro = "What makes a space Nigerian (W.M.A.S.N) is a collective that explores different Nigerian typologies in a speculative yet anthropologic manner to further progress the cultivation of architectural spaces that respond appropriately to Nigerian cultures.\n\nWe largely do this by using exhibitions as a design device to stimulate conversations surrounding Nigerian typologies."

    return (
        <Box width={"100%"} bg={"#2c2c2c"} color={"white"} height={"fit-content"} p={"2em 0em"} position={"relative"} display={"flex"} justifyContent={"center"} fontFamily={"swis721-ex-bt"}>
            {/* <Box position={"absolute"} top={"0%"} margin={"0 auto"} left={"0%"} right={"0%"} bg={"#FBFBFB"} width={"85%"} h={"80%"} borderRadius={"2em"} ></Box> */}
            <Box display={"flex"} width={"100%"} h={"100%"} flexDirection={"column"} justifyContent={"start"} alignItems={"center"} gap={"2em"}>
                <Heading size={"xl"} width={{base: "80%", md: "50%"}} textAlign={{base: "center", lg: "left"}} fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} letterSpacing={"2px"}>ABOUT US</Heading>
                <Box width={{base: "80%", md: "50%"}} mt={4} display={"flex"} alignItems={{base: "center", lg: "start"}} justifyContent={"center"} flexDirection={"column"} gap={"2em"} >
                    <Text whiteSpace={"pre-wrap"} fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"}>{intro}</Text>
                    <Box onClick={() => {navigate("/about")}} mt={4} borderRadius={"0em"} bg={"white"} letterSpacing={"3px"} display={"flex"} alignItems={"center"} justifyContent={"center"} padding={"0.5em 1em"} cursor={"pointer"} color={"#2c2c2c"} transition={"all 300ms ease-in-out"} _hover={{padding: "0.5em 1.5em"}}>
                        <Text transform={"scaleY(1.25)"}>LEARN MORE</Text>
                        <Image w={"2em"} src={Arrow} alt="arrow link"/>
                    </Box>
                </Box>
            </Box>
        </Box>
      )
}

export default HomeIntro