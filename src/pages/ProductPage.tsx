import { useContext, useEffect, useState } from "react";
import { getShippingRates, Product, ShippingRate } from "../data/StoreData";
import {
  Stack,
  VStack,
  Heading,
  Box,
  Text,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import { ContextAPI, ContextData } from "../context/ContextProvider";
import { goToCheckout } from "../data/api";

interface Props {
  item: Product;
}

const ProductPage = ({ item }: Props) => {

  const [shipping, setShipping] = useState<ShippingRate[]>()

  const toast = useToast();

  const fetchShipping = async () => {
    const res = await getShippingRates()
    if (res === "error"){
      await fetchShipping()
    } else {
      setShipping(res)
    }
  }

  const addedToBagToast = () => {
    toast({
      title: "Added to bag",
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const buyNow = async () => {
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
    addToBag(item)
    try {
      const url = await goToCheckout([
            {
              id: item.id,
              price_data: {
                currency: "gbp",
                unit_amount: item.price * 100,
                product_data: {
                  name: item.name,
                  images:
                    item.img2 === undefined
                      ? [item.img1]
                      : [item.img1, item.img2],
                  description: item.description,
                },
              },
              quantity: 1,
            },
          ], shipping);
      window.location.assign(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was error checking out this item. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchShipping()
  }, [])

  const { addToBag } = useContext(ContextAPI) as ContextData;

  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      w={"100%"}
      justify={"center"}>
        
      <Box
        w={{ base: "100%", sm: "60%" }}
        aspectRatio={"1/1"}
        bg={"white"}
        borderRadius={"2em"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.4)"}>
        <Image
          src={item.img1}
          maxH={"100%"}
          maxW={"100%"}
          alt="Image of product"
        />
      </Box>
      <VStack
        w={{ base: "100%", sm: "50%", lg: "39%" }}
        bg={"white"}
        borderRadius={"2em"}
        align={"center"}
        justify={"center"}
        spacing={"1em"}
        boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.4)"}>
        <Heading
          w={"95%"}
          size={"sm"}
          fontFamily={"Roboto"}
          textAlign={"center"}
          letterSpacing={"5px"}
          mt={{base: "1em", lg: "0em"}}>
          {item.name.toUpperCase()}
        </Heading>
        <Text
          w={"95%"}
          fontFamily={"Roboto-Bold"}
          textAlign={"center"}
          letterSpacing={"5px"}
          color={"#2F3F89"}>
          £{item.price}
        </Text>
        <Button
          onClick={() => {
            addedToBagToast();
            addToBag(item);
          }}
          w={"95%"}
          fontFamily={"Roboto-Light"}
          bg={"#2F3F89"}
          letterSpacing={"5px"}
          color={"white"}>
          ADD TO BAG
        </Button>
        <Button
          onClick={buyNow}
          w={"95%"}
          fontFamily={"Roboto-Light"}
          bg={"#2c2c2c"}
          letterSpacing={"5px"}
          color={"white"}>
          BUY NOW
        </Button>
        <Text
          w={"95%"}
          fontFamily={"Roboto-Light"}
          textAlign={"center"}
          color={"#2c2c2c"}
          whiteSpace={"pre-wrap"}
          pb={"1em"}>
          {item.description}
        </Text>
      </VStack>
    </Stack>
  );
};

export default ProductPage;
