import { useRef, useState } from 'react'
import { editGalleryImage, GalleryImage, removeGalleryImg } from '../data/GalleryImgs'
import { Box, Button, ButtonGroup, FormLabel, Heading, HStack, Image, Input, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { serverTimestamp } from 'firebase/firestore'
import LoadButton from './LoadButton'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface Props {
  img: GalleryImage
}

const EditGallery = ({img}: Props) => {

  const {onOpen, isOpen, onClose} = useDisclosure()

  const [by, setBy] = useState<string>(img.by)
  const [description, setDescription] = useState<string>(img.description)
  const [remove, setRemove] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const imgRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

  const updateGalleryImage = async () => {
    setLoading(true)
    if (by === "" || description === "" || (imgRef.current?.files === null || imgRef.current?.files === undefined)){
      toast({
        status: "error",
        title: "Missing Input",
        description: "Please make sure you have entered value for all inputs and file has been added",
        duration: 5000,
        position: "top"
      })
      setLoading(false)
      return 
    }
    const res = await editGalleryImage({
      id: img.id,
      by: by,
      description: description,
      src: imgRef.current?.files,
      date: `${serverTimestamp()}`,
      filename: img.filename
    })
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Edited Gallery Image",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Editing Gallery Photo. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
    setLoading(false)
  }

  const deleteGalleryImg = async () => {
    const res = await removeGalleryImg(img)
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Gallery Photo Removed",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Removing Gallery Photo. Try Again.",
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
        await deleteGalleryImg()
    }
  }

  // console.log(img)

  return (
    <VStack w={{ base: "90%", md: "40%", lg: "30%", xl: "22%" }} aspectRatio={"1/1"} >
      <ButtonGroup>
        <Button onClick={onOpen} color={"white"} bg={"green"}>Edit Photo</Button>
        <Button onClick={removeConfirm} color={"white"} bg={"red"}>Remove Photo</Button>
      </ButtonGroup>
      <VStack w={"100%"} aspectRatio={"1/1"} justify={"center"} spacing={0}>
        <Box w={"100%"} h={"90%"}>
          <Image as={LazyLoadImage} loading='lazy' src={img.src} w={"100%"} h={"100%"} objectFit={"contain"} alt='Image of an artefact'/>
        </Box>
        <Box w={"100%"} h={"10%"} textAlign={"center"}>
          <Text>By: {img.by}</Text>
          <Text>Desc: {img.description}</Text>
        </Box>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <VStack w={"100%"}>
                <Heading letterSpacing={"5px"}>
                  EDIT GALLERY
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
                    <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Curated By</FormLabel>
                    <Input value={by} onChange={(e) => {setBy(e.target.value)}} name="By" id="By" type={"text"} placeholder="Name of curator" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                    <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Description</FormLabel>
                    <Input value={description} onChange={(e) => {setDescription(e.target.value)}} name="Description" id="Description" type={"text"} placeholder="Image Description" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                  </Box>
                  <LoadButton loading={loading}>
                    <Box as="button" onClick={updateGalleryImage} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                      <Text letterSpacing={"3px"}>SAVE</Text>
                    </Box>
                  </LoadButton>
                  
                </VStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
    </VStack>
  )
}

export default EditGallery