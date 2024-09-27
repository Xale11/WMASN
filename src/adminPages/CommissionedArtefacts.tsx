import { Box, Button, ButtonGroup, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import EditArtefact from '../adminComponents/EditArtefact'
import LoadButton from '../adminComponents/LoadButton'
import { GalleryImage } from '../data/GalleryImgs'
import { addArtefactImage, getArtefactImages } from '../data/Artefacts'
import { serverTimestamp } from 'firebase/firestore'
import { paginateData } from '../util/Pagination'
import { PageData } from '../pages/Gallery'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

const CommissionedArtefacts = () => {

  const toast = useToast()

  const {onOpen, onClose, isOpen} = useDisclosure()

  const [by, setBy] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [page, setPage] = useState<number>(1); // current page number
  const [pageLimits, setPageLimits] = useState<PageData>({ start: 0, end: 8, maxPage: 1 });


  const imgRef = useRef<HTMLInputElement>(null)

  const addNewArtefactImage = async () => {
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
      title: "Uploading Artefact Images. Please Wait",
      duration: 5000,
      isClosable: true,
      position: "top"
    })
    const res = await addArtefactImage("commissioned", {
      by: by,
      description: description,
      src: imgRef.current?.files,
      date: `${serverTimestamp()}`
    })
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Added New Artefact Image",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Adding Artefact Photo. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
    setLoading(false)
  }

  const fetchArtefactImages = async () => {
    const res = await getArtefactImages("commissioned")
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
    fetchArtefactImages()
  }, [])

  return (
    <>
      <Box mb={"1em"} as="button" onClick={onOpen} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} w={"13em"} padding={"0.75em 0em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{ bg: "#2F3F89" }}>
        <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>
          ADD NEW GALLERY PHOTO
        </Text>
      </Box>
      {/* CONTENT HERE */}
      <HStack w={"100%"} justify={"center"} flexWrap={"wrap"} rowGap={"2em"}>
        {images.slice(pageLimits.start, pageLimits.end).map((image) => {
          return (<EditArtefact src="commissioned" img={image}/>)
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
              <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
                ADD TO COMMISSIONED ARTEFACTS
              </Heading>
              <HStack>
                <Box display={"flex"} flexDirection={"column"}>
                  <Input type="file" ref={imgRef} multiple/>
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
                <LoadButton loading={loading}>
                  <Box as="button" onClick={addNewArtefactImage} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                    <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>SAVE</Text>
                  </Box>
                </LoadButton>
                
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CommissionedArtefacts