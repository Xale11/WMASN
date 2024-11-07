import { Box, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { GalleryImage } from '../data/GalleryImgs'
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
    img: GalleryImage
}

const GalleryCard = ({img}: Props) => {

    const [show, setShow] = useState<boolean>(false)

  return (
    <Box w={{base: "90%", xl: "50%"}} display={"flex"} flexDirection={"column"} alignItems={"end"} maxH={"70vh"} transition={"all 300ms ease-in-out"} _hover={{width: {base: "90%", xl: "50%", "2xl": "60%"}, maxHeight: {base: "70vh", "2xl": "80vh"}}} >
        <Image as={LazyLoadImage} loading='lazy' src={img?.src} w={"100%"} h={"calc(100% - 2em)"} borderRadius={"1em"} objectFit={"cover"} cursor={"pointer"} onMouseEnter={() => {setShow(true)}} onMouseLeave={() => {setShow(false)}} alt='image of artefact'/>
        {show && <Box w={"100%"} h={"2em"} transition={"all 300ms ease-in-out"} display={{base: "none", "2xl": "block"}}>
            <Text textAlign={"left"} fontSize={"0.8em"}>{img?.description}</Text>
            {img?.by !== "" && <Text fontSize={"0.8em"}>Curated by: {img?.by}</Text>}
        </Box>}
        <Box w={"100%"} h={"2em"} transition={"all 300ms ease-in-out"} display={{base: "block", "2xl": "none"}} mb={"1em"}>
            <Text textAlign={"left"} fontSize={"0.8em"}>{img?.description}</Text>
            {img?.by !== "" && <Text fontSize={"0.8em"}>Curated by: {img?.by}</Text>}
        </Box>
    </Box>
  )
}

export default GalleryCard