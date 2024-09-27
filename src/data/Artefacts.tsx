import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { FirebaseGalleryImage, GalleryImage } from "./GalleryImgs";
import { db, storage } from "../firebase/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getArtefactImages = async (src: "commissioned" | "submitted") => {
  const dbName = src === "commissioned" ? "commissionedArtefacts" : "submittedArtefacts"
  const res: GalleryImage[] | "error" = [];
  try {
      const q = query(collection(db, dbName), orderBy("date", "desc"));
      const data = await getDocs(q);
      for (const doc of data.docs) {
          const img = doc.data();
          res.push({
              id: doc.id,
              src: img.src,
              description: img.description,
              by: img.by,
              date: img.date,
              path: img.path
          })
      }
  } catch (error) {
      console.error(error)
      return "error"
  }
  return res
}

export const addArtefactImage = async (src: "commissioned" | "submitted", img: FirebaseGalleryImage) => {
  try {
    const dbName = src === "commissioned" ? "commissionedArtefacts" : "submittedArtefacts"
      const colRef = collection(db, dbName)
      if (img.src){
          for (let i = 0; i < img.src?.length; i++) {
              const imgRef = ref(storage, `${dbName}/${img?.src[i].name}`)
              const res = await uploadBytes(imgRef, img?.src[i] as File)
              const src = await getDownloadURL(res.ref)
              await addDoc(colRef, {
                  src: src,
                  description: img.description,
                  by: img?.by,
                  date: serverTimestamp(),
                  path: `${dbName}/${img?.src[i].name}`
              })
          }
      }

  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}

export const editArtefactImage = async (src: "commissioned" | "submitted", img: FirebaseGalleryImage) => {
  const dbName = src === "commissioned" ? "commissionedArtefacts" : "submittedArtefacts"
  const updateRef = doc(db, dbName, `${img.id}`)
  try {
      if (img.src && img?.src.length > 0){
          const url = await replaceArtefactImg(src, img.path as string, img?.src[0])
          await updateDoc(updateRef, {
              src: url,
              description: img.description,
              by: img?.by,
          })
      } else {
          await updateDoc(updateRef, {
              description: img.description,
              by: img?.by,
          })
      }
      
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}

const replaceArtefactImg = async (src: "commissioned" | "submitted", path: string, file: File) => {
  const dbName = src === "commissioned" ? "commissionedArtefacts" : "submittedArtefacts"
  await deleteObject(ref(storage, path))
  const imgRef = ref(storage, `${dbName}/${file.name}`)
  const res = await uploadBytes(imgRef, file)
  const url = await getDownloadURL(res.ref)
  return url
}

export const removeArtefactImg = async (src: "commissioned" | "submitted", img: GalleryImage) => {
  const dbName = src === "commissioned" ? "commissionedArtefacts" : "submittedArtefacts"
  try {
      await deleteDoc(doc(db, dbName, `${img.id}`));
      await deleteObject(ref(storage, img.path))
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}