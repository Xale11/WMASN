import { Box, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalContent, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { addShippingRate, getShippingRates, ShippingRate } from '../data/StoreData'
import ShippingCard from './ShippingCard'

const ShippingAdmin = () => {

  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [shipMin, setShipMin] = useState<string>("")
  const [shipMax, setShipMax] = useState<string>("")
  const [shippingList, setShippingList] = useState<ShippingRate[]>([])

  const {onClose, onOpen, isOpen} = useDisclosure()

  const toast = useToast()

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

  const addShipping = async () => {
    if (!checkInputs){
      return
    } else {
      const res = await addShippingRate({
        name: name,
        price: parseInt(price),
        shipMin: parseInt(shipMin),
        shipMax: parseInt(shipMax)
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
          title: "Error Adding Item. Try Again.",
          duration: 5000,
          position: "top"
        })
      }
    }
  }

  const fetchShippingRates = async () => {
    const data = await getShippingRates()
    if (data === "error"){
      toast({
        status: "error",
        title: "Error Fetching Shipping Rates. Please Refresh.",
        duration: 5000,
        position: "top"
      })
    } else {
      setShippingList(data)
    }
  }

  useEffect(() => {
    fetchShippingRates()
  }, [])

  return (
    <Stack w={"100%"} direction={{ base: "column" }} align={"center"}>
      <Box
        as="button"
        onClick={onOpen}
        borderRadius={"0em"}
        bg={"#2c2c2c"}
        display={"flex"}
        alignItems={"center"}
        gap={"0.5em"}
        justifyContent={"center"}
        w={"13em"}
        padding={"0.75em 0em"}
        color={"white"}
        transition={"all 300ms ease-in-out"}
        _hover={{ bg: "#2F3F89" }}>
        <Text
        
          letterSpacing={"3px"}>
          ADD SHIPPING
        </Text>
      </Box>
      <HStack width={"100%"} flexWrap={"wrap"}>
        {shippingList.map((rate) => {
          return(<ShippingCard rate={rate}/>)
        })}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack w={"100%"}>
              <Heading letterSpacing={"5px"}>
                STORE ADMIN
              </Heading>
              <VStack w={"90%"} spacing={"1.1em"}>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Name</FormLabel>
                  <Input value={name} onChange={(e) => {setName(e.target.value)}} name="Name" id="Name" type={"text"} placeholder="Name of shipping type" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Price (£)</FormLabel>
                  <NumberInput step={0.01} precision={2} value={price} onChange={(valueString) => {setPrice(valueString)}} name="Price" id="Price" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired>
                    <NumberInputField _focus={{boxShadow: "0px 0px 0px black"}} outline={"none"} border={"none"}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Earliest Shipping Time (Days)</FormLabel>
                  <NumberInput min={0} step={1} precision={0} value={shipMin} onChange={(valueString) => {setShipMin(valueString)}} name="ShipMin" id="ShipMin" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired>
                    <NumberInputField _focus={{boxShadow: "0px 0px 0px black"}} outline={"none"} border={"none"}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Latest Shipping Time (Days)</FormLabel>
                  <NumberInput min={0} step={1} precision={0} value={shipMax} onChange={(valueString) => {setShipMax(valueString)}} name="ShipMax" id="ShipMax" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired>
                    <NumberInputField _focus={{boxShadow: "0px 0px 0px black"}} outline={"none"} border={"none"}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box as="button" onClick={addShipping}  borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                  <Text letterSpacing={"3px"}>ADD NEW SHIPPING</Text>
                </Box>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default ShippingAdmin