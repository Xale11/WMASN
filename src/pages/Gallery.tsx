import { Box, Button, ButtonGroup, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import ComingSoon from '../components/ComingSoon'
import { useEffect, useState } from "react";
import { GalleryImage, getImages } from "../data/GalleryImgs";
import GalleryCard from "../components/GalleryCard";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { paginateData } from "../util/Pagination";
import { Helmet } from "react-helmet";

export interface PageData {
  start: number;
  end: number;
  maxPage: number;
}
const Gallery = () => {

  const toast = useToast()

  const [images, setImages] = useState<GalleryImage[][]>([[],[]]);
  // const [paginatedImages, setPaginatedImages] = useState<GalleryImage[][]>([[],[]]);
  const [page, setPage] = useState<number>(1); // current page number
  const [pageLimits, setPageLimits] = useState<PageData>({ start: 0, end: 4, maxPage: 1 });

  const setPageView = (num: number) => {
    const pageData = paginateData(num, 5, images[0].length);
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
      <Stack
        direction={"row"}
        w={"100%"}
        justify={"space-between"}
        marginBottom={"2em"}>
        <Stack
          direction={"column"}
          w={"49%"}
          align={"end"}
          spacing={{ base: "0.8em" }}>
          {images &&
            images[0].slice(pageLimits.start, pageLimits.end).map((img) => {
              return <GalleryCard img={img} />;
            })}
        </Stack>

        <Stack
          direction={"column"}
          w={"49%"}
          align={"start"}
          spacing={{ base: "0.8em" }}>
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
            images[1].slice(pageLimits.start, pageLimits.end).map((img) => {
              return <GalleryCard img={img} />;
            })}
        </Stack>
      </Stack>
      <ButtonGroup alignSelf={"center"}>
        <Button onClick={previousPage} leftIcon={<IoChevronBack />}>
          Previous
        </Button>
        {Array.from({ length: pageLimits.maxPage }, (empty, i) => i + 1).map((pageNum) => {
          return (
            <Button onClick={() => setPageView(pageNum)} bg={page === pageNum ? '#1F81B9' : "GrayText"}>
              {pageNum}
            </Button>
          );
        })}
        <Button onClick={nextPage} rightIcon={<IoChevronForward />}>
          Next
        </Button>
      </ButtonGroup>
      <Footer />
    </Box>
  );
};

export default Gallery;
