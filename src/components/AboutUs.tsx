import { Box, Heading, Image, Text } from "@chakra-ui/react"
// import Naija from "../assets/Naija.jpg"
// import Naija2 from "../assets/Naija2.png"
// import Naija4 from "../assets/Naija3.png"
import Arrow from "../assets/Arrow.png"
import { useNavigate } from "react-router-dom"

const AboutUs = () => {

    const navigate = useNavigate()

    // const AboutUsIntro = "What Makes a Space Nigerian (W.M.A.S.N) is a dynamic collective dedicated to the exploration and reinterpretation of various Nigerian architectural typologies. By employing a speculative yet anthropologic approach, the collective aims to advance the development of architectural spaces that resonate deeply with the diverse cultures of Nigeria.\n\nOur primary method of engaging with these ideas is through thoughtfully curated exhibitions, which serve as a powerful design device. These exhibitions are meticulously crafted to provoke and stimulate meaningful conversations about the unique and evolving typologies within Nigerian architecture. Through this dialogue, we strive to foster a greater understanding and appreciation of the cultural nuances that should inform the design of spaces within Nigeria."

    const AboutUsIntro = "What makes a space Nigerian (W.M.A.S.N) is a collective that explores different Nigerian typologies in a speculative yet anthropologic manner to further progress the cultivation of architectural spaces that respond appropriately to Nigerian cultures.\n\nWe largely do this by using exhibitions as a design device to stimulate conversations surrounding Nigerian typologies."

//   return (
//     <Box width={"100%"} height={"35em"} position={"relative"} display={"flex"} justifyContent={"center"}  bg={"#333333"}>
//         {/* <Box position={"absolute"} top={"0%"} margin={"0 auto"} left={"0%"} right={"0%"} bg={"#FBFBFB"} width={"85%"} h={"80%"} borderRadius={"2em"} ></Box> */}
//         <Box zIndex={1} display={"flex"} width={"100%"} h={"100%"} bg={"#333333"} borderRadius={"2em"}>
//             <Box width={"65%"} h={"100%"} display={"flex"} gap={"2em"} alignItems={"center"} justifyContent={"center"}>
//                 <VStack width={"30%"} spacing={"1em"} h={"80%"} justify={"center"}>
//                 <Image src={Naija2} width={"100%"} objectFit={"contain"} borderRadius={"1em"} alt="Image of nigerian city"/>
//                 <Image src={Naija4} width={"100%"} objectFit={"contain"} borderRadius={"1em"} alt="Image of nigerian city"/>
//                 </VStack>
//                 <Image src={Naija} h={"80%"} objectFit={"contain"} alignSelf={"center"}  borderRadius={"1em"} alt="Image of nigerian city"/>
//             </Box>
//             <Box width={"30%"} display={"flex"} alignItems={"start"} justifyContent={"center"} flexDirection={"column"} gap={"1em"} >
//                 <Heading size={"xl"} color={"white"}>About Us</Heading>
//                 <Text whiteSpace={"pre-wrap"} color={"white"}>{AboutUsIntro}</Text>
//                 <Box borderRadius={"0em"} bg={"white"} letterSpacing={"3px"} display={"flex"} alignItems={"center"} justifyContent={"center"} padding={"0.5em 1em"} cursor={"pointer"} transition={"all 300ms ease-in-out"} _hover={{padding: "0.5em 1.5em"}}>
//                     <Text>READ MORE</Text>
//                     <Image w={"2em"} src={Arrow} alt="arrow link"/>
//                 </Box>
//             </Box>
//         </Box>
//     </Box>
//   )

return (
    <Box width={"100%"} height={"fit-content"} p={"2em 0em"} position={"relative"} display={"flex"} justifyContent={"center"} bg={"white"} fontFamily={"Roboto"}>
        {/* <Box position={"absolute"} top={"0%"} margin={"0 auto"} left={"0%"} right={"0%"} bg={"#FBFBFB"} width={"85%"} h={"80%"} borderRadius={"2em"} ></Box> */}
        <Box display={"flex"} width={"100%"} h={"100%"} flexDirection={"column"} justifyContent={"start"} alignItems={"center"} gap={"1em"}>
            <Heading size={"xl"} width={"50%"}>About Us</Heading>
            <Box width={"50%"} display={"flex"} alignItems={"start"} justifyContent={"center"} flexDirection={"column"} gap={"1em"} >
                <Text whiteSpace={"pre-wrap"}>{AboutUsIntro}</Text>
                <Box onClick={() => {navigate("/projects")}} borderRadius={"0em"} bg={"white"} border={"1px solid #333333"}letterSpacing={"3px"} display={"flex"} alignItems={"center"} justifyContent={"center"} padding={"0.5em 1em"} cursor={"pointer"} transition={"all 300ms ease-in-out"} _hover={{padding: "0.5em 1.5em"}}>
                    <Text>SEE OUR WORK</Text>
                    <Image w={"2em"} src={Arrow} alt="arrow link"/>
                </Box>
            </Box>
        </Box>
    </Box>
  )

}

export default AboutUs