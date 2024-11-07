import React, { useContext, useRef } from 'react'
import { LineItem } from '../data/StoreData';
import { Box, HStack, Icon, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, VStack, Image } from '@chakra-ui/react';
import { IoChevronDown } from 'react-icons/io5';
import { ContextAPI, ContextData } from '../context/ContextProvider';
import { BiSolidTrashAlt } from 'react-icons/bi';

interface Props {
    item: LineItem
}

const BagItem = ({item}: Props) => {

    const { editItemQuantity, removeFromBag } = useContext(ContextAPI) as ContextData;

    // The popover was not closing on blur. Needed this to simulate a click on the popover body to fis problem
    const clickRef = useRef<HTMLDivElement>(null)
    //console.log(item)

  return (
    <VStack
      w={"100%"}
      align={"start"}
      onMouseOver={() => {
        if (clickRef.current) {
          clickRef.current.focus();
        }
      }}>
      <HStack w={"90%"}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} aspectRatio={"1/1"} width={"30%"}>
          <Image src={item.price_data.product_data.images[0]} w={"100"} h={"100%"} alt='Image of product in cart'/>
        </Box>
        <VStack align={"start"} h={"100%"} spacing={"0em"}>
          <Text color={"#2c2c2c"}>
            {item?.price_data?.product_data?.name.toUpperCase()}
          </Text>
          <Popover placement="right">
            <PopoverTrigger>
              <HStack cursor={"pointer"}>
                <Text color={"#2c2c2c"}>
                  Quantity: {item.quantity}
                </Text>
                <Icon as={IoChevronDown} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent
              // bg={"rgba(0, 0, 0, 0.0)"}
              boxShadow={"none"}
              border={"0px"}
              w={"fit-content"}>
              <PopoverBody>
                <VStack
                  bg={"white"}
                  w={"5em"}
                  h={"10em"}
                  border={"1px solid lightgray"}
                  spacing={"0em"}
                  overflowY={"auto"}
                  ref={clickRef}>
                    {Array.from({ length: item.stock ? item.stock : 7 }, (_, i) => i + 1).map((number) => (
                      <Text
                        key={number}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                          editItemQuantity(item, parseInt(e.currentTarget.textContent as string));
                        }}
                        w={"100%"}
                        textAlign={"center"}
                        borderBottom={"1px solid lightgray"}>
                        {number}
                      </Text>
                    ))}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Text color={"#2c2c2c"}>
            Unit Price: £{(item?.price_data?.unit_amount / 100).toFixed(2)}
          </Text>
          <Text color={"#2F3F89"}>
            Total Price: £
            {((item?.price_data?.unit_amount * item?.quantity) / 100).toFixed(
              2
            )}
          </Text>
          <HStack
            mt={"0.5em"}
            justify={"center"}
            align={"center"}
            color={"#2c2c2c"}
            cursor={"pointer"}
            _hover={{ color: "red" }}
            onClick={() => {
              removeFromBag(item);
            }}>
            <Icon as={BiSolidTrashAlt} />
            <Text fontSize={"0.9em"}>
              Remove
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Box width={"100%"} h={"1px"} bg={"#cfcfcf"}></Box>
    </VStack>
  );
}

export default BagItem