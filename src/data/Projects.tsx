import { addDoc, arrayRemove, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase/firebase"
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { v4 as uuid } from 'uuid';

export interface Project {
  id?: string
  name: string
  description: string
  img: string | undefined
  imgPath: string
  textContent?: string
  sections?: SectionContent[]
}

export interface SectionContent {
  textContent?: string
  img1?: string
  img2?: string
  imgPath1?: string
  imgPath2?: string
  imgFile1?: File | undefined
  imgFile2?: File | undefined
}

export interface FirebaseSectionContent {
  textContent?: string
  img1?: File | undefined
  img2?: File | undefined
}

export interface FirebaseProject {
  name: string
  description: string
  img: File | undefined
  textContent?: string
  sections?: FirebaseSectionContent[]
}

export const getProjects = async () => {
  const res: Project[] = []
  let isError = false
  try {
    const q = query(collection(db, "projects"));
    const data = await getDocs(q);
    for (const doc of data.docs) {
      const project = doc.data();
      res.push({
          id: doc.id,
          name: project.name,
          description: project.description,
          img: project.img,
          imgPath: project.imgPath,
          sections: project.sections
      })
    }
    } catch (error) {
      console.error(error);
      isError = true;
    }
  
    if (isError) {
      return "error";
    }
    return res;
  }

export const addNewProject = async (project: FirebaseProject) => {
  const colRef = collection(db, "projects")
  try {
    const mainImgPath = project.img ? `projects/${project.img.name}/${uuid}` : ""
    const mainImg = project.img ? await getImageUrl(project.img, mainImgPath) : ""
    const formattedSections = project?.sections ? await getFormattedSections(project.sections) : []
    await addDoc(colRef, {
      name: project.name,
      description: project.description,
      img: mainImg,
      imgPath: mainImg,
      sections: formattedSections
    })
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}

// export const addNewProject1 = async (project: Project, file: File | undefined, index: number) => {
//   const updateRef = doc(db, "projects", `allProjects`)
//   try {
//       await updateDoc(updateRef, {
//       projectArray: arrayUnion({
//         description: project.description,
//         name: project.name,
//         textContent: project.textContent
//       })
//       })

//       if (file !== undefined){
//           const imgRef = ref(storage, `projects/${index}/${file.name}`)
//           await uploadBytes(imgRef, file)
//       }
      
//   } catch (error) {
//       console.error(error)
//       return "error"
//   }
//   return "success"
// }

export const editProject = async (project: Project, file: File | undefined) => {
  const updateRef = doc(db, "projects", `${project.id}`)

  try {
    let newImage: {path: string, src: string} | undefined;
    const formattedSections = await getEditedSections(project.sections ?? [])

    if (file !== undefined){
      const imgPath = `${project.imgPath}`
      newImage = await replaceProjectImg(imgPath, file)
    }

    await updateDoc(updateRef, {
      name: project.name,
      description: project.description,
      img: newImage?.src ?? project.img,
      imgPath: newImage?.path ?? project.imgPath,
      sections: formattedSections
    })
      
  } catch (error) {
      console.error(error)
      return "error"
  }
  return "success"
}

const replaceProjectImg = async (path: string, file: File) => {
  const data = await listAll(ref(storage, path))
  for (const itemRef of data.items) {
    await deleteObject(itemRef);
  }
  const newPath = `projects/${file.name}/${uuid}`
  const imgRef = ref(storage, newPath)
  const res = await uploadBytes(imgRef, file)
  const src = await getDownloadURL(res.ref)
  return {
    path: newPath,
    src: src
  }
}

export const deleteProject = async (project: Project) => {
  const deleteRef = doc(db, "projects", `${project.id}`)
  try {
    await deleteDoc(deleteRef);
    await removeProjectImg(project.imgPath)
    console.log(11)
    for (const section of project.sections ?? []){
      if (section.imgPath1) await removeProjectImg(section.imgPath1)
      if (section.imgPath2) await removeProjectImg(section.imgPath2)
    }
  } catch (error) {
      console.error(error)
      return "error"
  }
  return "success"
}

const getFormattedSections = async (sections: FirebaseSectionContent[]) => {
  const formattedSections: SectionContent[] = []
  for (const section of sections){
    const imagePath1 = `projects/sections/${uuid()}`
    const imagePath2 = `projects/sections/${uuid()}`
    let image1 = ""
    let image2 = ""
    if (!section.img1 && section.img2){
      image1 = await getImageUrl(section.img2, imagePath1)
    }
    else if (section.img1 && !section.img2){
      image1 = await getImageUrl(section.img1, imagePath1)
    }
    else if (section.img1 && section.img2) {
      image1 = await getImageUrl(section.img1, imagePath1)
      image2 = await getImageUrl(section.img2, imagePath2)
    }
    formattedSections.push({
      textContent: `${section.textContent}`,
      img1: image1,
      img2: image2,
      imgPath1: image1 ? imagePath1 : "",
      imgPath2: image2 ? imagePath2 : ""  
    })
  }
  
  return formattedSections
}

const getEditedSections = async (sections: SectionContent[]) => {
  const formattedSections: SectionContent[] = []
  for (const section of sections){
    let imagePath1 = `projects/sections/${uuid()}`
    const imagePath2 = `projects/sections/${uuid()}`
    let imageSrc1: string | undefined
    let imageSrc2: string | undefined
    if (section.imgFile1) imageSrc1 = await getImageUrl(section.imgFile1, imagePath1)
    if (section.imgFile2) imageSrc2 = await getImageUrl(section.imgFile2, imagePath2)
    
    if (!imageSrc1 && imageSrc2 && !section.img1){
      imageSrc1 = imageSrc2
      imagePath1 = imagePath2
      imageSrc2 = undefined
    }
    formattedSections.push({
      textContent: section.textContent,
      img1: imageSrc1 ?? section.img1,
      img2: imageSrc2 ?? section.img2,
      imgPath1: imageSrc1 ? imagePath1 : section.imgPath1,
      imgPath2: imageSrc2 ? imagePath2 : section.imgPath2,
    })
  }
  return formattedSections
}

const getImageUrl = async (image: File, path: string) => {
  const imageRef = ref(storage, `${path}`)
  const res = await uploadBytes(imageRef, image)
  const src = await getDownloadURL(res.ref)
  return src
}

export const removeProjectImg = async (path: string) => {
  try {
    const data = await listAll(ref(storage, path))
    for (const itemRef of data.items) {
      await deleteObject(itemRef);
    }
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}
