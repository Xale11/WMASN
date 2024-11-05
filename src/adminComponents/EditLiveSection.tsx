import { Box, Button, ButtonGroup, FormLabel, HStack, Image, Input, Popover, PopoverCloseButton, PopoverContent, PopoverTrigger, Text, useToast, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { SectionContent } from '../data/Projects'

interface Props {
  setSectionList: React.Dispatch<React.SetStateAction<SectionContent[]>>
  sectionList: SectionContent[]
  section: SectionContent
  index: number
}

const EditLiveSection = ({index, setSectionList, sectionList, section}: Props) => {

  const toast = useToast()

  const imgRef1 = useRef<HTMLInputElement>(null)
  const imgRef2 = useRef<HTMLInputElement>(null)

  const [textContent, setTextContent] = useState<string>(section.textContent ?? "")
  const [imgSrc1, setImgSrc1] = useState<string | undefined>(section.img1)
  const [imgSrc2, setImgSrc2] = useState<string | undefined>(section.img2)
  const [imgFile1, setImgFile1] = useState<File | undefined>()
  const [imgFile2, setImgFile2] = useState<File | undefined>()

  const handleUpdate = () => {
    if (!textContent && (!imgFile1 && !imgSrc1) && (!imgFile2 && !imgSrc2)){
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
    const image1 = !imgFile1 && imgFile2 ? imgFile2 : imgFile1
    const image2 = !imgFile1 && imgFile2 ? imgFile1 : imgFile2
    copiedSections[index] = {
      ...copiedSections[index],
      img1: imgSrc1,
      img2: imgSrc2,
      imgFile1: image1,
      imgFile2: image2,
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

  const clearImg1 = () => {
    if (imgRef1.current) {
      imgRef1.current.value = ''; // Clear the file input by setting its value to an empty string
    }
  }

  const clearImg2 = () => {
    if (imgRef2.current) {
      imgRef2.current.value = ''; // Clear the file input by setting its value to an empty string
    }
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
            {imgFile1 ? <Image mx={"auto"} aspectRatio={"1/1"} objectFit={"contain"} src={URL.createObjectURL(imgFile1)}/> : <Image mx={"auto"} aspectRatio={"1/1"} objectFit={"contain"} src={imgSrc1}/>}
            <Input type="file" ref={imgRef1} onChange={() => {setImgFile1(imgFile1)}}/>
            <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
              SECTION IMAGE 1 (Optional)
            </Box>
            <Box onClick={() => {setImgFile1(undefined); setImgSrc1(section.img1)}} display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} _hover={{textDecor: "underline"}} bg={"yellow.500"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
              Original Image
            </Box>
            <Box onClick={() => {setImgSrc1(""); clearImg1()}} display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} _hover={{textDecor: "underline"}} bg={"red.500"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
              Remove Image
            </Box>
          </Box>
          <Box display={"flex"} w={"50%"} flexDirection={"column"}>
            {imgFile2 ? <Image mx={"auto"} aspectRatio={"1/1"} objectFit={"contain"} src={URL.createObjectURL(imgFile2)}/> : <Image mx={"auto"} aspectRatio={"1/1"} objectFit={"contain"} src={imgSrc2}/>}
            <Input type="file" ref={imgRef2} onChange={() => {setImgFile2(imgFile2)}}/>
            <Box display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} bg={"#2c2c2c"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
              SECTION IMAGE 2 (Optional)
            </Box>
            <Box onClick={() => {setImgFile2(undefined); setImgSrc2(section.img2)}} display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} _hover={{textDecor: "underline"}} bg={"yellow.500"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
              Original Image
            </Box>
            <Box onClick={() => {setImgSrc2(""); clearImg2()}} display={"flex"} cursor={"pointer"} justifyContent={"center"} alignItems={"center"} _hover={{textDecor: "underline"}} bg={"red.500"} h={"100%"} w={"100%"} textAlign={"center"} fontFamily={"Roboto-Light"} color={"white"}>
              Remove Image
            </Box>
          </Box>
        </HStack>
      </HStack>
    </VStack>
    
  )
}

export default EditLiveSection