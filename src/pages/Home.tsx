import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import HomeSlide from '../components/HomeSlide'
import Footer from '../components/Footer'
import HomeIntro from '../components/HomeIntro'
import ContactForm from '../components/ContactForm'

const Home = () => {
  return (
    <Box bg={"white"} w={"100vw"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} fontFamily={"myBody"}>
        <Navbar/>
        <HomeSlide/>
        <HomeIntro/>
        <ContactForm/>
        <Footer/>
    </Box>
  )
}

export default Home