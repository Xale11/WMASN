import { Box, Heading, Stack, Icon, Text, Flex, Image, Link } from '@chakra-ui/react'
import { IoPersonCircle } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { TeamMember } from '../data/Team';

interface Props {
    member: TeamMember;
    flip: boolean;
}

const TeamCard = ({member, flip}: Props) => {

  return (
    <Stack direction={"column"} align={"center"} spacing={"1em"} w={"100%"} marginTop={"1em"}>
        <Stack direction={{base: "column", lg: flip ? "row-reverse" : "row"}} w={{base: "100%", lg: "50%"}} justify={"space-between"}>
            <Flex w={{base: "100%", lg: "48%"}} alignItems={"center"} justifyContent={{base: "center", lg: flip ? "start" : "end"}} gap={"1em"} flexDir={{base: "column", lg: flip ? "row-reverse" : "row"}}>
                <Stack direction={{base: "row", lg: "column"}}>
                    {member?.contact?.linkedin.show && <Link display={"flex"} href={member?.contact?.linkedin.link}>
                        <Icon fontSize={{base: "1.5em", lg: "1em"}} as={FaLinkedin} color={"#2c2c2c"} cursor={"pointer"} transition={"all 300ms ease-in-out"} _hover={{color: "#2F3F89"}}/>
                    </Link>}
                    {member?.contact?.instagram.show && <Link display={"flex"} href={member?.contact?.instagram.link}>
                        <Icon fontSize={{base: "1.5em", lg: "1em"}} as={AiFillInstagram} color={"#2c2c2c"} cursor={"pointer"} transition={"all 300ms ease-in-out"} _hover={{color: "#2F3F89"}}/>
                    </Link> }
                    {member?.contact?.x.show && <Link display={"flex"} href={member?.contact?.x.link}>
                        <Icon fontSize={{base: "1.5em", lg: "1em"}} as={FaXTwitter} color={"#2c2c2c"} cursor={"pointer"} transition={"all 300ms ease-in-out"} _hover={{color: "#2F3F89"}}/>
                    </Link>}
                </Stack>
                {member?.photo === undefined && <Icon as={IoPersonCircle} fontSize={"12em"} color={"#2c2c2c"}/>}
                {member?.photo !== undefined && <Image src={member?.photo} objectFit={"cover"} width={{base: "65%", sm: "30%", lg: "50%"}} aspectRatio={"1/1"} borderRadius={"50%"} />}
            </Flex>
            <Stack direction={"column"} w={{base: "100%", lg: "48%"}} align={{base: "center", lg: flip ? "end" : "start"}}>
                <Heading w={{base: "95%", lg: "auto"}} textAlign={{base: "center", lg: "left"}} size={"lg"} fontFamily={"Roboto"} letterSpacing={"1px"}>{member?.name}</Heading>
                <Text w={{base: "95%", lg: "auto"}} textAlign={{base: "center", lg: "left"}} fontFamily={"Roboto-Light"} fontSize={"1.25em"}>{member?.role}</Text>
                <Text w={{base: "90%", lg: "auto"}} fontFamily={"Roboto"} fontSize={{base: "0.7em", md: "0.8em", lg: "0.7em"}} textAlign={{base: "center", lg: flip ? "end" : "start"}}>{member?.description}.</Text>
            </Stack>
        </Stack>
        <Box width={"50%"} h={"0.5px"} bg={"#2c2c2c"}></Box>
    </Stack>
  )
}

export default TeamCard