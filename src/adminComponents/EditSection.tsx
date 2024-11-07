import { Box, Button, ButtonGroup, FormLabel, HStack, Image, Input, Popover, PopoverCloseButton, PopoverContent, PopoverTrigger, Text, useToast, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { FirebaseSectionContent } from '../data/Projects'

interface Props {
  setSectionList: React.Dispatch<React.SetStateAction<FirebaseSectionContent[]>>
  sectionList: FirebaseSectionContent[]
  section: FirebaseSectionContent
  index: number
}

const EditSection = ({index, setSectionList, sectionList, section}: Props) => {

  const toast = useToast()

  const imgRef1 = useRef<HTMLInputElement>(null)
  const imgRef2 = useRef<HTMLInputElement>(null)

  const [textContent, setTextContent] = useState<string>(section.textContent ?? "")
  const [imgFile1, setImgFile1] = useState<File | undefined>(section.img1)
  const [imgFile2, setImgFile2] = useState<File | undefined>(section.img2)

  const handleUpdate = () => {
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
    const image1 = !imgRef1?.current?.files?.[0] && imgRef2?.current?.files?.[0] ? imgRef2?.current?.files?.[0] : imgRef1?.current?.files?.[0]
    const image2 = !imgRef1?.current?.files?.[0] && imgRef2?.current?.files?.[0] ? imgRef1?.current?.files?.[0] : imgRef2?.current?.files?.[0]
    copiedSections[index] = {
      img1: image1,
      img2: image2,
      textContent: textContent
    }
    setSectionList(copiedSections)
    toast({
      title: "Section Updated",
      status: "success",
      isClosable: true,
      duration: 3000,
      position: "top"
    })
  }

  const deleteSection = () => {
    const newSectionList = sectionList.filter((_, i) => i !== index)
    setSectionList(newSectionList)
  }

  return (
    <VStack borderY={"2px solid black"} py={2}>
      <ButtonGroup>
        <Button onClick={handleUpdate} bg={"yellow.400"} color={"white"}>Update Section</Button>
        <Popover>
          <PopoverTrigger >
            <Button bg={"red.500"} color={"white"}>Delete Section</Button>
          </PopoverTrigger>
          <PopoverContent>
            <VStack mb={1}>
              <Text>Are You Sure?</Text>
              <ButtonGroup>
                <Button onClick={deleteSection}>Yes</Button>
                <PopoverCloseButton fontSize={"md"}>X</PopoverCloseButton>
              </ButtonGroup>
            </VStack>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
      
      <HStack w={"100%"} divider={<Box border={"1px solid black"} h={"7em"}/>}>
        <VStack w={"48%"}>
          <FormLabel m={"0px"} color={"#2c2c2c"} letterSpacing={"3px"} htmlFor="message">Text Content</FormLabel>
          <Input as={"textarea"} value={textContent} onChange={(e) => {setTextContent(e.target.value)}} h={"10em"} name="Role" id="Role" type={"text"} placeholder="Text Content of Section" border={"0px"} outline={"none"} padding={"0px"} m={"0px"} _focus={{boxShadow: "0px 0px 0px black"}}/>
        </VStack>
        <HStack w={"48%"}>
          <Box display={"flex"} w={"50%"} flexDirection={"column"}>
            {imgFile1 && <Image mx={"auto"} aspectRatio={"1/1"} objectFit={"contain"} src={URL.createObjectURL(imgFile1)}/>}
            <Input type="file" ref={imgRef1} onChange={() => {setImgFile1(imgRef1?.current?.files?.[0])}}/>
            <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} color={"white"}>
              SECTION IMAGE 1 (Optional)
            </Box>
          </Box>
          <Box display={"flex"} w={"50%"} flexDirection={"column"}>
            {imgFile2 && <Image mx={"auto"} aspectRatio={"1/1"} objectFit={"contain"} src={URL.createObjectURL(imgFile2)}/>}
            <Input type="file" ref={imgRef2} onChange={() => {setImgFile2(imgRef2?.current?.files?.[0])}}/>
            <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} color={"white"}>
              SECTION IMAGE 2 (Optional)
            </Box>
          </Box>
        </HStack>
      </HStack>
    </VStack>
    
  )
}

export default EditSection