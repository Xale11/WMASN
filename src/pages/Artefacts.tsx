import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import ComingSoon from '../components/ComingSoon'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'

const Artefacts = () => {
  return (
    <Box bg={"white"} w={"100vw"} h={"100vh"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} gap={"1em"}>
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
        <ComingSoon/>
        <Box position={"absolute"} bottom={0} w={"100%"}>
          <Footer/>
        </Box>
    </Box>
  )
}

export default Artefacts