import { useContext } from "react";
import { Product } from "../data/StoreData";
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
  const toast = useToast();

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
    // try {
    //   const res = await fetch("http://localhost:3000/checkout", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       lineItems: [
    //         {
    //           price_data: {
    //             currency: "gbp",
    //             unit_amount: item.price * 100,
    //             product_data: {
    //               name: item.name,
    //               images:
    //                 item.img2 === undefined
    //                   ? [item.img1]
    //                   : [item.img1, item.img2],
    //               description: item.description,
    //             },
    //           },
    //           quantity: 1,
    //         },
    //       ],
    //     }),
    //   });
    //   const url = await res.json();
    //   console.log(url);
    //   window.location.assign(url);
    try {
      const url = await goToCheckout([
            {
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
          ]);
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo corporis
          perferendis voluptatibus ab labore, quae dolores tempora voluptate
          libero asperiores quasi impedit rem aperiam quis nesciunt modi?
          Dolorem, iste. Facilis repudiandae omnis corporis non illo rem nobis
          ab sequi ipsa?
        </Text>
      </VStack>
    </Stack>
  );
};

export default ProductPage;
