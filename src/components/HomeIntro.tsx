import { Box, Heading, Image, Text } from "@chakra-ui/react"
// import Naija from "../assets/Naija.jpg"
// import Naija2 from "../assets/Naija2.png"
// import Naija4 from "../assets/Naija3.png"
import Arrow from "../assets/Arrow.png"
import { useNavigate } from "react-router-dom"

const HomeIntro = () => {

    const navigate = useNavigate()

    // const AboutUsIntro = "What Makes a Space Nigerian (W.M.A.S.N) is a dynamic collective dedicated to the exploration and reinterpretation of various Nigerian architectural typologies. By employing a speculative yet anthropologic approach, the collective aims to advance the development of architectural spaces that resonate deeply with the diverse cultures of Nigeria.\n\nOur primary method of engaging with these ideas is through thoughtfully curated exhibitions, which serve as a powerful design device. These exhibitions are meticulously crafted to provoke and stimulate meaningful conversations about the unique and evolving typologies within Nigerian architecture. Through this dialogue, we strive to foster a greater understanding and appreciation of the cultural nuances that should inform the design of spaces within Nigeria."

    const AboutUsIntro = "What makes a space Nigerian (W.M.A.S.N) is a collective that explores different Nigerian typologies in a speculative yet anthropologic manner to further progress the cultivation of architectural spaces that respond appropriately to Nigerian cultures.\n\nWe largely do this by using exhibitions as a design device to stimulate conversations surrounding Nigerian typologies."

    return (
        <Box width={"100%"} bg={"#2c2c2c"} color={"white"} height={"fit-content"} p={"2em 0em"} position={"relative"} display={"flex"} justifyContent={"center"} fontFamily={"Roboto"}>
            {/* <Box position={"absolute"} top={"0%"} margin={"0 auto"} left={"0%"} right={"0%"} bg={"#FBFBFB"} width={"85%"} h={"80%"} borderRadius={"2em"} ></Box> */}
            <Box display={"flex"} width={"100%"} h={"100%"} flexDirection={"column"} justifyContent={"start"} alignItems={"center"} gap={"1em"}>
                <Heading size={"xl"} width={"50%"} fontFamily={"Roboto"} letterSpacing={"5px"}>ABOUT US</Heading>
                <Box width={"50%"} display={"flex"} alignItems={"start"} justifyContent={"center"} flexDirection={"column"} gap={"1em"} >
                    <Text whiteSpace={"pre-wrap"} fontFamily={"Roboto"}>{AboutUsIntro}</Text>
                    <Box onClick={() => {navigate("/about")}} borderRadius={"0em"} bg={"white"} letterSpacing={"3px"} display={"flex"} alignItems={"center"} justifyContent={"center"} padding={"0.5em 1em"} cursor={"pointer"} color={"#2c2c2c"} transition={"all 300ms ease-in-out"} _hover={{padding: "0.5em 1.5em"}}>
                        <Text>LEARN MORE</Text>
                        <Image w={"2em"} src={Arrow} alt="arrow link"/>
                    </Box>
                </Box>
            </Box>
        </Box>
      )
}

export default HomeIntro