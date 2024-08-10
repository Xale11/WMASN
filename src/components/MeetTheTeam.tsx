import { Box, Heading } from '@chakra-ui/react'
import { teamInfo, TeamMember } from '../data/Team';
import TeamCard from './TeamCard';

const MeetTheTeam = () => {

    return (
        <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} marginBottom={"3em"} fontFamily={"Roboto"}>
            <Box width={"100%"} display={"flex"}  flexDirection={"column"} justifyContent={"start"} alignItems={"center"} >
                <Heading color={"#2c2c2c"} margin={"0.5em 0em"} fontFamily={"Roboto"} letterSpacing={"5px"}>MEET THE TEAM</Heading>

                <Box width={"50%"} h={"1px"} bg={"#2c2c2c"}></Box>

                {teamInfo.map((member: TeamMember, i: number) => {
                    return (<TeamCard member={member} flip={i % 2 === 0 ? false : true}/>)
                })}
                
            </Box>
        </Box>
      )
    
}

export default MeetTheTeam