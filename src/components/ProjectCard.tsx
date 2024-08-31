import { Box, Button, Card, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
// import CardImage from "../assets/CardImage.jpg"
import { Project } from "../data/Projects"
import ProjectPage from "../pages/ProjectPage"

interface Props {
  project: Project
}

const ProjectCard = ({project} : Props) => {

  const {onOpen, onClose, isOpen} = useDisclosure()

    //console.log(project)

  return (
    <Card onClick={onOpen} transition={"300ms all ease-in-out"} _hover={{boxShadow: "0px 4px 20px rgba(0, 0, 0, 1)", cursor: "pointer"}} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.7)"} display={"flex"} justifyContent={"end"} position={"relative"} w={{base: "100%", sm: "49.5%", lg: "24%"}} aspectRatio={"3 / 2"} backgroundImage={project.img} backgroundSize={"cover"} backgroundRepeat={"no-repeat"} backgroundPosition={"center"}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"45%"} bg={"#333333"} opacity={"95%"} marginBottom={"1em"}>
            <Heading w={"90%"} size={"md"} opacity={"100%"} color={"white"} fontFamily={"Roboto"}>What Makes a Space Nigeria? - Home Edition</Heading>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
          <ModalOverlay/>
          <ModalCloseButton/>
          <ModalContent>
            <ModalBody display={"flex"} flexDirection={"column"} gap={"1em"}>
              <Button onClick={onClose}>Close</Button>
              <ProjectPage project={project}/>
            </ModalBody>
          </ModalContent>
        </Modal>
    </Card>
  )
}

export default ProjectCard