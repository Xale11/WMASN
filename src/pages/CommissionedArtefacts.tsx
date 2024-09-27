import { Box, Button, ButtonGroup, Heading, HStack, Image, Text, useToast, VStack } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
import { useEffect, useState } from 'react'
import { GalleryImage } from '../data/GalleryImgs'
import { getArtefactImages } from '../data/Artefacts'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { PageData } from './Gallery'
import { paginateData } from '../util/Pagination'

const ComissionedArtefacts = () => {

  const toast = useToast()

  const [page, setPage] = useState<number>(1); // current page number
  const [pageLimits, setPageLimits] = useState<PageData>({ start: 0, end: 8, maxPage: 1 });
  const [images, setImages] = useState<GalleryImage[]>([])

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

  return (
    <Box bg={"white"} w={"100vw"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} gap={"1em"} fontFamily={"Roboto"}>
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
        <VStack w={"100%"} justify={"center"} m={"1.4em 0em"}>
          <Heading fontFamily={"Roboto"} letterSpacing={"5px"} textAlign={"center"}>COMMISSIONED ARTEFACTS</Heading>
          {/* todo: add better desc */}
          <Text fontFamily={"Roboto-Light"} textAlign={"center"} w={{base: "90%"}}>A display of our curated Artefacts</Text>
        </VStack>
        <HStack w={"100%"} justify={"center"} flexWrap={"wrap"} rowGap={"2em"}>
          {images.slice(pageLimits.start, pageLimits.end).map((image) => {
            return (
            <VStack w={{ base: "90%", lg: "22%" }} aspectRatio={"1/1"} justify={"center"} spacing={0}>
              <Box w={"100%"} h={"93%"}>
                <Image src={image.src} w={"100%"} h={"100%"} objectFit={"contain"} alt='Image of an artefact'/>
              </Box>
              <Box w={"100%"} h={"7%"} textAlign={"center"} letterSpacing={"3px"}>
                <Text>{image.description}</Text>
              </Box>
            </VStack>
            )
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
        <Footer/>
    </Box>
  )
}

export default ComissionedArtefacts