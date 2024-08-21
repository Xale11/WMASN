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
import { useContext } from "react";
import BagItem from "../components/BagItem";
import { goToCheckout } from "../data/api";

const Bag = () => {

  const toast = useToast()

  const { bag, numItems, subtotal } = useContext(ContextAPI) as ContextData;

  const checkout = async () => {
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
        const url = await goToCheckout(bag)
        window.location.assign(url)
      } catch (error) {
        alert("There was an error opening the cart. Please try again.");
      }
    }
  }

  return (
    <Box
      bg={"white"}
      w={"100vw"}
      position={"relative"}
      overflowX={"hidden"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      gap={"1em"}>
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
            fontFamily={"Roboto"}
            letterSpacing={"5px"}
            color={"#2c2c2c"}>
            BAG
          </Heading>
          <Box width={"100%"} h={"1px"} bg={"#cfcfcf"}></Box>
          {bag.length === 0 && <Text fontFamily={"Roboto-Light"}> Bag is empty</Text>}
          {bag.map((item) => {
            return <BagItem item={item} />;
          })}
        </VStack>
        <VStack
          w={{ base: "90%", lg: "20%" }}
          align={"start"}
          spacing={"0.5em"}>
          <Heading
            fontFamily={"Roboto"}
            letterSpacing={"5px"}
            color={"#2c2c2c"}>
            SUMMARY
          </Heading>
          <Box width={"100%"} h={"1px"} bg={"#cfcfcf"}></Box>
          <VStack align={"start"} spacing={"0"}>
            <Text fontFamily={"Roboto-Light"} color={"#2c2c2c"}>
              {numItems} Items
            </Text>
            <Text fontFamily={"Roboto-Light"} color={"#2c2c2c"}>
              Subtotal: £{subtotal}
            </Text>
            <Text fontFamily={"Roboto-Light"} color={"#2c2c2c"}>
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
            <Text fontFamily={"Roboto-Light"} letterSpacing={"5px"}>
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
