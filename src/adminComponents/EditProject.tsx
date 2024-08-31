import { Box, Button, Card, FormLabel, Heading, HStack, Image, Input, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { deleteProject, editProject, Project } from '../data/Projects'

interface Props {
  project: Project
  projList: Project[]
  index: number
}

const EditProject = ({project, projList, index}: Props) => {

  const [name, setName] = useState<string>(project.name)
  const [description, setDescription] = useState<string>(project.description)
  const [textContent, setTextContent] = useState<string>(project.textContent)

  const {onOpen, isOpen, onClose} = useDisclosure()

  const imgRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

  const checkInputs = () => {
    if (name === "" || description === "" || description === "" ){
      return false
    }
    return true
  }

  const editCurrentProject = async () => {
    if (!checkInputs()){
      toast({
        status: "error",
        title: "Missing Input",
        description: "Please make sure you have entered value for all inputs",
        duration: 5000,
        position: "top"
      })
      return 
    }
    const newProjList = [...projList]
    newProjList[index] = {
      name: name,
      textContent: textContent,
      description: description,
      img: undefined
    }

    const res = await editProject(newProjList, imgRef.current?.files?.[0], index)
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Edited Project",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Editing Project. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  const removeCurrentProject = async () => {
    if (!checkInputs()){
      toast({
        status: "error",
        title: "Missing Input",
        description: "Please make sure you have entered value for all inputs",
        duration: 5000,
        position: "top"
      })
      return 
    }
    const res = await deleteProject({
      name: name,
      description: description,
      textContent: textContent,
      img: undefined
    }, index)
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Project Deleted",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Deleting Project. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  return (
    <VStack w={"100%"}>
      <Button onClick={onOpen} bg={"green"} color={"white"}>Edit Project</Button>
      <Card transition={"300ms all ease-in-out"} _hover={{boxShadow: "0px 4px 20px rgba(0, 0, 0, 1)", cursor: "pointer"}} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.7)"} display={"flex"} justifyContent={"end"} position={"relative"} w={{base: "100%", sm: "49.5%", lg: "24%"}} aspectRatio={"3 / 2"} bg={"black"} backgroundImage={project.img} backgroundSize={"cover"} backgroundRepeat={"no-repeat"} backgroundPosition={"center"}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"45%"} bg={"#333333"} opacity={"95%"} marginBottom={"1em"}>
          <Heading fontFamily={"Roboto"} w={"90%"} size={"md"} opacity={"100%"} color={"white"}>{project.name}</Heading>
        </Box>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack w={"100%"}>
              <Box h={"65%"} w={"30%"}>
                <Image w={"100%"} h={"100%"} src={project.img} objectFit={"contain"} alt={"Image of product"}/>
              </Box>
              <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
                EDIT Project
              </Heading>
              <HStack>
                <Box display={"flex"} flexDirection={"column"}>
                  <Input type="file" ref={imgRef}/>
                  <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
                    IMAGE 1 (Primary)
                  </Box>
                  <Box  display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#FD2F2F"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
                    REMOVE IMAGE
                  </Box>
                </Box>
              </HStack>
              <VStack w={"90%"} spacing={"1.1em"}>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Name</FormLabel>
                  <Input value={name} onChange={(e) => {setName(e.target.value)}} name="Name" id="Name" type={"text"} fontFamily={"Roboto"} placeholder="Name of project" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Description</FormLabel>
                  <Input value={description} onChange={(e) => {setDescription(e.target.value)}} name="Description" id="Description" type={"text"} fontFamily={"Roboto"} placeholder="Project Description" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Text Content</FormLabel>
                  <Input as={"textarea"} value={textContent} onChange={(e) => {setTextContent(e.target.value)}} h={"10em"} name="Role" id="Role" type={"text"} fontFamily={"Roboto"} placeholder="Text Content of Project" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box as="button" onClick={editCurrentProject} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                  <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>SAVE</Text>
                </Box>
                <Box as="button" onClick={removeCurrentProject}  borderRadius={"0em"} bg={"#FD2F2F"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                  <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>DELETE</Text>
                </Box>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default EditProject