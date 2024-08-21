import { Box, Heading } from '@chakra-ui/react'
import { TeamMember } from '../data/Team';
import TeamCard from './TeamCard';

interface Props {
    theTeam: TeamMember[]
}

const MeetTheTeam = ({theTeam}: Props) => {

    return (
        <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} marginBottom={"3em"} fontFamily={"Roboto"}>
            <Box width={"100%"} display={"flex"}  flexDirection={"column"} justifyContent={"start"} alignItems={"center"} >
                <Heading color={"#2c2c2c"} margin={"0.5em 0em"} fontFamily={"Roboto"} letterSpacing={"5px"}>MEET THE TEAM</Heading>

                <Box width={"50%"} h={"1px"} bg={"#2c2c2c"}></Box>

                {theTeam.map((member: TeamMember, i: number) => {
                    return (<TeamCard member={member} flip={i % 2 === 0 ? false : true}/>)
                })}
                
            </Box>
        </Box>
      )
    
}

export default MeetTheTeam