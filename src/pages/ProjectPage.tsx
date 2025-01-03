import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { Project } from "../data/Projects";
import { Helmet } from "react-helmet";
import ProjectSection from "../components/ProjectSection";

interface Props {
  project: Project
}

const ProjectPage = ({project}: Props) => {

    // const exhibitionText = "The ‘What makes a space Nigerian?’ (W.M.A.S.N) exhibition series is centred around that very question. As curators we are asking ourselves this question, interrogating the key components of the Nigerian cultures and histories that define the spaces we inhabit, more specifically in this edition of the exhibition, our homes. Over time the identity of Nigerians as expressed in the homes we design and live in, has been drastically impacted by numerous factors such as the Colonial era, arguably in a counterintuitive manner. As humans we react and adapt to the spaces we inhabit in a positive or negative manner, and as Nigerians, a people whose vernacular architectural evolution was hindered, our adaptation was to the standardised, top down house typology that didn’t fully take into account the requirements and lifestyles of the different tribes. Thus hindering the celebration, development and acceptance of Nigerian architecture within its own community.\n\nEvidence shows that the change in house typologies effected Nigerian family dynamics (and ultimately the Nigerian society) in terms of how we interact with one another. Ultimately galvanising a trend towards more individualistic mindsets, that can be seen as the discarding of traditional values. This conclusion was drawn based upon research around families and individuals living within Nigeria, for Nigerians in the UK living in house typologies not designed with our cultures in mind, how much more would that affect us? This first edition of the exhibition will focus on the British Nigerian diasporic home as a starting point for unearthing the complexities of the Nigerian home. The foundation of the research is documenting 10 Nigerian families living in the UK, documenting their lifestyle, nuances and expression within their homes. The premise of W.M.A.S.N is that we take an empty space empowered by the question of what makes a space Nigerian, and interrogate the components that make architectural spaces have a Nigerian essence to them. Another key component of this design device is the strong participatory role of the public, as members of the Nigerian community entrust us with ‘artefacts’ that are used to populate the space we create.\n\nArtefacts are items that represent or are symbolic of Nigerian culture. Such as the traditional broomstick, family photos or even Nigerian party favours dotted around the house that can be seen as key identifiers whether or not the owner of that house is Nigerian. Using the artefacts from the public to furnish the house is of the utmost importance to the success and authenticity of the exhibition. It means that the space was defined by more than the curators’ vision and reinforces many communal narratives embedded within many Nigerian cultures.\n\nIn order to construct a concise narrative, the spatial design will be reflective of largely the histories and cultures of two main tribes living in the UK, the Yoruba and Igbo. However, the furniture items (artefacts) will be from any Nigerian who is willing to lend us their belongings. After all, two of the commissioned artefacts by designers are from members of the Urhobo people. Whilst the artefacts from the public are integral to the exhibition's authenticity, I believe getting artists and designers to create an artefact that captures the Nigerian experience can perhaps more intentionally provoke feelings of nostalgia. This is why there will be paintings from Wipbee, an artist/architect currently based in Manchester and Slawn, a Nigerian Artist based in London who has worked with the likes of Virgil Abloh, Skepta and is the youngest designer of the Brit award. There will also be fashion garments designed by Adidas Womenswear designer Rhoda Edoyibo that will be paired with beads designed by RCA student Rume Egbeniyoko. A symbolic furniture piece from Myles Igwebuke along with pieces from several others will also be featured in the exhibition.\n\nTo dive further into Nigerian culture, we have made a film that explores the dynamics of two Nigerian families within their homes, looking at the physical and social nuances depicted within their homes, along with how the homes change over time.\n\nOur design approach considers the five senses as a device to help materialise the feeling of nostalgia. From Nigerian food being served on ground as “there is always rice at home” to sounds of childhood memories explored through songs played within the space. Another device we will strongly consider when designing is time. The home design will be based on a Nigerian home within the UK that has references of traditional (pre colonial) vernacular typologies and contemporary Nigerian typologies. The fusion of these typologies creates room for speculation meaning we can treat this exhibition as a ‘speculative case study’ of what was, is and can be.\n\nThis exhibition aims to empower and inform a dialogue around designing culturally suitable spaces for the diaspora within the UK and by extension those within Nigeria. This is why we will have panel discussions with esteemed designers looking at the future of Nigerian design and creative practice as well as looking at the wider picture (African design), especially in regards to the built environment. It is a conversation starter, a prelude to a wave of even more culturally informed practice. The exhibition is not the main event but the people who are impacted by it and create because of it are. I trust that this will encourage an alternative way of thinking about design, but also remind many of us who we are and who we can become.";
  console.log(project.sections)
  return (
    <Box bg={"white"} w={"100vw"} position={"relative"} mb={"5em"} fontFamily={"swis721-ex-bt"} color={"#2F3F89"} overflowX={"hidden"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"2em"}>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WMASN | Nigerian Architecture, Artifacts & Spaces by Moyo Adebayo</title>
        <meta 
            name="description" 
            content="Key details of our exhibiton. What Makes a Space Nigerian (W.M.A.S.N) explores Nigerian architecture through speculative exhibitions." 
        />
        </Helmet>
        <Heading w={"90%"} size={"lg"} mt={"1em"} fontFamily={"swis721-ex-bt"} transform={"scaleY(1.25)"} color={"#2F3F89"} textAlign={"center"}>{project.name}</Heading>
        <Box maxW={{base: "50vw", lg: "30vw"}} minW={"20vw"} h={"fit-content"} >
          <Image src={project.img} alt="Image of Project Cover"/>
        </Box>
        <Text w={"80%"} h={"max-content"} my={10} transform={"scaleY(1.25)"} whiteSpace={"pre-wrap"}>{project.description}</Text>
        <VStack mt={3} spacing={10}>
          {project.sections?.map((section) => {
            return (<ProjectSection section={section}/>)
          })}
        </VStack>
    </Box>
  )
}

export default ProjectPage