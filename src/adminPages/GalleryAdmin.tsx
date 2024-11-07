import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast, Modal, ModalBody, ModalContent, ModalOverlay, VStack, HStack, Input, FormLabel, ButtonGroup, Button} from "@chakra-ui/react";
import NavbarAdmin from "../adminComponents/NavbarAdmin";
import { addGalleryImage, GalleryImage, getImages } from "../data/GalleryImgs";
import { useContext, useEffect, useRef, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import EditGallery from "../adminComponents/EditGallery";
import { useNavigate } from "react-router-dom";
import { ContextAPI, ContextData } from "../context/ContextProvider";
import LoadButton from "../adminComponents/LoadButton";
import { PageData } from "../pages/Gallery";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { paginateData } from "../util/Pagination";

const GalleryAdmin = () => {

  const {onOpen, isOpen, onClose} = useDisclosure()

  const [by, setBy] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1); // current page number
  const [pageLimits, setPageLimits] = useState<PageData>({ start: 0, end: 8, maxPage: 1 });


  const imgRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<GalleryImage[]>([]);

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
      // const res = splitImages(unsplitRes)
      setImages(res)
    }
  }

  const addNewGalleryImage = async () => {
    setLoading(true)
    if (by === "" || description === "" || ((imgRef.current?.files && imgRef.current?.files[0] == null) || imgRef.current?.files === undefined)){
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
    toast({
      status: "info",
      title: "Uploading Gallery Images. Please Wait",
      duration: 5000,
      isClosable: true,
      position: "top"
    })
    const res = await addGalleryImage({
      by: by,
      description: description,
      src: imgRef.current?.files,
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
    setLoading(false)
  }

  const setPageView = (num: number) => {
    const pageData = paginateData(num, 8, images.length);
    setPage(num);
    setPageLimits(pageData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (page === pageLimits.maxPage) {
      return;
    } else {
      setPage((prev) => prev + 1);
      setPageView(page + 1);
    }
  };

  const previousPage = () => {
    if (page === 1) {
      return;
    } else {
      setPage((prev) => prev - 1);
      setPageView(page - 1);
    }
  };

  useEffect(() => {
    setPageView(1)
  }, [images])

  useEffect(() => {
    fetchGalleryInfo()
  }, [])

  const navigate = useNavigate()

  const {loggedIn} = useContext(ContextAPI) as ContextData

  if (!loggedIn) {
    navigate("/admin")
  }

  // console.log(images)

  return (
    <Box bg={"white"} w={"100vw"} h={"100vh"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"1em"}>
      <NavbarAdmin />
      <Heading letterSpacing={"5px"}>
        GALLERY ADMIN
      </Heading>
      <Tabs w={"95%"}>
        <TabList>
          <Tab>Gallery Photos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box mb={"1em"} as="button" onClick={onOpen} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} w={"13em"} padding={"0.75em 0em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{ bg: "#2F3F89" }}>
              <Text letterSpacing={"3px"}>
                ADD NEW GALLERY PHOTO
              </Text>
            </Box>
            <HStack w={"100%"} justify={"center"} flexWrap={"wrap"} rowGap={"2em"}>
              {images.slice(pageLimits.start, pageLimits.end).map((image) => {
                return (<EditGallery img={image}/>)
              })}
            </HStack>
            <ButtonGroup alignSelf={"center"} flexWrap={"wrap"} mt={"2em"}>
              <Button size={"sm"} onClick={previousPage} leftIcon={<IoChevronBack />}>
                <Text display={{base: "none", md: "inline"}}>Previous</Text>
              </Button>
              {Array.from({ length: pageLimits.maxPage }, (_, i) => i + 1).map((pageNum) => {
                if (pageNum < page + 3 && pageNum > page - 3 && pageNum > 0 && pageNum <= pageLimits.maxPage)
                return (
                  <Button size={"sm"} onClick={() => setPageView(pageNum)} bg={page === pageNum ? '#1F81B9' : "GrayText"}>
                    {pageNum}
                  </Button>
                );
              })}
              <Button size={"sm"} onClick={nextPage} rightIcon={<IoChevronForward />}>
              <Text display={{base: "none", md: "inline"}}>Next</Text>
              </Button>
            </ButtonGroup>
          <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <VStack w={"100%"}>
                    <Heading letterSpacing={"5px"}>
                      ADD TO GALLERY
                    </Heading>
                    <HStack>
                      <Box display={"flex"} flexDirection={"column"}>
                        <Input type="file" ref={imgRef} multiple/>
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
                        <Box as="button" onClick={addNewGalleryImage} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                          <Text letterSpacing={"3px"}>SAVE</Text>
                        </Box>
                      </LoadButton>
                      
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