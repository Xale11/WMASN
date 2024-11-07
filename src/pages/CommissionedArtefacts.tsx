import { Box, Button, ButtonGroup, Grid, Heading, Image, Text, useToast, VStack } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
import { useEffect, useState } from 'react'
import { GalleryImage } from '../data/GalleryImgs'
import { getArtefactImages } from '../data/Artefacts'

const ComissionedArtefacts = () => {

  const toast = useToast()

  const [images, setImages] = useState<GalleryImage[]>([])
  const [numImgs, setNumImgs] = useState<number>(4)

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

  useEffect(() => {
    fetchArtefactImages()
  }, [])


  return (
    <Box bg={"white"} w={"100vw"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} gap={"1em"} fontFamily={"swis721-ex-bt"}>
        <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WMASN | Nigerian Architecture, Artifacts & Spaces by Moyo Adebayo</title>
        <meta 
            name="description" 
            content="A display of our curated Artefacts. What Makes a Space Nigerian (W.M.A.S.N) explores Nigerian architecture through speculative exhibitions." 
        />
        </Helmet>
        <Navbar/>
        <VStack w={"100%"} justify={"center"} m={"1.4em 0em"} spacing={6}>
          <Heading fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} color={"#2F3F89"} letterSpacing={"2px"} textAlign={"center"} >COMMISSIONED ARTEFACTS</Heading>
          {/* todo: add better desc */}
          <Text fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} textAlign={"center"} w={{base: "90%"}}>A display of our curated Artefacts</Text>
        </VStack>
        <Grid w={"100%"} templateColumns={{base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)"}} gridGap={3}>
          {images.slice(0, numImgs).map((image) => {
            return (
              <VStack w={"100%"}>
                <VStack width={"70%"} aspectRatio={"3/2"} justify={"end"} spacing={0}>
                  <Image loading='lazy' src={image.src} w={"100%"} h={"80%"}/>
                  <Box width={"100%"} bg={"#2F3F89"} minH={"20%"} transition={"all 300ms ease-in-out"} _hover={{minH: "27%"}} color={"white"} p={1} fontSize={{base: "xs", md: "md", lg: "lg"}}>{image.description}</Box>
                </VStack>
              </VStack>
            )
          })}
        </Grid>
        <ButtonGroup mx={"auto"}>
          <Button borderRadius={0} display={numImgs >= images.length ? "none" : "block"} onClick={() => setNumImgs(num => num + 4)} bg={"#2F3F89"} color={"white"}>Show More</Button>
          <Button borderRadius={0} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Scroll To Top</Button>
        </ButtonGroup>
        <Footer/>
    </Box>
  )
}

export default ComissionedArtefacts

// <VStack w={"100%"} justify={"center"} m={"1.4em 0em"}>
        //   <Heading letterSpacing={"5px"} textAlign={"center"}>COMMISSIONED ARTEFACTS</Heading>
        //   {/* todo: add better desc */}
        //   <Text textAlign={"center"} w={{base: "90%"}}>A display of our curated Artefacts</Text>
        // </VStack>
        // <HStack w={"100%"} justify={"center"} flexWrap={"wrap"} rowGap={"2em"}>
        //   {images.slice(pageLimits.start, pageLimits.end).map((image) => {
        //     return (
        //     <VStack w={{ base: "90%", lg: "22%" }} aspectRatio={"1/1"} justify={"center"} spacing={0}>
        //       <Box w={"100%"} h={"93%"}>
        //         <Image src={image.src} w={"100%"} h={"100%"} objectFit={"contain"} alt='Image of an artefact'/>
        //       </Box>
        //       <Box w={"100%"} h={"7%"} textAlign={"center"} letterSpacing={"3px"}>
          //       <Text>{image.description}</Text>
          //     </Box>
          //   </VStack>
          //   )
          // })}
        // </HStack>
        // <ButtonGroup alignSelf={"center"} flexWrap={"wrap"} mt={"2em"}>
        //   <Button size={"sm"} onClick={previousPage} leftIcon={<IoChevronBack />}>
        //     <Text display={{base: "none", md: "inline"}}>Previous</Text>
        //   </Button>
        //   {Array.from({ length: pageLimits.maxPage }, (_, i) => i + 1).map((pageNum) => {
        //     if (pageNum < page + 3 && pageNum > page - 3 && pageNum > 0 && pageNum <= pageLimits.maxPage)
        //     return (
        //       <Button size={"sm"} onClick={() => setPageView(pageNum)} bg={page === pageNum ? '#1F81B9' : "GrayText"}>
        //         {pageNum}
        //       </Button>
        //     );
        //   })}
        //   <Button size={"sm"} onClick={nextPage} rightIcon={<IoChevronForward />}>
        //   <Text display={{base: "none", md: "inline"}}>Next</Text>
        //   </Button>
        // </ButtonGroup>