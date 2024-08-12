import Gallery1 from "../assets/Gallery1.jpg"
import Gallery2 from "../assets/Gallery2.jpg"
import Gallery3 from "../assets/Gallery3.jpg"

export interface GalleryImage {
    src: string,
    description: string,
    by: string,
}

const galleryImgs = [
    {
        src: Gallery1,
        description: "Home Edition Poster",
        by: "Moyo Adebayo"
    },
    {
        src: Gallery2,
        description: "1940's Nigerian Home",
        by: "Moyo Adebayo"
    },
    {
        src: Gallery3,
        description: "Diaspora Nigerian Home Space",
        by: "Moyo Adebayo"
    },
]

export const getImages = () => {
    let firstArr = true
    const arr1: GalleryImage[] = []
    const arr2: GalleryImage[] = []
    galleryImgs.forEach((img) => {
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