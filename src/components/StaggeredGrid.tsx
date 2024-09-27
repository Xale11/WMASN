import { Box, Button, ButtonGroup, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { paginateData } from '../util/Pagination'
import { PageData } from '../pages/Gallery'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { GalleryImage } from '../data/GalleryImgs'

interface Props {
  imgs: GalleryImage[]
}

const StaggeredGrid = ({imgs}: Props) => {

  const [page, setPage] = useState<number>(1); // current page number
  const [pageLimits, setPageLimits] = useState<PageData>({ start: 0, end: 10, maxPage: 1 });

  const setPageView = (num: number) => {
    const pageData = paginateData(num, 10, imgs.length);
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
  }, [imgs])

  return (
    <HStack w={"100%"} justify={"center"} align={"start"} flexWrap={"wrap"} >
      <VStack display={{base: "none", md: "flex"}} w={{ base: "90%", md: "22%" }} spacing={"5em"}>
        {imgs.slice(pageLimits.start, pageLimits.end).map((img, i) => {
          if (i % 4 == 0){
            return (<StaggeredGridItem img={img}/>)
          }
          
        })}
      </VStack>
      <VStack display={{base: "none", md: "flex"}} w={{ base: "90%", md: "22%" }} spacing={"5em"} mt={"10em"}>
        {imgs.slice(pageLimits.start, pageLimits.end).map((img, i) => {
          if ((i-2) % 4 == 0){
            return (<StaggeredGridItem img={img}/>)
          }
        })}
      </VStack>
      <VStack display={{base: "none", md: "flex"}} w={{ base: "90%", md: "22%" }} spacing={"5em"}>
        {imgs.slice(pageLimits.start, pageLimits.end).map((img, i) => {
          if ((i-1) % 4 == 0){
            return (<StaggeredGridItem img={img}/>)
          }
        })}
      </VStack>
      <VStack display={{base: "none", md: "flex"}} w={
        { base: "90%", md: "22%" }} spacing={"5em"} mt={"10em"}>
        {imgs.slice(pageLimits.start, pageLimits.end).map((img, i) => {
          if ((i-3) % 4 == 0){
            return (<StaggeredGridItem img={img}/>)
          }
        })}
      </VStack>
      {/* Mobile View */}
      <VStack display={{base: "flex", md: "none"}} w={{ base: "90%", md: "22%" }} spacing={"5em"}>
        {imgs.slice(pageLimits.start, pageLimits.end).map((img) => {
          return (<StaggeredGridItem img={img}/>)
        })}
      </VStack>
      <ButtonGroup alignSelf={"center"} flexWrap={"wrap"}>
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
    </HStack>
  )
}

interface SubProps {
  img: GalleryImage
}

export const StaggeredGridItem = ({img}: SubProps) => {

  const [show, setShow] = useState<boolean>(false)

  return (
    <VStack w={"100%"} aspectRatio={"1/1"} justify={"center"} spacing={0} cursor={"pointer"} overflow={"hidden"} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Box w={"100%"} h={"93%"}>
        <Image src={img.src} w={"100%"} h={"100%"} objectFit={"contain"} alt='Image of an artefact'/>
      </Box>
      <Box display={{base: "none", md: "inline"}} w={"100%"} h={"7%"}>
        {show && <Text w={"100%"} h={"100%"} textAlign={"center"} letterSpacing={"3px"}>{img.description}</Text>}
      </Box>
      <Box display={{base: "inline", md: "none"}}  w={"100%"} h={"7%"}>
        <Text w={"100%"} h={"100%"} textAlign={"center"} letterSpacing={"3px"}>{img.description}</Text>
      </Box>
    </VStack>
  )
}

export default StaggeredGrid
