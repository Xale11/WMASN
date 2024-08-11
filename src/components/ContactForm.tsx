import { Box, Heading, Icon, Stack, Text, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const ContactForm = () => {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  return (
    <Stack direction={"row"} w={"100%"} h={"30em"} fontFamily={"Roboto"} justify={"space-between"}>
      <Stack direction={"column"} align={"start"} justify={"center"} w={"40%"} gap={"1em"} pl={"5em"}>
        <Heading size={"2xl"} color={"#2c2c2c"} fontFamily={"Roboto-Light"} letterSpacing={"3px"}>CONTACT OUR TEAM</Heading>
        <Text fontFamily={"Roboto-Light"} color={"#2c2c2c"}>Connect with us to see how our designs can enhance your living or working spaces.</Text>
        <Box borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"1em"} justifyContent={"center"} padding={"0.75em 1em"} cursor={"pointer"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "0.75em 1.5em"}}>
            <Icon as={FiPhone}/>
            <Text>+447803827743</Text>
        </Box>
        <Box borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"1em"} justifyContent={"center"} padding={"0.75em 1em"} cursor={"pointer"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "0.75em 1.5em"}}>
            <Icon as={IoMailOutline}/>
            <Text>WMAS.Nigerian@gmail.com</Text>
        </Box>
      </Stack>
      {/* Contact Form */}
      <Stack direction={"column"} w={"50%"} h={"100%"} justify={"center"} color={"#2c2c2c"}>
        <FormControl w={"100%"}>
          <Box as="form" action={"https://getform.io/f/amdpgvzb"} method="POST" h={"100%"} w={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"start"} gap={"1.5em"}>

            <Stack direction={"row"} w={"100%"} spacing={"2em"}>
              <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"45%"}>
                <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="name">NAME</FormLabel>
                <Input value={name} onChange={(e) => {setName(e.target.value)}} name="name" id="name" type={"text"} fontFamily={"Roboto"} placeholder="John Doe" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
              </Box>

              <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"45%"}>
                <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="email">EMAIL</FormLabel>
                <Input value={email} onChange={(e) => {setEmail(e.target.value)}} name="email" id="email" type={"email"} fontFamily={"Roboto"} placeholder="example@email.com" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
              </Box>
            </Stack>

            <Box display={"flex"} flexDirection={"column"} borderBottom={"2px solid #2c2c2c"} width={"calc(90% + 2em)"}>
              <FormLabel m={"0px"} fontFamily={"Roboto-Light"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">MESSAGE</FormLabel>
              <Input value={message} onChange={(e) => {setMessage(e.target.value)}} name="message" id="message" type={"text"} fontFamily={"Roboto"} placeholder="Hi there..." border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}} isRequired/>
            </Box>

            <Box as="button" borderRadius={"0em"} bg={"#2c2c2c"} display={"flex"} alignItems={"center"} gap={"0.5em"} justifyContent={"center"} padding={"1.25em 1.75em"} color={"white"} transition={"all 300ms ease-in-out"} _hover={{padding: "1.25em 2.5em"}}>
              <Text fontFamily={"Roboto-Light"} letterSpacing={"3px"}>SEND EMAIL</Text>
              <Icon fontSize={"1.5em"} as={LiaLongArrowAltRightSolid}/>
            </Box>

          </Box>
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default ContactForm