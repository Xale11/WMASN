import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Cancel = () => {
  return (
    <Box
      bg={"white"}
      w={"100vw"}
      h={{ base: "auto", md: "100vh" }}
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
            content="Cancel Page when a payment fails." 
        />
        </Helmet>
      <Navbar />
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="fit-content"
        p={"1em 0em"}
        w={{ base: "90%", lg: "30%" }}
        borderRadius={"2em"}
        gap={"0.5em"}>
        <AlertIcon />
        <AlertTitle fontFamily={"Roboto-Bold"}>Payment Cancelled</AlertTitle>
        <AlertDescription fontFamily={"Roboto"}>
          Your payment has been cancelled. If this was a mistake or if you need
          further assistance, please contact our support team.
        </AlertDescription>
        <Link
          fontSize={"0.8em"}
          textDecoration={"underline"}
          fontFamily={"Roboto"}
          as={ReactRouterLink}
          to="/">
          Return to home
        </Link>
      </Alert>
      <Box
        position={{ base: "relative", lg: "absolute" }}
        bottom={0}
        w={"100%"}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Cancel;
