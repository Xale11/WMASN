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
          <Heading fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} color={"#2F3F89"} textAlign={"center"} letterSpacing={"2px"}>SUBMITTED ARTEFACTS</Heading>
          {/* todo: add better desc */}
          <Text fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} textAlign={"center"} w={{base: "90%"}}>A collection of all items loaned to us
          by Nigerian families, for the sake of the exhibition</Text>
        </VStack>
        <StaggeredGrid imgs={images}/>
        <Footer/>
    </Box>
  )
}

export default SubmittedArtefacts