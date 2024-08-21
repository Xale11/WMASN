import { useRef, useState } from "react";
import { deleteStoreItem, editStoreItem, Product, removeProductImg } from "../data/StoreData";
import { Box, Button, ButtonGroup, FormLabel, Heading, HStack, Image, Input, Modal, ModalBody, ModalContent, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";

interface Props {
    item: Product
  }
  
const ProductItemAdmin = ({item}: Props) => {
  
  const [name, setName] = useState<string>(item.name)
  const [price, setPrice] = useState<string>(`${item.price}`);
  const [description, setDescription] = useState<string>(item.description)
  const [stock, setStock] = useState<string>(`${item.stock}`)
  const [remove, setRemove] = useState<boolean>(false)

  const img1Ref = useRef<HTMLInputElement>(null)
  const img2Ref = useRef<HTMLInputElement>(null)

  const {isOpen, onClose, onOpen} = useDisclosure()

  const toast = useToast()

  const checkInputs = () => {
    if (name === "" || price === "" || description === "" || stock === "" || img1Ref.current?.files === null){
      return false
    }
    return true
  }

  const editItem = async () => {
    if (!checkInputs()){
      toast({
        status: "error",
        title: "Missing Input",
        description: "Please make sure you have entered value for all inputs and have added a file for image 1",
        duration: 5000,
        position: "top"
      })
      return 
    }
    if (img1Ref.current && img2Ref.current && img1Ref.current.files !== null){
      const res = await editStoreItem({
        name: name,
        description: description,
        price: parseFloat(price),
        img1: img1Ref.current?.files[0],
        img2: img2Ref.current.files !== null ? img2Ref.current.files[0] : undefined,
        stock: parseInt(stock),
        id: item.id
      })
      if (res === "success"){
        onClose()
        toast({
          status: "success",
          title: "Added New Item",
          duration: 5000,
          position: "top"
        })
      } else {
        toast({
          status: "error",
          title: "Error Editing The Item. Try Again.",
          duration: 5000,
          position: "top"
        })
      }
    }
  }

  const removeItem = async () => {
    const res = await deleteStoreItem(item) 
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Removed Item",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Adding Item. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  const removeImg = async () => {
    const res = await removeProductImg(item) 
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Removed Item",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Adding Item. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  const removeConfirm = () => {
    if (!remove){
      toast({
        title: "Are You Sure?",
        description: "Removal cannot be undone. Click again to confirm removal.",
        status: "error", 
        duration: 9000,
        position: "top",
        isClosable: true
      })
      setRemove(true)
    } else {
      removeImg()
    }
  }

  return (
    <Box width={"20em"} aspectRatio={"1/1.5"}>
      <Box h={"65%"} w={"100%"}>
        <Image w={"100%"} h={"100%"} src={item.img1} objectFit={"contain"} alt={"Image of product"}/>
      </Box>
      <VStack w={"100%"} h={"20%"} spacing={"0em"}>
        <Text fontFamily={"Roboto"}>{item.name}</Text>
        <Text fontFamily={"Roboto"}>£{item.price}</Text>
        <Text fontFamily={"Roboto"}>Stock: {item?.stock}</Text>
      </VStack>
      <HStack w={"100%"} h={"15%"} spacing={"0em"}>
        <Box onClick={onOpen} display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"50%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
          EDIT ITEM
        </Box>
        <Popover>
          <PopoverTrigger>
            <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#FD2F2F"} h={"100%"} w={"50%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
              REMOVE ITEM
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton/>
            <PopoverBody>
              <VStack>
                <Text>Are you Sure?</Text>
              <ButtonGroup>
                <Button onClick={removeItem} color={"white"} bg="green">Yes</Button>
                <Button m={"0em"} p={"0em"} color={"white"} bg="red" display={"flex"}><PopoverCloseButton m={"0em"} p={"0em"} fontSize={"1em"}>No</PopoverCloseButton></Button>
              </ButtonGroup>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack w={"100%"}>
              <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
                EDIT ITEM
              </Heading>
              <HStack>
                <Box display={"flex"} flexDirection={"column"}>
                  <Box display={"flex"} alignItems={"center"} justifyContent={"center"} aspectRatio={"1/1"} w={"15em"}>
                    <Image src={item.img1} alt="Image of the product" w={"100%"} aspectRatio={"1/1"} objectFit={"contain"}/>
                  </Box>
                  <Input type="file" ref={img1Ref}/>
                  <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
                    IMAGE 1 (Primary)
                  </Box>
                </Box>

                <Box display={"flex"} flexDirection={"column"}>
                  <Box display={"flex"} alignItems={"center"} justifyContent={"center"} aspectRatio={"1/1"} w={"15em"}>
                    {item.img2 !== undefined && <Image src={item.img2} alt="Image of the product" w={"100%"} aspectRatio={"1/1"} objectFit={"contain"}/>}
                  </Box>
                  <Input type="file" ref={img2Ref}/>
                  <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
                    IMAGE 2 (Secondary)
                  </Box>
                  <Box onClick={removeConfirm} display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#FD2F2F"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
                    REMOVE IMAGE
                  </Box>
                </Box>
              </HStack>
              <VStack w={"90%"} spacing={"1.1em"}>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Name</FormLabel>
                  <Input value={name} onChange={(e) => {setName(e.target.value)}} name="Name" id="Name" type={"text"} fontFamily={"Roboto"} placeholder="Name of product" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Price (£)</FormLabel>
                  <NumberInput step={0.01} precision={2} value={price} onChange={(valueString) => {setPrice(valueString)}} name="Price" id="Price" fontFamily={"Roboto"} border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired>
                    <NumberInputField _focus={{boxShadow: "0px 0px 0px black"}} outline={"none"} border={"none"}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Description</FormLabel>
                  <Input value={description} onChange={(e) => {setDescription(e.target.value)}} name="Description" id="Description" type={"text"} fontFamily={"Roboto"} placeholder="Product description" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Stock</FormLabel>
                  <NumberInput step={1} precision={0} value={stock} onChange={(valueString) => {setStock(valueString)}} name="Stock" id="Stock" fontFamily={"Roboto"} border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired>
                    <NumberInputField _focus={{boxShadow: "0px 0px 0px black"}} outline={"none"} border={"none"}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box as="button" onClick={editItem} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                  <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>SAVE</Text>
                </Box>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

  export default ProductItemAdmin