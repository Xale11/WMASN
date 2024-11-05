import { Box, Button, ButtonGroup, FormLabel, Heading, HStack, Image, Input, useToast, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { FirebaseSectionContent } from '../data/Projects'

interface Props {
  setShowAddSection: React.Dispatch<React.SetStateAction<boolean>>
  setSectionList: React.Dispatch<React.SetStateAction<FirebaseSectionContent[]>>
  sectionList: FirebaseSectionContent[]
}

const AddSection = ({setShowAddSection, setSectionList, sectionList}: Props) => {

  const toast = useToast()

  const imgRef1 = useRef<HTMLInputElement>(null)
  const imgRef2 = useRef<HTMLInputElement>(null)

  const [textContent, setTextContent] = useState<string>("")
  const [imgFile1, setImgFile1] = useState<File | undefined>()
  const [imgFile2, setImgFile2] = useState<File | undefined>()

  const handleSave = () => {
    if (!textContent && !imgRef1?.current?.files?.[0] && !imgRef2?.current?.files?.[0]){
      toast({
        title: "No Content Added!",
        status: "error",
        description: "Content needs to be added to section if you want to save the section",
        isClosable: true,
        duration: 3000,
        position: "top"
      })
      return
    }

    const copiedSections = [...sectionList]
    const image1 = imgRef1?.current?.files?.[0]
    console.log(image1)
    const image2 = imgRef2?.current?.files?.[0]
    copiedSections.push({
      img1: image1,
      img2: image2,
      textContent: textContent
    })
    setSectionList(copiedSections)
    setShowAddSection(false)
  }

  return (
    <VStack>
      <Heading size={"md"} mt={1}>Section</Heading>
      <ButtonGroup>
        <Button onClick={handleSave} bg={"green.400"} color={"white"}>Save Section</Button>
        <Button onClick={() => {setShowAddSection(false)}} bg={"#2c2c2c"} color={"white"}>Close Section</Button>
      </ButtonGroup>
      
      <HStack w={"100%"} divider={<Box border={"1px solid black"} h={"7em"}/>}>
        <VStack w={"48%"}>
          <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Text Content</FormLabel>
          <Input as={"textarea"} value={textContent} onChange={(e) => {setTextContent(e.target.value)}} h={"10em"} name="Role" id="Role" type={"text"} placeholder="Text Content of Section" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}}/>
        </VStack>
        <HStack w={"48%"}>
          <Box display={"flex"} w={"50%"} flexDirection={"column"}>
            {imgFile1 && <Image mx={"auto"} src={URL.createObjectURL(imgFile1)}/>}
            <Input type="file" ref={imgRef1} onChange={() => {setImgFile1(imgRef1?.current?.files?.[0])}}/>
            <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
              SECTION IMAGE 1 (Optional)
            </Box>
          </Box>
          <Box display={"flex"} w={"50%"} flexDirection={"column"}>
            {imgFile2 && <Image mx={"auto"} src={URL.createObjectURL(imgFile2)}/>}
            <Input type="file" ref={imgRef2} onChange={() => {setImgFile2(imgRef2?.current?.files?.[0])}}/>
            <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
              SECTION IMAGE 2 (Optional)
            </Box>
          </Box>
        </HStack>
      </HStack>
    </VStack>
    
  )
}

export default AddSection