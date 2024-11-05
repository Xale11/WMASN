import { Box, Image, Text, Icon, HStack } from '@chakra-ui/react'
import HomeImage2 from "../assets/Home1.png"
import { useNavigate } from 'react-router-dom'
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const HomeSlide = () => {

  // h={{base: "calc(100vh - 4em)", md: "calc(100vh - 5em)", lg: "calc(100vh - 6em)"}}
  // h={{base: "19vh", sm: "calc(100vh - 7em)", md: "calc(55vh)", xl: "calc(100vh - 6em)"}}

  const navigate = useNavigate()
  return (
    <Box
      w={"100%"}
      bg={"#2c2c2c"}
      transform={"scale(1)"}
      h={{
        base: "25vh",
        sm: "calc(100vh - 7em)",
        md: "50vh",
        lg: "40vh",
        xl: "calc(100vh - 8em)",
        "2xl": "calc(100vh - 6em)",
      }}
      display={"flex"}
      position={"relative"}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"center center"}
      zIndex={0}>
      <Image
        src={HomeImage2}
        w={"100%"}
        objectFit={"cover"}
        transform={{
          base: "scale(1.3)",
          sm: "scale(1)",
          md: "scale(1.2)",
          lg: "scale(1.2)",
          xl: "scale(1.2)",
          "2xl": "scale(1)",
        }}
      />
      {/* <Image onClick={() => {navigate("/projects")}} src={ViewProject} objectFit={"contain"} bg={"white"} width={{base: "175px", sm: "250px", lg: "300px"}} h={"fit-content"} p={"0em 1.5em"} position={"absolute"} zIndex={2} top={{base: "77%", sm: "77%", md: "85%", xl:"80%"}} left={"0"} right={"0"} margin={"0 auto"}  transition={"all 300ms ease-in-out"} _hover={{w: "320px", cursor: "pointer"}}/> */}
      {/* <Box
        onClick={() => {
          navigate("/projects");
        }}
        w={"fit-content"}
        fontSize={{ base: "0.7em", sm: "1em" }}
        position={"absolute"}
        borderRadius={"0em"}
        bg={"white"}
        display={"flex"}
        alignItems={"center"}
        gap={"0.5em"}
        justifyContent={"center"}
        padding={"0.5em 1.75em"}
        color={"#2c2c2c"}
        transition={"all 300ms ease-in-out"}
        cursor={"pointer"}
        _hover={{ padding: "0.5em 2.5em" }}
        zIndex={4}
        top={{ base: "77%", sm: "77%", md: "85%", xl: "80%" }}
        left={"0"}
        right={"0"}
        margin={"0 auto"}>
        <Text fontFamily={"Roboto"} letterSpacing={"3px"}>
          VIEW PROJECTS
        </Text>
        <Icon fontSize={"1.5em"} as={LiaLongArrowAltRightSolid} />
      </Box> */}
      <HStack
        position={"absolute"}
        top={{ base: "77%", sm: "77%", md: "85%", xl: "80%" }}
        left={"0"}
        right={"0"}
        margin={"0 auto"}
        justify={"center"}>
        <Box
          onClick={() => {
            navigate("/projects");
          }}
          w={"fit-content"}
          fontSize={{ base: "0.7em", sm: "1em" }}
          borderRadius={"0em"}
          bg={"white"}
          display={"flex"}
          alignItems={"center"}
          gap={"0.5em"}
          justifyContent={"center"}
          padding={"0.5em 1.75em"}
          color={"#2c2c2c"}
          transition={"all 300ms ease-in-out"}
          cursor={"pointer"}
          _hover={{ padding: "0.5em 2.5em" }}
          zIndex={4}>
          <Text fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} letterSpacing={"3px"}>
            VIEW PROJECTS
          </Text>
          <Icon fontSize={"1.5em"} as={LiaLongArrowAltRightSolid} />
        </Box>
        {/* <Box
          onClick={() => {
            window.location.assign("https://www.eventbrite.co.uk/e/what-makes-a-space-nigerian-home-edition-tickets-986184322857?aff=oddtdtcreator");
          }}
          w={"fit-content"}
          fontSize={{ base: "0.7em", sm: "1em" }}
          borderRadius={"0em"}
          bg={"#F05537"}
          display={"flex"}
          alignItems={"center"}
          gap={"0.5em"}
          justifyContent={"center"}
          padding={"0.5em 1.75em"}
          color={"#2c2c2c"}
          transition={"all 300ms ease-in-out"}
          cursor={"pointer"}
          _hover={{ padding: "0.5em 2.5em" }}
          zIndex={4}>
          <Text fontFamily={"Roboto"} letterSpacing={"3px"}>
            NEW EXHIBITION
          </Text>
          <Icon fontSize={"1.5em"} as={LiaLongArrowAltRightSolid} />
        </Box> */}
      </HStack>
    </Box>
  );
}

export default HomeSlide