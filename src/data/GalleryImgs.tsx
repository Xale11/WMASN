import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
// import Gallery1 from "../assets/Gallery1.jpg"
// import Gallery2 from "../assets/Gallery2.jpg"
// import Gallery3 from "../assets/Gallery3.jpg"
import { db, storage } from "../firebase/firebase"
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"

export interface GalleryImage {
    id?: string
    src: string,
    description: string,
    by: string,
    date?: string,
    filename?: string
    path?: string
}

export interface FirebaseGalleryImage {
    id?: string,
    src: FileList | undefined | null,
    description: string,
    by: string,
    date?: string
    filename?: string
    path?: string
}

export const getImages = async () => {
    const res: GalleryImage[] | "error" = [];
    try {
        const q = query(collection(db, "gallery"), orderBy("date", "desc"));
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


export const splitImages = (imgs: GalleryImage[]) => {
    let firstArr = true
    const arr1: GalleryImage[] = []
    const arr2: GalleryImage[] = []
    imgs.forEach((img) => {
        if (firstArr){
            arr1.push(img)
        }
        else {
            arr2.push(img)
        }
        firstArr = !firstArr
    })
    return [arr1, arr2]
}

export const addGalleryImage = async (img: FirebaseGalleryImage) => {
    try {
        const colRef = collection(db, "gallery")
        if (img.src){
            for (let i = 0; i < img.src?.length; i++) {
                const imgRef = ref(storage, `gallery/${img?.src[i].name}`)
                const res = await uploadBytes(imgRef, img?.src[i] as File)
                const src = await getDownloadURL(res.ref)
                await addDoc(colRef, {
                    src: src,
                    description: img.description,
                    by: img?.by,
                    date: serverTimestamp(),
                    path: `gallery/${img?.src[i].name}`
                })
            }
        }

    } catch (error) {
      console.error(error)
      return "error"
    }
    return "success"
  }

  export const editGalleryImage = async (img: FirebaseGalleryImage) => {
    const updateRef = doc(db, "gallery", `${img.id}`)
    try {
        if (img.src && img?.src.length > 0){
            const url = await replaceGalleryImg(img.path as string, img?.src[0])
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

  const replaceGalleryImg = async (path: string, file: File) => {
    await deleteObject(ref(storage, path))
    const imgRef = ref(storage, `gallery/${file.name}`)
    const res = await uploadBytes(imgRef, file)
    const url = await getDownloadURL(res.ref)
    return url
  }

  export const removeGalleryImg = async (img: GalleryImage) => {
    console.log(img)
    try {
        await deleteDoc(doc(db, "gallery", `${img.id}`));
        await deleteObject(ref(storage, img.path))
    } catch (error) {
      console.error(error)
      return "error"
    }
    return "success"
  }