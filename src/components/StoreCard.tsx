import { Box, Heading, Image, Modal, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { Product } from '../data/StoreData'
import { useState } from 'react'
import ProductPage from '../pages/ProductPage'
import Navbar from './Navbar'

interface Props {
    item: Product
}
const StoreCard = ({item}: Props) => {

  const [hover, setHover] = useState<boolean>(false)

  const {onOpen, isOpen, onClose} = useDisclosure()

  const days = 10 * (86400000) // days in firebase timestamp format. First number determines the days (ms)

  const isNew = () => {
    if (item?.createdAt){
      const itemDate = parseInt(item?.createdAt) * 1000
      const curTime = new Date().getTime() - days
      if (curTime < itemDate){
        return true
      } else {
        return false
      }

    } else {
      return false
    }
    
  }

  return (
    <Box
      onClick={onOpen}
      position={"relative"}
      w={{ base: "90%", lg: "30%" }}
      h={"30em"}
      cursor={"pointer"}
      pointerEvents={`${item.stock !== undefined && item?.stock < 1 ? "none" : "auto"}`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}>
      {item.stock !== undefined && item?.stock < 1 && <Stack position={"absolute"} h={"100%"} w={"100%"} align={"center"} justify={"center"} bg={"rgba(0, 0, 0, 0.5)"}>
        <Heading color={"white"}>Sold Out</Heading>
      </Stack>}
      <Box
        bg={"#F1F1F1"}
        w={"100%"}
        h={"90%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}>
        <Image
          src={item.img2 && hover ? item.img2 : item.img1}
          objectFit={"cover"}
          objectPosition={"center"}
          h={"100%"}
        />
      </Box>
      <Box>
        <Text fontFamily={"swis721-ex-bt"}>{item.name}</Text>
        <Text fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} color={"#2F3F89"}>
          £{item.price.toFixed(2)}
        </Text>
      </Box>
      {isNew() && <Box p={"0.5em 1em"} position={"absolute"} bg={"#2c2c2c"} color={"white"} fontFamily={"swis721-ex-bt"} top={0} right={0}>
        NEW
      </Box>}
      <Modal onClose={onClose} isOpen={isOpen} size="full">
        <ModalOverlay />
        <ModalContent boxShadow={"none"}>
          <Navbar/>
          <ModalCloseButton
              bg={"#2F3F89"}
              color={"white"}
              position={"absolute"}
              top={5}
              right={{ base: 9, sm: undefined }}
              left={{ base: undefined, sm: 9, lg: "12em" }}
              display={{base: "block", lg: "none"}}
            />
            <ProductPage item={item} onClose={onClose}/>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default StoreCard