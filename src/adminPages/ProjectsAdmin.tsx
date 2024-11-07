import { Box, Button, Flex, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalContent, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast, VStack} from "@chakra-ui/react";
import NavbarAdmin from "../adminComponents/NavbarAdmin";
import { useContext, useEffect, useRef, useState } from "react";
import { addNewProject, FirebaseSectionContent, getProjects, Project } from "../data/Projects";
import EditProject from "../adminComponents/EditProject";
import { useNavigate } from "react-router-dom";
import { ContextAPI, ContextData } from "../context/ContextProvider";
import AddSection from "../adminComponents/AddSection";
import EditSection from "../adminComponents/EditSection";

const ProjectsAdmin = () => {

  const [projList, setProjList] = useState<Project[]>([])
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [showAddSection, setShowAddSection] = useState<boolean>(false)
  const [sectionList, setSectionList] = useState<FirebaseSectionContent[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const {onOpen, isOpen, onClose} = useDisclosure()

  const imgRef = useRef<HTMLInputElement>(null)

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

  const checkInputs = () => {
    if (name === "" || description === "" ){
      return false
    }
    return true
  }

  const addProject = async () => {
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
    const res = await addNewProject({
      name: name,
      description: description,
      img: imgRef?.current?.files?.[0],
      sections: sectionList
    })
    if (res === "success"){
      setLoading(false)
      onClose()
      setName("")
      setDescription("")
      setSectionList([])
      toast({
        status: "success",
        title: "Added New Project",
        duration: 5000,
        position: "top"
      })
    } else {
      setLoading(false)
      toast({
        status: "error",
        title: "Error Adding Project. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const navigate = useNavigate()

  const {loggedIn} = useContext(ContextAPI) as ContextData

  if (!loggedIn) {
    navigate("/admin")
  }

  console.log(sectionList)

  return (
    <Box bg={"white"} w={"100vw"} h={"100vh"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"1em"}>
      <NavbarAdmin />
      <Heading letterSpacing={"5px"}>
        PROJECTS ADMIN
      </Heading>
      <Tabs w={"95%"}>
        <TabList>
          <Tab>Projects</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display={"flex"} flexDirection={"column"} alignItems={"center"} >
            <Box mb={"1em"} as="button" onClick={onOpen} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} w={"13em"} padding={"0.75em 0em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{ bg: "#2F3F89" }}>
              <Text  letterSpacing={"3px"}>
                ADD NEW PROJECT
              </Text>
            </Box>
            <Flex flexDirection={"row"} alignSelf={"center"} justifyContent={"start"} width={"calc(100%)"} flexWrap={"wrap"} rowGap={"1em"} columnGap={"1%"}>
              {projList.map((project, i) => {
                return (
                  <EditProject project={project} projList={projList} index={i}/>
                )
              })}
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <VStack w={"100%"}>
                    <Heading letterSpacing={"5px"}>
                      Edit Project
                    </Heading>
                    <Button isLoading={loading} onClick={addProject} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                      <Text letterSpacing={"3px"}>SAVE</Text>
                    </Button>
                    <HStack>
                      <Box display={"flex"} flexDirection={"column"}>
                        <Input type="file" ref={imgRef}/>
                        <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"}  color={"white"}>
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
                        {showAddSection && <AddSection setShowAddSection={setShowAddSection} setSectionList={setSectionList} sectionList={sectionList}/>}
                        {sectionList.map((section, i) => {
                          return (<EditSection section={section} sectionList={sectionList} setSectionList={setSectionList} index={i}/>)
                        })}
                      </Box>
                      <Button isLoading={loading} onClick={addProject} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                        <Text letterSpacing={"3px"}>SAVE</Text>
                      </Button>
                    </VStack>
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProjectsAdmin
