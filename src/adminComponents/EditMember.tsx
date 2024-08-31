import { Box, Button, FormLabel, Heading, HStack, Image, Input, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import TeamCard from '../components/TeamCard'
import { editTeamMember, removeTeamImg, TeamMember } from '../data/Team'

interface Props {
  team: TeamMember[]
  member: TeamMember
  index: number
  id: string | undefined
}

const EditMember = ({team, member, index, id}: Props) => {

  const {onOpen, isOpen, onClose} = useDisclosure()

  const [name, setName] = useState<string>(member.name)
  const [role, setRole] = useState<string>(member.role)
  const [description, setDescription] = useState<string>(member.description)
  const [linkedinName, setLinkedinName] = useState<string>(member.contact.linkedin.handle)
  const [linkedinLink, setLinkedinLink] = useState<string>(member.contact.linkedin.link)
  const [instagramName, setInstagramName] = useState<string>(member.contact.instagram.handle)
  const [instagramLink, setInstagramLink] = useState<string>(member.contact.instagram.link)
  const [xName, setXName] = useState<string>(member.contact.x.handle)
  const [xLink, setXLink] = useState<string>(member.contact.x.link)
  const [remove, setRemove] = useState<boolean>(false)

  const imgRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

  const checkInputs = () => {
    if (name === "" || role === "" || description === "" ){
      return false
    }
    return true
  }

  const editMember = async () => {
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
    const newTeam = [...team]
    newTeam[index] = {
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

    const res = await editTeamMember(newTeam, id as string, imgRef.current?.files?.[0], index)
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Added New Item",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Adding Item. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  const deleteTeamImg = async () => {
    const res = await removeTeamImg(index)
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Shipping Removed",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Removing Shipping. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  const removeConfirm = async () => {
    if (!remove){
      toast({
        title: "Are You Sure?",
        description: "Removal cannot be undone. Click again to confirm removal.",
        status: "error", 
        duration: 9000,
        position: "top",
        isClosable: true
      })
      setRemove(true)
    } else {
        await deleteTeamImg()
    }
  }

  return (
    <VStack>
        <Button bg={"green"} color={"white"} onClick={onOpen}>Edit Member</Button>
        <TeamCard member={member} flip={false}/>
        <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack w={"100%"}>
              <Box h={"65%"} w={"30%"}>
                <Image w={"100%"} h={"100%"} src={member.photo} objectFit={"contain"} alt={"Image of product"}/>
              </Box>
              <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
                EDIT MEMBER
              </Heading>
              <HStack>
                <Box display={"flex"} flexDirection={"column"}>
                  <Input type="file" ref={imgRef}/>
                  <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
                    IMAGE 1 (Primary)
                  </Box>
                  <Box onClick={removeConfirm} display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#FD2F2F"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
                    REMOVE IMAGE
                  </Box>
                </Box>
              </HStack>
              <VStack w={"90%"} spacing={"1.1em"}>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Name</FormLabel>
                  <Input value={name} onChange={(e) => {setName(e.target.value)}} name="Name" id="Name" type={"text"} fontFamily={"Roboto"} placeholder="Name of member" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Role</FormLabel>
                  <Input value={role} onChange={(e) => {setRole(e.target.value)}} name="Role" id="Role" type={"text"} fontFamily={"Roboto"} placeholder="Member's Role e.g. Curator" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Description</FormLabel>
                  <Input value={description} onChange={(e) => {setDescription(e.target.value)}} name="Description" id="Description" type={"text"} fontFamily={"Roboto"} placeholder="Member Description" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Linkedin Name</FormLabel>
                  <Input value={linkedinName} onChange={(e) => {setLinkedinName(e.target.value)}} name="LinkedinName" id="LinkedinName" type={"text"} fontFamily={"Roboto"} placeholder="Linkedin Name" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Linkedin Link</FormLabel>
                  <Input value={linkedinLink} onChange={(e) => {setLinkedinLink(e.target.value)}} name="LinkedinLink" id="LinkedinLink" type={"text"} fontFamily={"Roboto"} placeholder="Link to Account" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Instagram Name</FormLabel>
                  <Input value={instagramName} onChange={(e) => {setInstagramName(e.target.value)}} name="InstagramName" id="InstagramName" type={"text"} fontFamily={"Roboto"} placeholder="Instagram Username" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Instagram Link</FormLabel>
                  <Input value={instagramLink} onChange={(e) => {setInstagramLink(e.target.value)}} name="InstagramLink" id="InstagramLink" type={"text"} fontFamily={"Roboto"} placeholder="Link to Account" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">X Name</FormLabel>
                  <Input value={xName} onChange={(e) => {setXName(e.target.value)}} name="XName" id="XName" type={"text"} fontFamily={"Roboto"} placeholder="X Username" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">X Link</FormLabel>
                  <Input value={xLink} onChange={(e) => {setXLink(e.target.value)}} name="XLink" id="XLink" type={"text"} fontFamily={"Roboto"} placeholder="Link to Account" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box as="button" onClick={editMember} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                  <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>SAVE</Text>
                </Box>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default EditMember