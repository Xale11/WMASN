import { Box, Card, Flex, Heading, Text } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import ProjectCard from "../components/ProjectCard"
import Footer from "../components/Footer"

const Projects = () => {
  return (
    <Box w={"100vw"} display={"flex"} flexDir={"column"} gap={"1em"}>
        <Navbar/>
        <Box marginLeft={"4em"}>
          <Text color={"#bdbdbd"} fontSize={"2em"}>Our</Text>
          <Heading color={"#2F3F89"} size={"xl"}>Projects</Heading>
        </Box>
        <Flex alignSelf={"center"} justifyContent={"start"} width={"calc(100% - 8em)"} flexWrap={"wrap"} rowGap={"1em"} columnGap={"1%"}>
           
           <ProjectCard/>

           <Card transition={"300ms all ease-in-out"} _hover={{boxShadow: "0px 4px 20px rgba(0, 0, 0, 1)", cursor: "pointer"}} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.7)"} display={"flex"} justifyContent={"end"} position={"relative"} w={{base: "100%", sm: "49.5%", lg: "24%"}} aspectRatio={"3 / 2"} bg="black">
              <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"45%"} bg={"#333333"} opacity={"95%"} marginBottom={"1em"}>
                  <Heading w={"90%"} size={"md"} opacity={"100%"} color={"white"}>New Project Coming Soon!</Heading>
              </Box>
          </Card>

          <Card transition={"300ms all ease-in-out"} _hover={{boxShadow: "0px 4px 20px rgba(0, 0, 0, 1)", cursor: "pointer"}} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.7)"} display={"flex"} justifyContent={"end"} position={"relative"} w={{base: "100%", sm: "49.5%", lg: "24%"}} aspectRatio={"3 / 2"} bg="black">
              <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"45%"} bg={"#333333"} opacity={"95%"} marginBottom={"1em"}>
                  <Heading w={"90%"} size={"md"} opacity={"100%"} color={"white"}>New Project Coming Soon!</Heading>
              </Box>
          </Card>

          <Card transition={"300ms all ease-in-out"} _hover={{boxShadow: "0px 4px 20px rgba(0, 0, 0, 1)", cursor: "pointer"}} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.7)"} display={"flex"} justifyContent={"end"} position={"relative"} w={{base: "100%", sm: "49.5%", lg: "24%"}} aspectRatio={"3 / 2"} bg="black">
              <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"45%"} bg={"#333333"} opacity={"95%"} marginBottom={"1em"}>
                  <Heading w={"90%"} size={"md"} opacity={"100%"} color={"white"}>New Project Coming Soon!</Heading>
              </Box>
          </Card>
        </Flex>
        <Footer/>
    </Box>
  )
}

export default Projects