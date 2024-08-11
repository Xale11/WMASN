import { Box, Image } from '@chakra-ui/react'
import HomeImage2 from "../assets/Home1.png"
import ViewProject from "../assets/ViewProject1.png"
import { useNavigate } from 'react-router-dom'

const HomeSlide = () => {

  // h={{base: "calc(100vh - 4em)", md: "calc(100vh - 5em)", lg: "calc(100vh - 6em)"}}
  // h={{base: "19vh", sm: "calc(100vh - 7em)", md: "calc(55vh)", xl: "calc(100vh - 6em)"}}

  const navigate = useNavigate()
  return (
    <Box w={"100%"} bg={"#2c2c2c"} transform={"scale(1)"} h={{base: "25vh", sm: "calc(100vh - 7em)", md: "50vh", lg: "40vh", xl: "calc(100vh - 8em)", "2xl": "calc(100vh - 6em)"}} display={"flex"} position={"relative"}  backgroundSize={"cover"} backgroundRepeat={"no-repeat"} backgroundPosition={"center center"} zIndex={0} >
        <Image src={HomeImage2} w={"100%"} objectFit={"cover"} transform={{base: "scale(1.3)", sm: "scale(1)", md: "scale(1.2)", lg: "scale(1.2)", xl: "scale(1.2)", "2xl": "scale(1)"}}/>
        <Image onClick={() => {navigate("/projects")}} src={ViewProject} objectFit={"contain"} bg={"white"} width={{base: "175px", sm: "250px", lg: "300px"}} h={"fit-content"} p={"0em 1.5em"} position={"absolute"} zIndex={2} top={{base: "77%", sm: "77%", md: "85%", xl:"80%"}} left={"0"} right={"0"} margin={"0 auto"}  transition={"all 300ms ease-in-out"} _hover={{w: "320px", cursor: "pointer"}}/>
    </Box>
  )
}

export default HomeSlide