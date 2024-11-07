import { Box, Button, ButtonGroup, Heading, Image, Modal, ModalContent, ModalOverlay, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import ComingSoon from '../components/ComingSoon'
import { useEffect, useState } from "react";
import { GalleryImage, getImages } from "../data/GalleryImgs";
import { Helmet } from "react-helmet";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export interface PageData {
  start: number;
  end: number;
  maxPage: number;
}
const Gallery = () => {

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [images, setImages] = useState<GalleryImage[]>([])
  const [focusImg, setFocusImg] = useState<GalleryImage>()
  const [numImgs, setNumImgs] = useState<number>(8)

  const openModal = (image: GalleryImage) => {
    setFocusImg(image)
    onOpen()
  }

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getImages();
      if (data === "error"){
        toast({
          status: "error",
          title: "Error Fetching Data",
          duration: 2000,
        })
      } else {
        setImages(data);
      }
    }

    fetchImages()
  }, []);

  return (
    <Box
      bg={"white"}
      w={"100vw"}
      position={"relative"}
      overflowX={"hidden"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      gap={"1em"}
      fontFamily={"swis721-ex-bt"}>
      <Navbar />
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WMASN | Nigerian Architecture, Artifacts & Spaces by Moyo Adebayo</title>
        <meta 
            name="description" 
            content="A display of our Exhibitions experiences and curated Artefacts. What Makes a Space Nigerian (W.M.A.S.N) explores Nigerian architecture through speculative exhibitions." 
        />
        </Helmet>
      <VStack w={"100%"} justify={"center"} m={"1.4em 0em"} spacing={6}>
        <Heading fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} letterSpacing={"2px"} color={"#2F3F89"} textAlign={"center"}>GALLERY</Heading>
        <Text fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} textAlign={"center"} w={{base: "90%"}}>This is a collection of artwork that we have curated over time</Text>
      </VStack>  
      <ResponsiveMasonry columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4 }} style={{width: "95vw", margin: "0em auto 0em auto"}}>
        <Masonry gutter="1em">
          {images.slice(0, numImgs).map((image) => {
            return (
                <Image loading='lazy' onClick={() => openModal(image)} src={image.src} w={"100%"} objectFit={"contain"} alt='Image of an artefact'/>
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
      <ButtonGroup mx={"auto"}>
        <Button borderRadius={0} display={numImgs >= images.length ? "none" : "block"} onClick={() => setNumImgs(num => num + 10)} bg={"#2F3F89"} color={"white"}>Show More</Button>
        <Button borderRadius={0} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Scroll To Top</Button>
      </ButtonGroup>
      <Modal onClose={onClose} isOpen={isOpen} isCentered={true} size={"xs"}>
          <ModalOverlay/>
          <ModalContent display={"flex"} alignItems={"center"} justifyContent={"center"}>
              <Image src={focusImg?.src} maxH={"95vh"} maxW={"95vw"} objectFit={"contain"} alt='Image of an artefact'/>
          </ModalContent>
      </Modal>
      <Footer />
    </Box>
  );
};

export default Gallery;
