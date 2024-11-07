import { Box, Button, ButtonGroup, HStack, Image, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { GalleryImage } from '../data/GalleryImgs'

interface Props {
  imgs: GalleryImage[]
}

const StaggeredGrid = ({imgs}: Props) => {

  const [numImgs, setNumImgs] = useState<number>(6)

  return (
    <HStack w={"100%"} justify={"center"} align={"start"} flexWrap={"wrap"} spacing={0}>
      <VStack display={{base: "none", md: "flex"}} w={{ base: "90%", md: "22%" }} spacing={"5em"}>
        {imgs.slice(0, numImgs).map((img, i) => {
          if (i % 4 == 0){
            return (<StaggeredGridItem img={img}/>)
          }
          
        })}
      </VStack>
      <VStack display={{base: "none", md: "flex"}} w={{ base: "90%", md: "22%" }} spacing={"5em"} mt={"10em"}>
        {imgs.slice(0, numImgs).map((img, i) => {
          if ((i-2) % 4 == 0){
            return (<StaggeredGridItem img={img}/>)
          }
        })}
      </VStack>
      <VStack display={{base: "none", md: "flex"}} w={{ base: "90%", md: "22%" }} spacing={"5em"}>
        {imgs.slice(0, numImgs).map((img, i) => {
          if ((i-1) % 4 == 0){
            return (<StaggeredGridItem img={img}/>)
          }
        })}
      </VStack>
      <VStack display={{base: "none", md: "flex"}} w={
        { base: "90%", md: "22%" }} spacing={"5em"} mt={"10em"}>
        {imgs.slice(0, numImgs).map((img, i) => {
          if ((i-3) % 4 == 0){
            return (<StaggeredGridItem img={img}/>)
          }
        })}
      </VStack>
      {/* Mobile View */}
      <HStack display={{base: "flex", md: "none"}} w={{ base: "100%", md: "22%" }} justify={"center"} spacing={"5em"} flexWrap={"wrap"}>
        {imgs.slice(0, numImgs).map((img) => {
          return (<StaggeredGridItem img={img}/>)
        })}
      </HStack>
      <ButtonGroup w={"100%"} mx={"auto"} mt={5} justifyContent={"center"}>
        <Button borderRadius={0} display={numImgs >= imgs.length ? "none" : "block"} onClick={() => setNumImgs(num => num + 8)} bg={"#2F3F89"} color={"white"}>Show More</Button>
        <Button borderRadius={0} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Scroll To Top</Button>
      </ButtonGroup>
    </HStack>
  )
}

interface SubProps {
  img: GalleryImage
}

export const StaggeredGridItem = ({img}: SubProps) => {

  // const [show, setShow] = useState<boolean>(false)

  return (
    <VStack w={{ base: "30%", md: "100%" }} aspectRatio={"1/1"} justify={"center"} spacing={0} cursor={"pointer"} overflow={"hidden"}>
      <Box w={"100%"} h={"100%"}>
        <Image loading='lazy' src={img.src} w={"100%"} h={"100%"} objectFit={"cover"} transition={"all 300ms ease-in-out"} alt='Image of an artefact'/>
      </Box>
    </VStack>
  )
}

export default StaggeredGrid
