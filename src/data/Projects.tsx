import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase/firebase"
import { deleteObject, getDownloadURL, listAll, ref, StorageReference, uploadBytes } from "firebase/storage"

export interface Project {
  name: string
  description: string
  img: string | undefined
  textContent: string
}

export interface FirebaseProject {
  name: string
  description: string
  img: File | undefined
  textContent: string
}

export const getProjects = async () => {
  let res: Project[] = []
  let i = 0
    let isError = false
    try {
      const q = query(collection(db, "projects"));
      const data = await getDocs(q);
      for (const doc of data.docs) {
        const data = doc.data();
        const projectArr: Project[] = []
        for (const member of data.projectArray){
          const imgRes = await getProjectImages(`${i}`)
          if (imgRes === "error"){
              isError = true
          } else {
              projectArr.push({
                name: member.name,
                description: member.description,
                img: imgRes,
                textContent: member.textContent,
              })
          }
          i++
        }
        res = projectArr
        // console.log("success");
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
  
  const getProjectImages = async (name: string) => {
    const arr1: StorageReference[] = [];
    const photoRef1 = ref(storage, `projects/${name}`);
    try {
        await listAll(photoRef1)
            .then((res) => {
                res.items.forEach(async (item: StorageReference) => {
                    arr1.push(item)
                })
            });
        // console.log(id, arr1, arr2);
    } catch (error) {
        console.error(error)
        return "error"
    }
    const res1 = arr1.length === 0 ? undefined : await getDownloadURL(arr1[0]);
    return res1
}

export const addNewProject = async (project: Project, file: File | undefined, index: number) => {
  const updateRef = doc(db, "projects", `allProjects`)
  try {
      await updateDoc(updateRef, {
      projectArray: arrayUnion({
        description: project.description,
        name: project.name,
        textContent: project.textContent
      })
      })

      if (file !== undefined){
          const imgRef = ref(storage, `projects/${index}/${file.name}`)
          await uploadBytes(imgRef, file)
      }
      
  } catch (error) {
      console.error(error)
      return "error"
  }
  return "success"
}

export const editProject = async (project: Project[], file: File | undefined, index: number) => {
  const updateRef = doc(db, "projects", `allProjects`)
  try {
      await updateDoc(updateRef, {
      projectArray: project.map((item) => {
        return ({
          name: item.name,
          textContent: item.textContent,
          description: item.description
        })
      })
      })

      if (file !== undefined){
          const imgRef = `projects/${index}`
          await replaceProjectImg(imgRef, file)
      }
      
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
  const imgRef = ref(storage, `${path}/${file.name}`)
  await uploadBytes(imgRef, file)
}

export const deleteProject = async (project: Project, index: number) => {
  const updateRef = doc(db, "projects", `allProjects`)
  try {
      await updateDoc(updateRef, {
      projectArray: arrayRemove({
        description: project.description,
        name: project.name,
        textContent: project.textContent
      })
      })

      const data = await listAll(ref(storage, `projects/${index}`))
      for (const itemRef of data.items) {
        await deleteObject(itemRef);
      }
      
  } catch (error) {
      console.error(error)
      return "error"
  }
  return "success"
}