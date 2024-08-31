import {
  Box,
  Heading,
  Stack,
  Text,
  Icon,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link,
  VStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoChevronDown } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaBagShopping } from "react-icons/fa6";
import { useContext, useEffect, useRef, useState } from "react";
import StoreGrid from "../components/StoreGrid";
import { Product, getStoreItems } from "../data/StoreData";
import { ContextAPI, ContextData } from "../context/ContextProvider";
import { Helmet } from "react-helmet";
const Store = () => {
  const [search, setSearch] = useState<string>("");
  const [storeItems, setStoreItems] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  const {numItems, getBag} = useContext(ContextAPI) as ContextData

  const fetchStoreItems = async () => {
    const data = await getStoreItems();
    if (data !== "error") {
      if (search === "") {
        setStoreItems(data);
      } else {
        const newArr = storeItems?.filter((item) =>
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
    getBag()
  }, []);

  console.log(fetchError);

  return (
    <Box
      bg={"white"}
      w={"100vw"}
      position={"relative"}
      overflowX={"hidden"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={"1em"}>
        <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WMASN | Nigerian Architecture, Artifacts & Spaces by Moyo Adebayo</title>
        <meta 
            name="description" 
            content="Store page for architectural artefacts for sale. What Makes a Space Nigerian (W.M.A.S.N) explores Nigerian architecture through speculative exhibitions." 
        />
        </Helmet>
      <Navbar />
      <Link as={ReactRouterLink} to={"/bag"}>
        <Box position={"absolute"} right={"2em"} >
          <Box position={"relative"}>
            <Icon
              fontSize={"2em"}
              _hover={{ color: "#2F3F89" }}
              right={"1em"}
              as={FaBagShopping}
            />
            {numItems !== 0 && <VStack
              top={"-2px"}
              right={"-2px"}
              position={"absolute"}
              bg={"red"}
              color={"white"}
              textAlign={"center"}
              borderRadius={"50%"}
              fontSize={"0.5em"}
              w={"2em"}
              aspectRatio={"1/1"}
              align={"center"}
              justify={"center"}>
              <Text>{numItems}</Text>
            </VStack>}
          </Box>
        </Box>
      </Link>
      <Heading
        size={"lg"}
        mt={{ base: "1.5em", sm: "0em" }}
        fontFamily={"Roboto"}
        letterSpacing={"5px"}
        textAlign={"center"}>
        WELCOME TO THE STORE
      </Heading>
      <Text
        w={{ base: "80%", lg: "50%" }}
        fontFamily={"Roboto-Light"}
        textAlign={"center"}>
        Here are a collection of artefacts that we believe are representative of
        Nigerian culture and defining factors of what makes a space Nigerian
      </Text>
      <Stack direction={{ base: "column", sm: "row" }}>
        <Popover>
          <PopoverTrigger>
            <Box
              as="button"
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
              <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>
                SORT
              </Text>
              <Icon fontSize={"1.5em"} as={GoChevronDown} />
            </Box>
          </PopoverTrigger>
          <PopoverContent
            w={"13em"}
            border={"1px solid #2c2c2c"}
            borderRadius={"0em"}
            fontFamily={"Roboto-Light"}
            ref={popoverRef}>
            <Stack direction={"column"} spacing={{ base: "1em", lg: "0em" }}>
              <Text
                onClick={() => {
                  sortItems("a-z");
                }}
                w={"100%"}
                _hover={{ bg: "lightgray" }}
                cursor={"pointer"}>
                Alphabetical (A-Z)
              </Text>
              <Text
                onClick={() => {
                  sortItems("z-a");
                }}
                w={"100%"}
                _hover={{ bg: "lightgray" }}
                cursor={"pointer"}>
                Alphabetical (Z-A)
              </Text>
              <Text
                onClick={() => {
                  sortItems("high-low");
                }}
                w={"100%"}
                _hover={{ bg: "lightgray" }}
                cursor={"pointer"}>
                Price (High-Low)
              </Text>
              <Text
                onClick={() => {
                  sortItems("low-high");
                }}
                w={"100%"}
                _hover={{ bg: "lightgray" }}
                cursor={"pointer"}>
                Price (Low-High)
              </Text>
              <Text
                onClick={() => {
                  sortItems("a-z");
                }}
                w={"100%"}
                _hover={{ bg: "lightgray" }}
                cursor={"pointer"}>
                Release (New-Old)
              </Text>
              <Text
                onClick={() => {
                  sortItems("a-z");
                }}
                w={"100%"}
                _hover={{ bg: "lightgray" }}
                cursor={"pointer"}>
                Release (Old-New)
              </Text>
            </Stack>
          </PopoverContent>
        </Popover>
        <Box
          borderRadius={"0em"}
          border={"1px solid #2c2c2c"}
          display={"flex"}
          alignItems={"center"}
          gap={"0.5em"}
          justifyContent={"center"}
          w={"13em"}
          padding={"0.75em 0em"}
          transition={"all 300ms ease-in-out"}>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            fontFamily={"Roboto"}
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
      {storeItems && (
        <StoreGrid
          items={filteredItems.length > 0 ? filteredItems : storeItems}
        />
      )}
      <Footer />
    </Box>
  );
};

export default Store;
