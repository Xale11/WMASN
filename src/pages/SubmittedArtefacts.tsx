import { Box, Heading, Text, useToast, VStack } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
import { getArtefactImages } from '../data/Artefacts'
import { useEffect, useState } from 'react'
import { GalleryImage } from '../data/GalleryImgs'
import StaggeredGrid from '../components/StaggeredGrid'

const SubmittedArtefacts = () => {

  const toast = useToast()

  const [images, setImages] = useState<GalleryImage[]>([])

  const fetchArtefactImages = async () => {
    const res = await getArtefactImages("submitted")
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
          <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>SUBMITTED ARTEFACTS</Heading>
          {/* todo: add better desc */}
          <Text fontFamily={"Roboto-Light"} textAlign={"center"} w={{base: "90%"}}>A display of our curated Artefacts</Text>
        </VStack>
        <StaggeredGrid imgs={images}/>
        <Footer/>
    </Box>
  )
}

export default SubmittedArtefacts