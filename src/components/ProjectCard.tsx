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
    <Card onClick={onOpen} borderRadius={0} transition={"300ms all ease-in-out"} _hover={{boxShadow: "0px 4px 20px rgba(0, 0, 0, 1)", cursor: "pointer"}} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.0)"} display={"flex"} justifyContent={"end"} position={"relative"} w={{base: "100%", sm:  "90%"}} aspectRatio={{base: "3/1.5", md: "3 / 1", xl: "3 / 0.5"}} backgroundImage={project.img} backgroundSize={"cover"} backgroundRepeat={"no-repeat"} backgroundPosition={"center"}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"45%"} bg={"#2F3F89"} opacity={"95%"} _hover={{h: "55%"}} transition={"all 300ms ease-in-out"}>
            <Heading w={"90%"} size={{base: "xs", sm: "md"}} opacity={"100%"} color={"white"} fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"}>What Makes a Space Nigeria? - Home Edition</Heading>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
          <ModalOverlay/>
          <ModalCloseButton/>
          <ModalContent>
            <ModalBody display={"flex"} flexDirection={"column"} gap={"1em"} alignItems={"center"} overflowX={"hidden"}>
              <Button onClick={onClose} width={"fit-content"}>Close</Button>
              <ProjectPage project={project}/>
            </ModalBody>
          </ModalContent>
        </Modal>
    </Card>
  )
}

export default ProjectCard