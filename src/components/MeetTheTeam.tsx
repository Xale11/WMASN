import { Box, Heading, VStack, Icon, Text } from '@chakra-ui/react'
import { IoPersonCircle } from "react-icons/io5";

const MeetTheTeam = () => {
  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} marginBottom={"1em"}>
        <Box width={"100%"} display={"flex"}  flexDirection={"column"} justifyContent={"start"} alignItems={"center"}>
            <Heading size={"2xl"} color={"#bdbdbd"} margin={"0.5em 0em"}>Meet The Team</Heading>
            
            <Box display={"flex"} bg={"#333333"} gap={"1em"} flexDir={"row"} justifyContent={"center"} alignItems={"center"} width={"100%"} padding={"1em 0em"} borderRadius={"0em"}>
                <Box display={"flex"} flexDir={"row"} justifyContent={"start"} alignItems={"center"} width={"80%"}>
                    <Icon display={{base: "none", lg: "inline"}} as={IoPersonCircle} fontSize={"15em"} color={"#D9D9D9"}/>
                    <VStack>
                        <Box display={"flex"} justifyContent={"center"} color={"white"} alignItems={{base: "start", lg: "end"}} flexDir={{base: "column", lg: "row"}} w={"100%"} gap={{base: "0.25em", lg: "0.5em"}}>
                            <Heading size={{base: "md", lg: "xl"}} fontWeight={"bold"} display={"inline"}>Moyo Adebayo</Heading>
                            <Text fontSize={{base: "1em", lg: "1.75em"}}>- Lead Curator/Director</Text>
                        </Box>
                        <Text color={"white"} fontSize={{base: "0.8em", lg: "1em"}}>
                        Moyo is a designer, architecture graduate, and researcher interested in designing culturally responsive spaces for Nigerians and Africans at large. He aims to “inject Africa into the architectural canon” by sparking interest in vernacular architecture within communities through critical designs and collaborative practices.
                        </Text>
                    </VStack>
                </Box>
                
            </Box>
            

            <Box display={"flex"} gap={"1em"} flexDir={"row-reverse"} justifyContent={"center"} alignItems={"center"} width={"100%"} padding={"1em 0em"} borderRadius={"0em"}>
                <Box display={"flex"} flexDir={"row-reverse"} justifyContent={"start"} alignItems={"center"} width={"80%"}>
                    <Icon display={{base: "none", lg: "inline"}} as={IoPersonCircle} fontSize={"15em"} color={"#D9D9D9"}/>
                    <VStack>
                        <Box display={"flex"} justifyContent={"center"} color={"black"} alignItems={{base: "start", lg: "end"}} flexDir={{base: "column", lg: "row"}} w={"100%"} gap={"0.5em"}>
                            <Heading size={{base: "md", lg: "xl"}} fontWeight={"bold"} display={"inline"}>Tunmiji Osibodu</Heading>
                            <Text fontSize={{base: "1em", lg: "1.75em"}}>- Curator/Cinematographer</Text>
                        </Box>
                        <Text color={"black"}>
                        Tunmiji is a MArch student and Photographer working on sets with Wizkid amongst other artists and has helped produce set designs for the likes of Rema. His overall creative practice is informed by people’s real experiences and his immediate surroundings.
                        </Text>
                    </VStack>
                </Box>
            </Box>

            <Box display={"flex"} bg={"#333333"} gap={"1em"} flexDir={"row"} justifyContent={"center"} alignItems={"center"} width={"100%"} padding={"1em 0em"} borderRadius={"0em"}>
                <Box display={"flex"} flexDir={"row"} justifyContent={"start"} alignItems={"center"} width={"80%"}>
                    <Icon display={{base: "none", lg: "inline"}} as={IoPersonCircle} fontSize={"15em"} color={"#D9D9D9"}/>
                    <VStack>
                        <Box display={"flex"} justifyContent={"center"} color={"white"} alignItems={{base: "start", lg: "end"}} flexDir={{base: "column", lg: "row"}} w={"100%"} gap={"0.5em"}>
                            <Heading size={{base: "md", lg: "xl"}} fontWeight={"bold"} display={"inline"}>Bewaji Oysesanya</Heading>
                            <Text fontSize={{base: "1em", lg: "1.75em"}}>- Curator</Text>
                        </Box>
                        <Text color={"white"}>
                        Bewaji is a recent Part 1 Architect and recipient of RIBA student Award. Her strong commitment to change has led her to work with organisations such as the Hamelin trust, UN, Museum of Architecture, to name a few. She also has strong experience as a UX/UI designer.
                        </Text>
                    </VStack>
                </Box>
                
            </Box>
            

            <Box display={"flex"} gap={"1em"} flexDir={"row-reverse"} justifyContent={"center"} alignItems={"center"} width={"100%"} padding={"1em 0em"} borderRadius={"0em"}>
                <Box display={"flex"} flexDir={"row-reverse"} justifyContent={"start"} alignItems={"center"} width={"80%"}>
                    <Icon display={{base: "none", lg: "inline"}} as={IoPersonCircle} fontSize={"15em"} color={"#D9D9D9"}/>
                    <VStack>
                        <Box display={"flex"} justifyContent={"center"} color={"black"} alignItems={{base: "start", lg: "end"}} flexDir={{base: "column", lg: "row"}} w={"100%"} gap={"0.5em"}>
                            <Heading size={{base: "md", lg: "xl"}} fontWeight={"bold"} display={"inline"}>Israel Taiwo</Heading>
                            <Text fontSize={{base: "1em", lg: "1.75em"}}>- Marketing Lead</Text>
                        </Box>
                        <Text color={"black"}>
                        Israel is the founder of IYSEIS, a marketing firm that focuses on creating organic marketing strategies that fosters a connection with the intended audience. His background in IT and Business alongside his experience as a designer helps him develop non linear solutions.
                        </Text>
                    </VStack>
                </Box>
            </Box>

            <Box display={"flex"} bg={"#333333"} gap={"1em"} flexDir={"row"} justifyContent={"center"} alignItems={"center"} width={"100%"} padding={"1em 0em"} borderRadius={"0em"}>
                <Box display={"flex"} flexDir={"row"} justifyContent={"start"} alignItems={"center"} width={"80%"}>
                    <Icon display={{base: "none", lg: "inline"}} as={IoPersonCircle} fontSize={"15em"} color={"#D9D9D9"}/>
                    <VStack>
                        <Box display={"flex"} justifyContent={"center"} color={"white"} alignItems={{base: "start", lg: "end"}} flexDir={{base: "column", lg: "row"}} w={"100%"} gap={"0.5em"}>
                            <Heading size={{base: "md", lg: "xl"}} fontWeight={"bold"} display={"inline"}>Paul Yakubu</Heading>
                            <Text fontSize={{base: "1em", lg: "1.75em"}}>- Curator</Text>
                        </Box>
                        <Text color={"white"}>
                        Architect and Researcher with a Master’s Degree in “Architecture and Urbanism” from the Architectural Association, London. Interested in housing, culture, semiotics, social boundaries of space
                        </Text>
                    </VStack>
                </Box>
                
            </Box>
            

            
        </Box>
    </Box>
  )
}

export default MeetTheTeam