import {
  Box,
  Heading,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ContextAPI, ContextData } from "../context/ContextProvider";
import { useContext, useEffect, useState } from "react";
import BagItem from "../components/BagItem";
import { goToCheckout } from "../data/api";
import { getShippingRates, ShippingRate } from "../data/StoreData";
import { Helmet } from "react-helmet";

const Bag = () => {

  const toast = useToast()

  const { bag, numItems, subtotal, getBag } = useContext(ContextAPI) as ContextData;

  const [shipping, setShipping] = useState<ShippingRate[]>()
  
  const fetchShipping = async () => {
    const res = await getShippingRates()
    if (res === "error"){
      await fetchShipping()
    } else {
      setShipping(res)
    }
  }

  const checkout = async () => {
    if (shipping === undefined){
      toast({
        status: "error",
        title: "There was an error. Please Refresh the page",
        position: "top",
        isClosable: true,
        duration: 3000
      })
      return
    }
    if (bag.length === 0){
      toast({
        title: "Bag is empty",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"

      })
    } else {
      try {
        const url = await goToCheckout(bag, shipping)
        window.location.assign(url)
      } catch (error) {
        alert("There was an error opening the cart. Please try again.");
      }
    }
  }

  useEffect(() => {
    fetchShipping()
    getBag()
  }, [])


  return (
    <Box
      bg={"white"}
      w={"100vw"}
      position={"relative"}
      overflowX={"hidden"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      fontFamily={"swis721-ex-bt"}
      gap={"1em"}>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WMASN | Nigerian Architecture, Artifacts & Spaces by Moyo Adebayo</title>
        <meta 
            name="description" 
            content="The Cart of WMASN curated items. What Makes a Space Nigerian (W.M.A.S.N) explores Nigerian architecture through speculative exhibitions." 
        />
        </Helmet>
      <Navbar />
      <Stack
        w={"100%"}
        direction={{ base: "column-reverse", lg: "row" }}
        justify={"center"}
        align={{ base: "center", lg: "start" }}
        spacing={"3em"}>
        <VStack
          w={{ base: "90%", lg: "30%" }}
          align={"start"}
          spacing={"0.5em"}>
          <Heading
            fontFamily={"swis721-ex-bt"} 
            transform={"scaleY(1.25)"}
            letterSpacing={"2px"}
            color={"#2F3F89"}>
            BAG
          </Heading>
          <Box width={"100%"} h={"1px"} bg={"#cfcfcf"}></Box>
          {bag.length === 0 && <Text> Bag is empty</Text>}
          {bag.map((item) => {
            return <BagItem item={item} />;
          })}
        </VStack>
        <VStack
          w={{ base: "90%", lg: "20%" }}
          align={"start"}
          spacing={"0.5em"}>
          <Heading
            fontFamily={"swis721-ex-bt"} 
            transform={"scaleY(1.25)"}
            letterSpacing={"2px"}
            color={"#2F3F89"}>
            SUMMARY
          </Heading>
          <Box width={"100%"} h={"1px"} bg={"#cfcfcf"}></Box>
          <VStack align={"start"} spacing={"0"}>
            <Text color={"#2c2c2c"}>
              {numItems} Items
            </Text>
            <Text color={"#2c2c2c"}>
              Subtotal: £{subtotal}
            </Text>
            <Text color={"#2c2c2c"}>
              Delivery: From £2.99
            </Text>
          </VStack>
          <Box width={"100%"} h={"1px"} bg={"#cfcfcf"}></Box>
          <Box
            as="button"
            onClick={checkout}
            borderRadius={"0em"}
            bg={"#2c2c2c"}
            display={"flex"}
            alignItems={"center"}
            gap={"0.5em"}
            justifyContent={"center"}
            padding={"1em 2.5em"}
            color={"white"}
            transition={"all 300ms ease-in-out"}
            _hover={{ padding: "1em 3em" }}>
            <Text letterSpacing={"5px"}>
              GO TO CHECKOUT
            </Text>
          </Box>
        </VStack>
      </Stack>
      <Footer />
    </Box>
  );
};

export default Bag;
