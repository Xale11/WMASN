import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import ComingSoon from '../components/ComingSoon'
import Footer from '../components/Footer'

const Store = () => {
  return (
    <Box bg={"white"} w={"100vw"} h={"100vh"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} gap={"1em"}>
        <Navbar/>
        <ComingSoon/>
        <Box position={"absolute"} bottom={0} w={"100%"}>
          <Footer/>
        </Box>
        
    </Box>
  )
}

export default Store