import { Box, Button, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { addTeamMember, TeamMember } from '../data/Team'
import { useRef, useState } from 'react'
import EditMember from './EditMember'

interface Props {
  theTeam: TeamMember[]
  setTheTeam: React.Dispatch<React.SetStateAction<TeamMember[]>>
  id: string | undefined
}

const OurTeamView = ({theTeam, setTheTeam, id}: Props) => {

  const {onOpen, isOpen, onClose} = useDisclosure()

  const [name, setName] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [linkedinName, setLinkedinName] = useState<string>("")
  const [linkedinLink, setLinkedinLink] = useState<string>("")
  const [instagramName, setInstagramName] = useState<string>("")
  const [instagramLink, setInstagramLink] = useState<string>("")
  const [xName, setXName] = useState<string>("")
  const [xLink, setXLink] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const imgRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

  const checkInputs = () => {
    if (name === "" || role === "" || description === "" ){
      return false
    }
    return true
  }

  const addNewMember = async () => {
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
    const newMember = {
      name: name,
      role: role,
      photo: undefined,
      description: description,
      contact: {
          linkedin: {
              show: linkedinName !== "" || linkedinLink !== "" ? true : false,
              handle: linkedinName,
              link: linkedinLink
          },
          instagram: {
              show: instagramName !== "" || instagramLink !== "" ? true : false,
              handle: instagramName,
              link: instagramLink,
          },
          x: {
              show: xName !== "" || xLink !== "" ? true : false,
              handle: xName,
              link: xLink,
          },
      },
    }
    const res = await addTeamMember(theTeam, newMember, id as string, imgRef.current?.files?.[0])
    if (res === "success"){
      setLoading(false)
      onClose()
      toast({
        status: "success",
        title: "Added New Item",
        duration: 5000,
        position: "top"
      })
    } else {
      setLoading(false)
      toast({
        status: "error",
        title: "Error Adding Item. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  return (
    <HStack w={"100%"} flexWrap={"wrap"} justify={"center"}>
      <Box mb={"1em"} as="button" onClick={onOpen} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} w={"13em"} padding={"0.75em 0em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{ bg: "#2F3F89" }}>
        <Text letterSpacing={"3px"}>
          ADD A MEMBER
        </Text>
      </Box>
      {theTeam.map((member, i) => {
        return (
          <EditMember team={theTeam} member={member} index={i} id={id} setTheTeam={setTheTeam}/>
        )
      })}
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack w={"100%"}>
              <Heading letterSpacing={"5px"}>
                ADD NEW MEMBER
              </Heading>
              <HStack>
                <Box display={"flex"} flexDirection={"column"}>
                  <Input type="file" ref={imgRef}/>
                  <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} color={"white"}>
                    IMAGE 1 (Primary)
                  </Box>
                </Box>
              </HStack>
              <VStack w={"90%"} spacing={"1.1em"}>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Name</FormLabel>
                  <Input value={name} onChange={(e) => {setName(e.target.value)}} name="Name" id="Name" type={"text"} placeholder="Name of member" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Role</FormLabel>
                  <Input value={role} onChange={(e) => {setRole(e.target.value)}} name="Role" id="Role" type={"text"} placeholder="Member's Role e.g. Curator" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Description</FormLabel>
                  <Input value={description} onChange={(e) => {setDescription(e.target.value)}} name="Description" id="Description" type={"text"} placeholder="Member Description" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Linkedin Name</FormLabel>
                  <Input value={linkedinName} onChange={(e) => {setLinkedinName(e.target.value)}} name="LinkedinName" id="LinkedinName" type={"text"} placeholder="Linkedin Name" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Linkedin Link</FormLabel>
                  <Input value={linkedinLink} onChange={(e) => {setLinkedinLink(e.target.value)}} name="LinkedinLink" id="LinkedinLink" type={"text"} placeholder="Link to Account" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Instagram Name</FormLabel>
                  <Input value={instagramName} onChange={(e) => {setInstagramName(e.target.value)}} name="InstagramName" id="InstagramName" type={"text"} placeholder="Instagram Username" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Instagram Link</FormLabel>
                  <Input value={instagramLink} onChange={(e) => {setInstagramLink(e.target.value)}} name="InstagramLink" id="InstagramLink" type={"text"} placeholder="Link to Account" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">X Name</FormLabel>
                  <Input value={xName} onChange={(e) => {setXName(e.target.value)}} name="XName" id="XName" type={"text"} placeholder="X Username" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">X Link</FormLabel>
                  <Input value={xLink} onChange={(e) => {setXLink(e.target.value)}} name="XLink" id="XLink" type={"text"} placeholder="Link to Account" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Button isLoading={loading} onClick={addNewMember} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                  <Text letterSpacing={"3px"}>SAVE</Text>
                </Button>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  )
}

export default OurTeamView