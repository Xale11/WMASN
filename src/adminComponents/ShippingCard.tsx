import { Box, HStack, VStack, Text, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, Heading, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react"
import { editShippingRates, removeShippingRates, ShippingRate } from "../data/StoreData"
import { useState } from "react"

interface Props {
  rate: ShippingRate
}

const ShippingCard = ({rate}: Props) => {

  const toast = useToast()

  const [remove, setRemove] = useState<boolean>(false)
  const [name, setName] = useState<string>(rate.name)
  const [price, setPrice] = useState<string>(`${rate.price}`)
  const [shipMin, setShipMin] = useState<string>(`${rate.shipMin}`)
  const [shipMax, setShipMax] = useState<string>(`${rate.shipMax}`)

  const {isOpen, onOpen, onClose} = useDisclosure()

  const checkInputs = () => {
    if (shipMax < shipMin){
      toast({
        title: "Overlapping Shipping Dates",
        status: "error", 
        duration: 5000
      })
      return false
    }
    else if (name === "" || price === "" || shipMin === "" || shipMax === ""){
      toast({
        title: "Missing Inputs",
        description: "Please make sure to fill out all inputs",
        status: "error", 
        duration: 5000
      })
      return false
    } else {
      return true
    }
  }

  const editShipping = async () => {
    if (!checkInputs){
      return
    } else {
      const res = await editShippingRates({
        id: rate.id,
        name: name,
        price: parseFloat(price),
        shipMin: parseInt(shipMin),
        shipMax: parseInt(shipMax)
      })
      if (res === "success"){
        onClose()
        toast({
          status: "success",
          title: "Updated Item",
          duration: 5000,
          position: "top"
        })
      } else {
        toast({
          status: "error",
          title: "Error Updating Item. Try Again.",
          duration: 5000,
          position: "top"
        })
      }
    }
  }

  const removeShipping = async () => {
    const res = await removeShippingRates(rate)
    if (res === "success"){
      onClose()
      toast({
        status: "success",
        title: "Shipping Removed",
        duration: 5000,
        position: "top"
      })
    } else {
      toast({
        status: "error",
        title: "Error Removing Shipping. Try Again.",
        duration: 5000,
        position: "top"
      })
    }
  }

  const removeConfirm = async () => {
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
        await removeShipping()
    }
  }

  return (
    <VStack w={"30em"} h={"10em"} bg={"lightgray"}>
      <Box w={"100%"} h={"7em"}>
        <Text>Name: {rate.name}</Text>
        <Text>Price: {rate.price}</Text>
        <Text>Earliest Shipping Time (Days): {rate.shipMin}</Text>
        <Text>Latest Shipping Time (Days): {rate.shipMax}</Text>
      </Box>
      <HStack w={"100%"} h={"3em"} spacing={"0em"}>
      <Box onClick={onOpen} display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"50%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
        EDIT SHIPPING
      </Box>
      <Box onClick={removeConfirm} display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#FD2F2F"} h={"100%"} w={"50%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
        REMOVE SHIPPING
      </Box>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack w={"100%"}>
              <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
                STORE ADMIN
              </Heading>
              <VStack w={"90%"} spacing={"1.1em"}>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Name</FormLabel>
                  <Input value={name} onChange={(e) => {setName(e.target.value)}} name="Name" id="Name" type={"text"} fontFamily={"Roboto"} placeholder="Name of shipping type" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
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
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Earliest Shipping Time (Days)</FormLabel>
                  <NumberInput min={0} step={1} precision={0} value={shipMin} onChange={(valueString) => {setShipMin(valueString)}} name="ShipMin" id="ShipMin" fontFamily={"Roboto"} border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired>
                    <NumberInputField _focus={{boxShadow: "0px 0px 0px black"}} outline={"none"} border={"none"}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Latest Shipping Time (Days)</FormLabel>
                  <NumberInput min={0} step={1} precision={0} value={shipMax} onChange={(valueString) => {setShipMax(valueString)}} name="ShipMax" id="ShipMax" fontFamily={"Roboto"} border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired>
                    <NumberInputField _focus={{boxShadow: "0px 0px 0px black"}} outline={"none"} border={"none"}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box as="button" onClick={editShipping} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                  <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>UPDATE SHIPPING</Text>
                </Box>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default ShippingCard