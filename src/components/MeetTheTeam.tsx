import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { TeamMember } from '../data/Team';
import profileImg from "../assets/profile.jpg"

interface Props {
    theTeam: TeamMember[]
}

const MeetTheTeam = ({theTeam}: Props) => {

    const gotToSocials = (member: TeamMember) => {
        if (member.contact.instagram.link){
            window.open(member.contact.instagram.link)
        }
        else if (member.contact.linkedin.link){
            window.open(member.contact.linkedin.link)
        }
        else if (member.contact.x.link){
            window.open(member.contact.x.link)
        }
    }

    return (
        <HStack width={"100%"} justify={"center"} align={"start"} gap={10} color={"#2F3F89"}>
            <Image maxW={"40%"} maxH={"80vh"} src={profileImg}/>
            <VStack align={"start"} maxW={"45%"}>
                <Heading size={"md"} fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"}>Moyo Adebayo - Director</Heading>
                <Text>Moyo is a designer, architecture graduate, and researcher interested in designing culturally responsive spaces for Nigerians and Africans at large. He aims to “inject Africa into the architectural canon” by sparking interest in vernacular architecture within communities through critical designs and collaborative practices.</Text>
                <Heading size={"md"} mt={"1em"} fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"}>Past and present and collaborators include:</Heading>
                <VStack gap={0} align={"start"}>
                    {theTeam.map((member) => {
                        return <Text onClick={() => gotToSocials(member)} cursor={"pointer"} _hover={{textDecor: "underline"}}>{member.name}</Text>
                    })}
                </VStack>
                
            </VStack>
        </HStack>
      )
    
}

export default MeetTheTeam