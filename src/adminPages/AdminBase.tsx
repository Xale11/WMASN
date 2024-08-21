import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import NavbarAdmin from "../adminComponents/NavbarAdmin";

const AdminBase = () => {
  return (
    <Box bg={"white"} w={"100vw"} h={"100vh"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"1em"}>
      <NavbarAdmin />
      <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
        STORE ADMIN
      </Heading>
      <Tabs w={"95%"}>
        <TabList>
          <Tab>Products</Tab>
          <Tab>Shipping</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display={"flex"} justifyContent={"center"}>
            Store
          </TabPanel>
          <TabPanel display={"flex"} justifyContent={"center"}>
            Shipping
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminBase;
