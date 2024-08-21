import { Box, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import ComingSoon from '../components/ComingSoon'
import { useEffect, useState } from "react";
import { GalleryImage, getImages } from "../data/GalleryImgs";
import GalleryCard from "../components/GalleryCard";

const Gallery = () => {

  const toast = useToast()

  const [images, setImages] = useState<GalleryImage[][]>([[],[]]);


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
            images[0].map((img) => {
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
            images[1].map((img) => {
              return <GalleryCard img={img} />;
            })}
        </Stack>
      </Stack>

      <Footer />
    </Box>
  );
};

export default Gallery;
