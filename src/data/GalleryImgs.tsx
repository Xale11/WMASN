import { deleteObject, FullMetadata, getDownloadURL, getMetadata, listAll, ref, updateMetadata, uploadBytes } from "firebase/storage"
// import Gallery1 from "../assets/Gallery1.jpg"
// import Gallery2 from "../assets/Gallery2.jpg"
// import Gallery3 from "../assets/Gallery3.jpg"
import { storage } from "../firebase/firebase"

export interface GalleryImage {
    src: string,
    description: string,
    by: string,
    date?: string,
    filename?: string
}

export interface FirebaseGalleryImage {
    src: File | undefined,
    description: string,
    by: string,
    date?: string
    filename?: string
}

// const galleryImgs = [
//     {
//         src: Gallery1,
//         description: "Home Edition Poster",
//         by: "Moyo Adebayo"
//     },
//     {
//         src: Gallery2,
//         description: "1940's Nigerian Home",
//         by: "Moyo Adebayo"
//     },
//     {
//         src: Gallery3,
//         description: "Diaspora Nigerian Home Space",
//         by: "Moyo Adebayo"
//     },
// ]

export const getImages = async () => {
    const arr1: GalleryImage[] = [];
    const photoRef1 = ref(storage, `gallery`);
    try {
        const res = await listAll(photoRef1)
        for (const item of res.items) {
            const meta = await fetchMetadata(item.name)
            const url = await getDownloadURL(item)
            if (meta !== "error" && meta.customMetadata !== undefined){
                arr1.push({
                    by: meta.customMetadata?.by,
                    description: meta.customMetadata?.description,
                    src: url,
                    date: meta.timeCreated,
                    filename: item.name
                })
            } else {
                throw Error
            }
        }
        // console.log(id, arr1, arr2);
    } catch (error) {
        console.error(error)
        return "error"
    }
    // const res1 = arr1.length === 0 ? undefined : await getDownloadURL(arr1[0]);
    console.log(arr1)
    return splitImages(arr1)
}

const fetchMetadata = async (name: string) => {
    let data: FullMetadata
    try {
        const imgRef = ref(storage, `gallery/${name}`);
        data = await getMetadata(imgRef)
    } catch (error) {
        console.error(error)
        return "error"
    }
    console.log(data)
    return data
}

const splitImages = (imgs: GalleryImage[]) => {
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
        const imgRef = ref(storage, `gallery/${img?.src?.name}`)
        await uploadBytes(imgRef, img?.src as File)
        await updateMetadata(imgRef, {
            customMetadata: {
                by: img.by,
                description: img.description
            }
        })
        
    } catch (error) {
      console.error(error)
      return "error"
    }
    return "success"
  }

  export const editGalleryImage = async (img: FirebaseGalleryImage) => {
    try {
        const imgRef = `gallery`
        if (img.src !== undefined){
            await replaceGalleryImg(imgRef, img?.src, img.filename as string)
            await updateMetadata(ref(storage, `gallery/${img?.src?.name}`), {
                customMetadata: {
                    by: img.by,
                    description: img.description
                }
            })
        } else {
            await updateMetadata(ref(storage, `gallery/${img.filename as string}`), {
                customMetadata: {
                    by: img.by,
                    description: img.description
                }
            })
        }
        
    } catch (error) {
      console.error(error)
      return "error"
    }
    return "success"
  }

  const replaceGalleryImg = async (path: string, file: File, oldFile: string) => {
    const data = await listAll(ref(storage, path))
    for (const itemRef of data.items) {
        if (itemRef.name === oldFile){
            await deleteObject(itemRef);
        }
    }
    const imgRef = ref(storage, `${path}/${file.name}`)
    await uploadBytes(imgRef, file)
  }

  export const removeGalleryImg = async (filename: string) => {
    try {
        const data = await listAll(ref(storage, "gallery"))
        for (const itemRef of data.items) {
            if (itemRef.name === filename){
                await deleteObject(itemRef);
            }
        }
    } catch (error) {
      console.error(error)
      return "error"
    }
    return "success"
  }