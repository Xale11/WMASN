import { Box, Flex, Heading, Text, useToast, VStack } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import ProjectCard from "../components/ProjectCard"
import Footer from "../components/Footer"
import { getProjects, Project } from "../data/Projects"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"

const Projects = () => {

  const [projList, setProjList] = useState<Project[]>([])

  const toast = useToast()
 
  const fetchProjects = async () => {
    const res = await getProjects()
    if (res === "error"){
      toast({
        status: "error",
        title: "Error Fetching Data. Please Refresh.",
        duration: 5000,
        position: "top"
      })
    } else {
      setProjList(res)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  console.log(projList)

  return (
    <Box w={"100vw"} display={"flex"} flexDir={"column"} gap={"1em"} fontFamily={"swis721-ex-bt"}>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WMASN | Nigerian Architecture, Artifacts & Spaces by Moyo Adebayo</title>
        <meta 
            name="description" 
            content="A list of our architectural exhibitions. What Makes a Space Nigerian (W.M.A.S.N) explores Nigerian architecture through speculative exhibitions." 
        />
        </Helmet>
        <Navbar/>
        <VStack w={"100%"} justify={"center"} m={"1.4em 0em"} spacing={6}>
          <Heading fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} color={"#2F3F89"} letterSpacing={"2px"} textAlign={"center"}>Projects</Heading>
          <Text fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} textAlign={"center"} w={{base: "90%"}}>A list of our architectural projects & exhibitions where we explore Nigerian culture</Text>
        </VStack>  
        <Flex alignSelf={"center"} justifyContent={"center"} width={"calc(100% - 8em)"} flexWrap={"wrap"} rowGap={6} columnGap={"1%"}>
           {projList.map((project) => {
            return (<ProjectCard project={project}/>)
           })}
        </Flex>
        <Footer/>
    </Box>
  )
}

export default Projects