import { Box, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast, Modal, ModalBody, ModalContent, ModalOverlay, VStack, HStack, Input, FormLabel} from "@chakra-ui/react";
import NavbarAdmin from "../adminComponents/NavbarAdmin";
import { addGalleryImage, GalleryImage, getImages } from "../data/GalleryImgs";
import { useContext, useEffect, useRef, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import EditGallery from "../adminComponents/EditGallery";
import { useNavigate } from "react-router-dom";
import { ContextAPI, ContextData } from "../context/ContextProvider";

const GalleryAdmin = () => {

  const {onOpen, isOpen, onClose} = useDisclosure()

  const [by, setBy] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const imgRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<GalleryImage[][]>([]);

  const toast = useToast()

  const fetchGalleryInfo = async () => {
    const res = await getImages()
    if (res === "error"){
      toast({
        status: "error",
        title: "Error Fetching Data. Please Refresh.",
        duration: 5000,
        position: "top"
      })
    } else {
      setImages(res)
    }
  }

  const addNewGalleryImage = async () => {
    if (by === "" || description === "" || (imgRef.current?.files === null || imgRef.current?.files === undefined)){
      toast({
        status: "error",
        title: "Missing Input",
        description: "Please make sure you have entered value for all inputs and file has been added",
        duration: 5000,
        position: "top"
      })
      return 
    }
    const res = await addGalleryImage({
      by: by,
      description: description,
      src: imgRef.current?.files[0],
      date: `${serverTimestamp()}`
    })
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Added New Gallery Image",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Adding Gallery Photo. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  useEffect(() => {
    fetchGalleryInfo()
  }, [])

  const navigate = useNavigate()

  const {loggedIn} = useContext(ContextAPI) as ContextData

  if (!loggedIn) {
    navigate("/admin")
  }

  return (
    <Box bg={"white"} w={"100vw"} h={"100vh"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"1em"}>
      <NavbarAdmin />
      <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
        GALLERY ADMIN
      </Heading>
      <Tabs w={"95%"}>
        <TabList>
          <Tab>Gallery Photos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box mb={"1em"} as="button" onClick={onOpen} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} w={"13em"} padding={"0.75em 0em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{ bg: "#2F3F89" }}>
              <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>
                ADD NEW PROJECT
              </Text>
            </Box>
          <Box bg={"white"} w={"100vw"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} gap={"1em"}>
            <Stack direction={"row"} w={"100%"} justify={"space-between"} marginBottom={"2em"}>
              <Stack direction={"column"} w={"49%"} align={"end"} spacing={{ base: "0.8em" }}>
                {images.length > 0 &&
                  images[0]?.map((img) => {
                    return (<EditGallery img={img}/>);
                  })}
              </Stack>

              <Stack direction={"column"} w={"49%"} align={"start"} spacing={{ base: "0.8em" }}>
                <Stack
                  direction={"column"}
                  w={{ base: "100%", xl: "50%" }}
                  h={{ base: "30vh", lg: "35vh" }}
                  align={"center"}
                  justify={"center"}
                  spacing={"1.5em"}>
                  <Heading size={"md"} fontFamily={"Roboto"} letterSpacing={"5px"}>
                    GALLERY
                  </Heading>
                  <Text fontFamily={"Roboto-Light"} textAlign={"center"}>
                    This is a collection of artwork that we have curated over time
                  </Text>
                </Stack>
                {images &&
                  images[1]?.map((img) => {
                    return (<EditGallery img={img}/>);
                  })}
              </Stack>
            </Stack>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <VStack w={"100%"}>
                    <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
                      EDIT GALLERY
                    </Heading>
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
                        <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Curated By</FormLabel>
                        <Input value={by} onChange={(e) => {setBy(e.target.value)}} name="By" id="By" type={"text"} fontFamily={"Roboto"} placeholder="Name of curator" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                      </Box>
                      <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                        <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Description</FormLabel>
                        <Input value={description} onChange={(e) => {setDescription(e.target.value)}} name="Description" id="Description" type={"text"} fontFamily={"Roboto"} placeholder="Image Description" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                      </Box>
                      <Box as="button" onClick={addNewGalleryImage} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                        <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>SAVE</Text>
                      </Box>
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

export default GalleryAdmin