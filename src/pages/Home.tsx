import { Box, useToast } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import HomeSlide from '../components/HomeSlide'
import Footer from '../components/Footer'
import HomeIntro from '../components/HomeIntro'
import ContactForm from '../components/ContactForm'
import { useEffect, useState } from 'react'
import { getHomePageInfo } from '../data/HomeData'
import {Helmet} from "react-helmet"


const Home = () => {

  const toast = useToast()

  const [intro, setIntro] = useState<string>("")
  const [number, setNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")


  useEffect(() => {
    const fetchHomePageInfo = async () => {
      const res = await getHomePageInfo()
      if (res === "error"){
        toast({
          status: "error",
          title: "Error Fetching Data. Please Refresh.",
          duration: 5000,
          position: "top"
        })
      } else {
        setIntro(res.intro)
        setNumber(res.number)
        setEmail(res.email)
      }
    }

    fetchHomePageInfo()
  }, [])

  return (
    <Box bg={"white"} w={"100vw"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"start"} fontFamily={"myBody"}>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>WMASN | Nigerian Architecture, Artifacts & Spaces by Moyo Adebayo</title>
          <meta 
              name="description" 
              content="What Makes a Space Nigerian (W.M.A.S.N) explores Nigerian architecture through speculative exhibitions. Welcome to the homepage" 
          />
        </Helmet>
        <Navbar/>
        <HomeSlide/>
        <HomeIntro intro={intro}/>
        <ContactForm number={number} ourEmail={email}/>
        <Footer/>
    </Box>
  )
}

export default Home