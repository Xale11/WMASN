import {
  Box,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { addStoreItem, getStoreItems, Product } from "../data/StoreData";
import ProductItemAdmin from "./ProductItemAdmin";

const ProductsAdmin = () => {
  const [search, setSearch] = useState<string>("");
  const [storeItems, setStoreItems] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("")
  const [stock, setStock] = useState<string>("")

  const popoverRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLInputElement>(null)
  const img2Ref = useRef<HTMLInputElement>(null)

  const {isOpen, onOpen, onClose} = useDisclosure()

  const toast = useToast()

  // const { numItems } = useContext(ContextAPI) as ContextData;

  const checkInputs = () => {
    if (name === "" || price === "" || description === "" || stock === "" || img1Ref.current?.files === null){
      return false
    }
    return true
  }

  const addItem = async () => {
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
      const res = await addStoreItem({
        name: name,
        description: description,
        price: parseInt(price),
        img1: img1Ref.current?.files[0],
        img2: img2Ref.current.files !== null ? img2Ref.current.files[0] : undefined,
        stock: parseInt(stock)
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

  const fetchStoreItems = async () => {
    const data = await getStoreItems();
    if (data !== "error") {
      if (search === "") {
        setStoreItems(data);
      } else {
        const newArr = storeItems?.filter((item: Product) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredItems(newArr);
      }
    } else {
      setFetchError(true);
    }
  };

  const filterItems = () => {
    if (search === "") {
      setFilteredItems([...storeItems]);
    } else {
      const newArr = storeItems?.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(newArr);
    }
  };

  const sortItems = (order: string) => {
    let arr: Product[] = [];
    if (filteredItems.length === 0) {
      arr = [...storeItems];
    } else {
      arr = [...filteredItems];
    }
    switch (order) {
      case "a-z":
        arr.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        //console.log(arr);
        setFilteredItems(arr);
        break;

      case "z-a":
        arr.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
        setFilteredItems(arr);
        break;

      case "high-low":
        arr.sort((a, b) => a.price - b.price);
        setFilteredItems(arr);
        break;

      case "low-high":
        arr.sort((a, b) => b.price - a.price);
        setFilteredItems(arr);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    // const data = items
    // setItemList(data)
    fetchStoreItems();
  }, []);

  console.log(fetchError);

  return (
    <Stack w={"100%"} direction={{ base: "column" }} align={"center"}>
      <Stack direction={{ base: "column", sm: "row" }}>
        <Popover>
          <PopoverTrigger>
            <Box as="button" borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} w={"13em"} padding={"0.75em 0em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{ bg: "#2F3F89" }}>
              <Text letterSpacing={"3px"}>
                SORT
              </Text>
              <Icon fontSize={"1.5em"} as={GoChevronDown} />
            </Box>
          </PopoverTrigger>
          <PopoverContent w={"13em"} border={"1px solid #2c2c2c"} borderRadius={"0em"} ref={popoverRef}>
            <Stack direction={"column"} spacing={{ base: "1em", lg: "0em" }}>
              <Text onClick={() => {sortItems("a-z");}} w={"100%"} _hover={{ bg: "lightgray" }} cursor={"pointer"}>
                Alphabetical (A-Z)
              </Text>
              <Text onClick={() => {sortItems("z-a");}} w={"100%"} _hover={{ bg: "lightgray" }} cursor={"pointer"}>
                Alphabetical (Z-A)
              </Text>
              <Text onClick={() => {sortItems("high-low");}} w={"100%"} _hover={{ bg: "lightgray" }} cursor={"pointer"}>
                Price (High-Low)
              </Text>
              <Text onClick={() => {sortItems("low-high");}} w={"100%"} _hover={{ bg: "lightgray" }} cursor={"pointer"}>
                Price (Low-High)
              </Text>
              <Text onClick={() => {sortItems("a-z");}} w={"100%"} _hover={{ bg: "lightgray" }} cursor={"pointer"}>
                Release (New-Old)
              </Text>
              <Text onClick={() => {sortItems("a-z");}} w={"100%"} _hover={{ bg: "lightgray" }} cursor={"pointer"}>
                Release (Old-New)
              </Text>
            </Stack>
          </PopoverContent>
        </Popover>
        <Box borderRadius={"0em"} border={"1px solid #2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} w={"13em"} padding={"0.75em 0em"} transition={"all 300ms ease-in-out"}>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          
            type="text"
            w={"100%"}
            h={"100%"}
            border={"none"}
            pl={"1em"}
            outline={"none"}
            _hover={{ border: "none" }}
            _focus={{ boxShadow: "none" }}
            placeholder={"SEARCH . . ."}
          />
        </Box>
        <Box
          as="button"
          onClick={filterItems}
          borderRadius={"0em"}
          bg={"#2c2c2c"}
          display={"flex"}
          alignItems={"center"}
          gap={"0.5em"}
          justifyContent={"center"}
          padding={"0.75em"}
          color={"white"}
          transition={"all 300ms ease-in-out"}
          _hover={{ bg: "#2F3F89" }}>
          <Icon fontSize={"1.5em"} as={IoSearch} />
        </Box>
      </Stack>
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
          ADD ITEM
        </Text>
      </Box>
      <HStack width={"100%"} flexWrap={"wrap"}>
        {filteredItems.length > 0
          ? filteredItems.map((item) => {
              return <ProductItemAdmin item={item} />;
            })
          : storeItems.map((item) => {
              return <ProductItemAdmin item={item} />;
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
              <HStack>
                <Box display={"flex"} flexDirection={"column"}>
                  <Input type="file" ref={img1Ref}/>
                  <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} color={"white"}>
                    IMAGE 1 (Primary)
                  </Box>
                </Box>

                <Box display={"flex"} flexDirection={"column"}>
                  <Input type="file" ref={img2Ref}/>
                  <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} color={"white"}>
                    IMAGE 2 (Secondary)
                  </Box>
                </Box>
              </HStack>
              <VStack w={"90%"} spacing={"1.1em"}>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Name</FormLabel>
                  <Input value={name} onChange={(e) => {setName(e.target.value)}} name="Name" id="Name" type={"text"} placeholder="Name of product" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
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
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Description</FormLabel>
                  <Input value={description} onChange={(e) => {setDescription(e.target.value)}} name="Description" id="Description" type={"text"} placeholder="Product description" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
                </Box>
                <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
                  <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Stock</FormLabel>
                  <NumberInput step={1} precision={0} value={stock} onChange={(valueString) => {setStock(valueString)}} name="Stock" id="Stock" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired>
                    <NumberInputField _focus={{boxShadow: "0px 0px 0px black"}} outline={"none"} border={"none"}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box as="button" onClick={addItem} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
                  <Text letterSpacing={"3px"}>SAVE</Text>
                </Box>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default ProductsAdmin;
