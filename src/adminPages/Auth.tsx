import { Box, Button, Container, FormLabel, Heading, Input, Text, useToast, VStack } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { ContextAPI, ContextData } from '../context/ContextProvider';

const Auth = () => {

  const [user, setUser] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const toast = useToast()

  const navigate = useNavigate()

  const signIn = async () => {
    if (user === "" || password === ""){
      toast({
        status: "error",
        title: "Missing Input",
        position: "top",
        isClosable: true,
        duration: 4000
      })
    }
    try {
      const data = await signInWithEmailAndPassword(auth, user, password)
      if (data) {
        sessionStorage.setItem("wmasnLogin", JSON.stringify({loggedIn: true}));
        setLoggedIn(true)
        navigate("/admin/home")
      }
    } catch (error) {
      console.error(error)
      toast({
        status: "error",
        title: "Incorrect Login Details",
        description: "Please check your login details",
        position: "top",
        isClosable: true,
        duration: 4000
      })
    }
    setLoading(false)
  }

  const {loggedIn, setLoggedIn} = useContext(ContextAPI) as ContextData

  if (loggedIn) {
    navigate("/admin/home")
  }

  return (
    <VStack w={"100vw"} h={"100vh"}>
      <Container display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"1em"}>
        <Heading>WMASN ADMIN LOGIN</Heading>
        <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
          <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Email</FormLabel>
          <Input value={user} onChange={(e) => {setUser(e.target.value)}} name="User" id="User" type={"text"} placeholder="Enter email..." border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
        </Box>
        <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"100%"}>
          <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Password</FormLabel>
          <Input value={password} onChange={(e) => {setPassword(e.target.value)}} name="Password" id="Password" type={"password"} placeholder="Enter password..." border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
        </Box>
        <Button isLoading={loading} mb={"1em"}  onClick={() => {setLoading(true); signIn()}} borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} w={"13em"} padding={"0.75em 0em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{ bg: "#2F3F89" }}>
          <Text letterSpacing={"3px"}>
            LOG IN
          </Text>
        </Button>
      </Container>
    </VStack>
  )
}

export default Auth