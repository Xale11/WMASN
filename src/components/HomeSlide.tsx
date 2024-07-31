import { Box, Image } from '@chakra-ui/react'
import HomeImage2 from "../assets/Home1.png"
import ViewProject from "../assets/ViewProject1.png"
import { useNavigate } from 'react-router-dom'

const HomeSlide = () => {

  const navigate = useNavigate()
  return (
    <Box w={"100%"} h={"80vh"} display={"flex"} position={"relative"} backgroundImage={HomeImage2} backgroundSize={"cover"} backgroundRepeat={"no-repeat"} backgroundPosition={"center"} >
        <Image onClick={() => {navigate("/projects")}} src={ViewProject} objectFit={"contain"} bg={"white"} width={"300px"} h={"fit-content"} p={"0em 1.5em"} position={"absolute"} top={{base: "70%", sm: "75%", md: "71%", xl:"80%"}} left={"0"} right={"0"} margin={"0 auto"}  transition={"all 300ms ease-in-out"} _hover={{w: "320px", cursor: "pointer"}}/>
    </Box>
  )
}

export default HomeSlide