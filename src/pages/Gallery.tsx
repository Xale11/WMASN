import { Box, Button, ButtonGroup, Heading, HStack, Image, Text, useToast, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import ComingSoon from '../components/ComingSoon'
import { useEffect, useState } from "react";
import { GalleryImage, getImages } from "../data/GalleryImgs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { paginateData } from "../util/Pagination";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface PageData {
  start: number;
  end: number;
  maxPage: number;
}
const Gallery = () => {

  const toast = useToast()

  const [images, setImages] = useState<GalleryImage[]>([]);
  // const [paginatedImages, setPaginatedImages] = useState<GalleryImage[][]>([[],[]]);
  const [page, setPage] = useState<number>(1); // current page number
  const [pageLimits, setPageLimits] = useState<PageData>({ start: 0, end: 4, maxPage: 1 });

  const setPageView = (num: number) => {
    const pageData = paginateData(num, 4, images.length);
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
      gap={"1em"}>
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
      <VStack w={"100%"} justify={"center"} m={"1.4em 0em"}>
        <Heading fontFamily={"Roboto"} letterSpacing={"5px"} textAlign={"center"}>Gallery</Heading>
        <Text fontFamily={"Roboto-Light"} textAlign={"center"} w={{base: "90%"}}>This is a collection of artwork that we have curated over time</Text>
      </VStack>  
      <HStack w={"100%"} justify={"center"} flexWrap={"wrap"} rowGap={"2em"}>
        {images.slice(pageLimits.start, pageLimits.end).map((image) => {
          return (
          <VStack w={{ base: "90%", lg: "22%" }} aspectRatio={"1/1"} justify={"center"} spacing={0}>
            <Box w={"100%"} h={"93%"}>
              <Image as={LazyLoadImage} loading='lazy' src={image.src} w={"100%"} h={"100%"} objectFit={"contain"} alt='Image of an artefact'/>
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
      <Footer />
    </Box>
  );
};

export default Gallery;
