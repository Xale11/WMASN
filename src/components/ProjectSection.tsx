import { Image, Stack, Text, VStack } from '@chakra-ui/react'
import { SectionContent } from '../data/Projects'

interface Prop {
    section: SectionContent
}

const ProjectSection = ({section}: Prop) => {
	return (
		<VStack w={"80%"} align={"start"}>
			{section.img1 && section.img2 && section.textContent && (<VStack w={"100%"}>
				<Stack direction={{base: "column", lg: "row"}} w={"100%"} align={{base: "center", lg: "start"}} justify={"center"}>
					<Image objectFit={"cover"} h={"50vh"} w={"auto"} maxW={{base: "100%", lg: "49vw"}} src={section.img1}/>
					<Image objectFit={"cover"} h={"50vh"} w={"auto"} maxW={{base: "100%", lg: "49vw"}} src={section.img2}/>
				</Stack>
				<Text w={"100%"} h={"max-content"} transform={"scaleY(1.25)"} whiteSpace={"pre-wrap"}>{section.textContent}</Text>
			</VStack>)}
			{section.img1 && !section.img2 && section.textContent && (<Stack direction={{base: "column", lg: "row"}} w={"100%"} align={{base: "center", lg: "start"}}>
				<Text w={{base: "100%", lg: "48%"}} h={"max-content"} transform={"scaleY(1.25)"} whiteSpace={"pre-wrap"}>{section.textContent}</Text>
				<Image objectFit={"cover"} maxW={{base: "100%", lg: "48%"}} src={section.img1}/>
			</Stack>)}
			{!section.img1 && !section.img2 && section.textContent && <Text w={"100%"} h={"max-content"} transform={"scaleY(1.25)"} whiteSpace={"pre-wrap"}>{section.textContent}</Text>}
			{section.img1 && !section.img2 && !section.textContent && (<Stack direction={{base: "column", lg: "row"}} w={"100%"} justify={"center"} align={{base: "center", lg: "start"}}>
				<Image objectFit={"cover"} maxW={"70vw"} maxH={"80vh"} src={section.img1}/>
			</Stack>)}
			{section.img1 && section.img2 && !section.textContent && (<Stack direction={{base: "column", lg: "row"}} w={"100%"} align={{base: "center", lg: "start"}} justify={"center"}>
				<Image objectFit={"cover"} h={"50vh"} w={"auto"} maxW={{base: "100%", lg: "49vw"}} src={section.img1}/>
				<Image objectFit={"cover"} h={"50vh"} w={"auto"} maxW={{base: "100%", lg: "49vw"}} src={section.img2}/>
			</Stack>)}
			
			
		</VStack>
	)
  
}

export default ProjectSection
