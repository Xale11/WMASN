import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NavbarAdmin from "../adminComponents/NavbarAdmin";
import ProductsAdmin from "../adminComponents/ProductsAdmin";
import ShippingAdmin from "../adminComponents/ShippingAdmin";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextAPI, ContextData } from "../context/ContextProvider";

const StoreAdmin = () => {

  const navigate = useNavigate()

  const {loggedIn} = useContext(ContextAPI) as ContextData

  if (!loggedIn) {
    navigate("/admin")
  }

  return (
    <Box
      bg={"white"}
      w={"100vw"}
      h={"100vh"}
      position={"relative"}
      overflowX={"hidden"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={"1em"}>
      <NavbarAdmin />
      <Heading letterSpacing={"5px"}>
        STORE ADMIN
      </Heading>
      <Tabs w={"95%"}>
        <TabList>
          <Tab>Products</Tab>
          <Tab>Shipping</Tab>
        </TabList>
        <TabPanels>
          <TabPanel w={"100%"} display={"flex"} justifyContent={"center"}>
            <ProductsAdmin/>
          </TabPanel>
          <TabPanel>
            <ShippingAdmin/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default StoreAdmin;
