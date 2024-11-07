import { useContext, useEffect, useState } from "react";
import { getShippingRates, Product, ShippingRate } from "../data/StoreData";
import {
  VStack,
  Heading,
  Box,
  Text,
  Image,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { ContextAPI, ContextData } from "../context/ContextProvider";
import { goToCheckout } from "../data/api";
import { IoMdArrowBack } from "react-icons/io";

interface Props {
  item: Product;
  onClose?: () => void
}

const ProductPage = ({ item, onClose }: Props) => {

  const [shipping, setShipping] = useState<ShippingRate[]>()
  const [mainImg, setMainImg] = useState<string>(item.img1)

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
    <VStack
      w={"100vw"}
      justify={"center"}
      fontFamily={"swis721-ex-bt"}>
      <HStack onClick={onClose} position={"absolute"} top={"17%"} right={7} _hover={{textDecor: "underline"}}>
        <IoMdArrowBack />
        <Text >Back To Store</Text>
      </HStack>
      <HStack w={"100%"}>
        <VStack
          w={{ base: "100%", sm: "50%" }}
          h={"100%"}
          bg={"white"}
          align={"end"}
          justify={"center"}>
          <Image
            src={mainImg}
            maxH={"100%"}
            maxW={"100%"}
            alt="Image of product"
          />
        </VStack>
        <VStack w={{ base: "100%", sm: "50%" }} align={"start"}>
          <Heading
            w={"95%"}
            size={"lg"}
            fontFamily={"swis721-ex-bt-bold"} 
            color={"#2F3F89"}
            mt={{base: "1em", lg: "0em"}}>
            {item.name.toUpperCase()}
          </Heading>
          <Text color={"#2F3F89"} transform={"scaleY(1.25)"}>£{item.price}</Text>
          <Text color={"#2F3F89"}>{item.description}</Text>
          <HStack w={"100%"} color={"white"}>
            <Box onClick={() => {addToBag(item); addedToBagToast();}} _hover={{textDecor: "underline"}} textAlign={"center"} py={3} w={"12em"} bg={"#2c2c2c"} >ADD TO BAG</Box>
            <Box onClick={buyNow} _hover={{textDecor: "underline"}} textAlign={"center"} py={3} w={"12em"} bg={"#2F3F89"}>BUY NOW</Box>
          </HStack>
          {item.img2 && <HStack>
            <Image onClick={() => {setMainImg(item.img1)}} cursor={"pointer"} src={item.img1} aspectRatio={"1/1"} w={"7em"} objectFit={"cover"}/>
            <Image onClick={() => {setMainImg(item.img2 ? item.img2 : "")}} cursor={"pointer"} src={item.img2} aspectRatio={"1/1"} w={"7em"} objectFit={"cover"}/>
          </HStack>}
        </VStack>
      </HStack>  
    </VStack>
  );
};

export default ProductPage;


{/* <VStack
        w={{ base: "100%", sm: "60%" }}
        aspectRatio={"1/1"}
        bg={"white"}
        align={"end"}
        boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.4)"}>
        <Image
          src={item.img1}
          maxH={"100%"}
          maxW={"100%"}
          alt="Image of product"
        />
      </VStack>
      <VStack
        w={{ base: "100%", sm: "50%", lg: "39%" }}
        bg={"white"}
        justify={"center"}
        spacing={"1em"}
        boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.4)"}>
        <Heading
          w={"95%"}
          size={"lg"}
          fontFamily={"swis721-ex-bt"} 
          color={"#2F3F89"}
          transform={"scaleY(1.25)"}
          textAlign={"left"}
          letterSpacing={"1px"}
          mt={{base: "1em", lg: "0em"}}>
          {item.name.toUpperCase()}
        </Heading>
        <Text
          w={"95%"}
          fontFamily={"swis721-ex-bt"} 
          transform={"scaleY(1.25)"}
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
          fontFamily={"swis721-ex-bt"} 
          transform={"scaleY(1.25)"}
          bg={"#2F3F89"}
          letterSpacing={"5px"}
          color={"white"}>
          ADD TO BAG
        </Button>
        <Button
          onClick={buyNow}
          w={"95%"}
          bg={"#2c2c2c"}
          letterSpacing={"5px"}
          color={"white"}>
          BUY NOW
        </Button>
        <Text
          w={"95%"}
          textAlign={"center"}
          color={"#2c2c2c"}
          whiteSpace={"pre-wrap"}
          pb={"1em"}>
          {item.description}
        </Text>
      </VStack> */}