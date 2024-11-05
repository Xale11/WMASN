import { Box, Button, ButtonGroup, Card, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalContent, ModalOverlay, Popover, PopoverCloseButton, PopoverContent, PopoverTrigger, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { deleteProject, editProject, Project, SectionContent } from '../data/Projects'
import AddLiveSection from './AddLiveSection'
import EditLiveSection from './EditLiveSection'

interface Props {
  project: Project
  projList: Project[]
  index: number
}

const EditProject = ({project, index}: Props) => {

  const [name, setName] = useState<string>(project.name)
  const [description, setDescription] = useState<string>(project.description)
  const [showAddSection, setShowAddSection] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [sectionList, setSectionList] = useState<SectionContent[]>(project.sections ?? [])

  const {onOpen, isOpen, onClose} = useDisclosure()

  const imgRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

  const checkInputs = () => {
    if (name === "" || description === "" ){
      return false
    }
    return true
  }

  const editCurrentProject = async () => {
    setLoading(true)
    if (!checkInputs()){
      toast({
        status: "error",
        title: "Missing Input",
        description: "Please make sure you have entered value for all inputs",
        duration: 5000,
        position: "top"
      })
      setLoading(false)
      return 
    }

    const newProj: Project = {
      id: project.id,
      name: name,
      description: description,
      img: project.img,
      imgPath: project.imgPath,
      sections: sectionList
    }

    const res = await editProject(newProj, imgRef.current?.files?.[0])
    if (res === "success"){
      setLoading(false)
      onClose()
      toast({
        status: "success",
        title: "Edited Project",
        duration: 5000,
        position: "top"
      })
    } else {
      setLoading(false)
      toast({
        status: "error",
        title: "Error Editing Project. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  const removeCurrentProject = async () => {
    setDeleteLoading(true)
    if (!checkInputs()){
      toast({
        status: "error",
        title: "Missing Input",
        description: "Please make sure you have entered value for all inputs",
        duration: 5000,
        position: "top"
      })
      setDeleteLoading(false)
      return 
    }
    const res = await deleteProject({
      id: project.id,
      name: name,
      description: description,
      img: project.img,
      imgPath: project.imgPath,
      sections: sectionList
    })
    if (res === "success"){
      setDeleteLoading(false)
      onClose()
      toast({
        status: "success",
        title: "Project Deleted",
        duration: 5000,
        position: "top"
      })
    } else {
      setDeleteLoading(false)
      toast({
        status: "error",
        title: "Error Deleting Project. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  console.log(sectionList)

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
            <Heading letterSpacing={"5px"}>
              Edit Project
            </Heading>
            <ButtonGroup>
              <Button isLoading={loading} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                <Text onClick={editCurrentProject} letterSpacing={"3px"}>SAVE</Text>
              </Button>
              <Popover>
                <PopoverTrigger >
                  <Button bg={"red.500"} color={"white"}>Delete Project</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <VStack mb={1}>
                    <Text>Are You Sure?</Text>
                    <ButtonGroup>
                      <Button isLoading={deleteLoading} onClick={removeCurrentProject}>Yes</Button>
                      <PopoverCloseButton fontSize={"md"}>X</PopoverCloseButton>
                    </ButtonGroup>
                  </VStack>
                </PopoverContent>
              </Popover>
            </ButtonGroup>
            <HStack>
              <Box display={"flex"} flexDirection={"column"}>
                <Input type="file" ref={imgRef}/>
                <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
                  IMAGE 1 (Primary)
                </Box>
              </Box>
            </HStack>
            <VStack w={"90%"} spacing={"1.1em"}>
              <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Name</FormLabel>
                <Input value={name} onChange={(e) => {setName(e.target.value)}} name="Name" id="Name" type={"text"} placeholder="Name of project" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
              </Box>
              <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Description</FormLabel>
                <Input value={description} onChange={(e) => {setDescription(e.target.value)}} name="Description" id="Description" type={"text"} placeholder="Project Description" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
              </Box>
              <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Sections</FormLabel>
                {/* <Input as={"textarea"} value={textContent} onChange={(e) => {setTextContent(e.target.value)}} h={"10em"} name="Role" id="Role" type={"text"} placeholder="Text Content of Project" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/> */}
                {!showAddSection && <Button onClick={() => {setShowAddSection(true)}} bg={"#2c2c2c"} mx={"auto"} mb={1} color={"white"}>Add Section</Button>}
                {showAddSection && <AddLiveSection setShowAddSection={setShowAddSection} setSectionList={setSectionList} sectionList={sectionList}/>}
                {sectionList.map((section, i) => {
                  return (<EditLiveSection section={section} sectionList={sectionList} setSectionList={setSectionList} index={i}/>)
                })}
              </Box>
              <Button isLoading={loading} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                <Text onClick={editCurrentProject} letterSpacing={"3px"}>SAVE</Text>
              </Button>
            </VStack>
          </VStack>
        </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default EditProject