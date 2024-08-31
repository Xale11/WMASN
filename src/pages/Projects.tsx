import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react"
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

  return (
    <Box w={"100vw"} display={"flex"} flexDir={"column"} gap={"1em"}>
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
        <Box marginLeft={"4em"}>
          <Text  color={"#bdbdbd"} fontSize={"2em"}>Our</Text>
          <Heading  color={"#2F3F89"} size={"xl"}>Projects</Heading>
        </Box>
        <Flex alignSelf={"center"} justifyContent={"start"} width={"calc(100% - 8em)"} flexWrap={"wrap"} rowGap={"1em"} columnGap={"1%"}>
           
           {projList.map((project) => {
            return (<ProjectCard project={project}/>)
           })}
           {/* <ProjectCard/> */}

        </Flex>
        <Footer/>
    </Box>
  )
}

export default Projects