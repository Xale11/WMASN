import { Box, Card, Heading } from "@chakra-ui/react"
import ProjectCover from "../assets/ProjectCover.png"
import { useNavigate } from "react-router-dom"

const ProjectCard = () => {

    const navigate = useNavigate()

  return (
    <Card onClick={() => {navigate("/project/1")}} transition={"300ms all ease-in-out"} _hover={{boxShadow: "0px 4px 20px rgba(0, 0, 0, 1)", cursor: "pointer"}} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.7)"} display={"flex"} justifyContent={"end"} position={"relative"} w={{base: "100%", sm: "49.5%", lg: "24%"}} aspectRatio={"3 / 2"} backgroundImage={ProjectCover} backgroundSize={"cover"} backgroundRepeat={"no-repeat"} backgroundPosition={"center"}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"45%"} bg={"#333333"} opacity={"95%"} marginBottom={"1em"}>
            <Heading w={"90%"} size={"md"} opacity={"100%"} color={"white"} fontFamily={"Roboto"}>What Makes a Space Nigeria? - Home Edition</Heading>
        </Box>
    </Card>
  )
}

export default ProjectCard