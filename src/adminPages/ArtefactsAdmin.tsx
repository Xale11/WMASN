import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import NavbarAdmin from '../adminComponents/NavbarAdmin';
import CommissionedArtefacts from './CommissionedArtefacts';
import SubmittedAdmin from './SubmittedAdmin';

const ArtefactsAdmin = () => {

  return (
    <Box bg={"white"} w={"100vw"} h={"100vh"} position={"relative"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"1em"}>
      <NavbarAdmin />
      <Heading fontFamily={"Roboto"} letterSpacing={"5px"}>
        ARTEFACTS ADMIN
      </Heading>
      <Tabs w={"95%"}>
        <TabList>
          <Tab>Commissioned Artefacts</Tab>
          <Tab>Submitted Artefacts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <CommissionedArtefacts/>
          </TabPanel>
          <TabPanel display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <SubmittedAdmin/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default ArtefactsAdmin