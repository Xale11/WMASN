import Moyo from "../assets/Moyo.jpg"
import Israel from "../assets/Israel.jpg"
import Tunmiji from "../assets/Tunmiji.jpg"
import Bewaji from "../assets/Bewaji.jpg"
import Paul from "../assets/Paul2.jpg"
import { arrayUnion, collection, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase/firebase"
import { deleteObject, getDownloadURL, listAll, ref, StorageReference, uploadBytes } from "firebase/storage"

export interface FirebaseAboutInfo {
    id?: string;
    subtitle: string;
    ourStory: string;
    theTeam: TeamMember[]
}

export interface TeamMember {
    name: string;
    role: string;
    description: string;
    photo: string | undefined;
    contact: ContactType;
}

interface ContactType {
    linkedin: {
        show: boolean,
        handle: string,
        link: string,
    },
    instagram: {
        show: boolean,
        handle: string,
        link: string,
    },
    x: {
        show: boolean,
        handle: string,
        link: string,
    },
}

export const getAboutUsInfo = async () => {
const res: FirebaseAboutInfo[] = []
let i = 0
  let isError = false
  try {
    const q = query(collection(db, "about"));
    const data = await getDocs(q);
    for (const doc of data.docs) {
      const data = doc.data();
      const teamWithPhotos: TeamMember[] = []
      for (const member of data.theTeam){
        const imgRes = await getTeamImages(`${i}`)
        if (imgRes === "error"){
            isError = true
        } else {
            teamWithPhotos.push({
                ...member,
                photo: imgRes
            })
        }
        i++
      }
    //   console.log(teamWithPhotos)
      res.push({
          id: doc.id,
          ourStory: data.ourStory,
          subtitle: data.subtitle,
          theTeam: teamWithPhotos
      });
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

const getTeamImages = async (name: string) => {
    const arr1: StorageReference[] = [];
    const photoRef1 = ref(storage, `team/${name}`);
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

export const editAboutUsText = async (item: FirebaseAboutInfo) => {
    const updateRef = doc(db, "about", `${item.id}`)
    try {
      await updateDoc(updateRef, {
        ourStory: item.ourStory,
        subtitle: item.subtitle
      })
      
    } catch (error) {
      console.error(error)
      return "error"
    }
    return "success"
  }

export const addTeamMember = async (member: TeamMember, id: string, file: File | undefined, index: number) => {
    const updateRef = doc(db, "about", `${id}`)
    try {
        await updateDoc(updateRef, {
        theTeam: arrayUnion({
            name: member.name,
            role: member.role,
            description: member.description,
            contact: {
                linkedin: {
                    show: member.contact.linkedin.show,
                    handle: member.contact.linkedin.handle,
                    link: member.contact.linkedin.link
                },
                instagram: {
                    show: member.contact.instagram.show,
                    handle: member.contact.instagram.handle,
                    link: member.contact.instagram.link,
                },
                x: {
                    show: member.contact.x.show,
                    handle: member.contact.x.handle,
                    link: member.contact.x.link,
                },
            },
        })
        })

        if (file !== undefined){
            const imgRef = ref(storage, `team/${index}/${file.name}`)
            await uploadBytes(imgRef, file)
        }
        
    } catch (error) {
        console.error(error)
        return "error"
    }
    return "success"
}

export const editTeamMember = async (team: TeamMember[], id: string, file: File | undefined, index: number) => {
    const updateRef = doc(db, "about", `${id}`)
    try {
        await updateDoc(updateRef, {
        theTeam: team.map((item) => {
            return ({
                name: item.name,
                role: item.role,
                description: item.description,
                contact: {
                    linkedin: {
                        show: item.contact.linkedin.show,
                        handle: item.contact.linkedin.handle,
                        link: item.contact.linkedin.link
                    },
                    instagram: {
                        show: item.contact.instagram.show,
                        handle: item.contact.instagram.handle,
                        link: item.contact.instagram.link,
                    },
                    x: {
                        show: item.contact.x.show,
                        handle: item.contact.x.handle,
                        link: item.contact.x.link,
                    },
                },
              })
        })
        })

        if (file !== undefined){
            const imgRef = `team/${index}`
            await replaceTeamImg(imgRef, file)
        }
        
    } catch (error) {
        console.error(error)
        return "error"
    }
    return "success"
}

const replaceTeamImg = async (path: string, file: File) => {
    const data = await listAll(ref(storage, path))
    for (const itemRef of data.items) {
      await deleteObject(itemRef);
    }
    const imgRef = ref(storage, `${path}/${file.name}`)
    await uploadBytes(imgRef, file)
}

export const removeTeamImg = async (index: number) => {
    try {
      const data = await listAll(ref(storage, `team/${index}`))
      for (const itemRef of data.items) {
        await deleteObject(itemRef);
      }
    } catch (error) {
      console.error(error)
      return "error"
    }
    return "success"
  }


export const teamInfo = [
    {
        name: "Moyo Adebayo",
        role: "Lead Curator/Director",
        description: "Moyo is a designer, architecture graduate, and researcher interested in designing culturally responsive spaces for Nigerians and Africans at large. He aims to “inject Africa into the architectural canon” by sparking interest in vernacular architecture within communities through critical designs and collaborative practices.",
        photo: Moyo,
        contact: {
            linkedin: {
                show: true,
                handle: "Moyo Adebayo",
                link: "https://www.linkedin.com/in/moyo-adebayo-86a748267/"
            },
            instagram: {
                show: true,
                handle: "moyo_aaa",
                link: "https://www.instagram.com/moyo_aaa/",
            },
            x: {
                show: false,
                handle: "",
                link: "",
            },
        },
    },
    {
        name: "Tunmji Osibodu",
        role: "Curator/Cinematographer",
        description: "Tunmiji is a MArch student and Photographer working on sets with Wizkid amongst other artists and has helped produce set designs for the likes of Rema. His overall creative practice is informed by people’s real experiences and his immediate surroundings.",
        photo: Tunmiji,
        contact: {
            linkedin: {
                show: false,
                handle: "",
                link: ""
            },
            instagram: {
                show: true,
                handle: "tunmz_",
                link: "https://www.instagram.com/tunmz__/",
            },
            x: {
                show: false,
                handle: "",
                link: "",
            },
        },
    },
    {
        name: "Bewaji Oysesanya",
        role: "Curator",
        description: "Bewaji is a recent Part 1 Architect and recipient of RIBA student Award. Her strong commitment to change has led her to work with organisations such as the Hamelin trust, UN, Museum of Architecture, to name a few. She also has strong experience as a UX/UI designer.",
        photo: Bewaji,
        contact: {
            linkedin: {
                show: true,
                handle: "Tolu O.",
                link: "https://www.linkedin.com/in/tolu-o-5745a319a/",
            },
            instagram: {
                show: true,
                handle: "tbo.designs_",
                link: "https://www.instagram.com/tbo.designs_/",
            },
            x: {
                show: false,
                handle: "",
                link: "",
            },
        },
    },
    {
        name: "Israel Taiwo",
        role: "Marketing Lead",
        description: "Israel is the founder of IYSEIS, a marketing firm that focuses on creating organic marketing strategies that fosters a connection with the intended audience. His background in IT and Business alongside his experience as a designer helps him develop non linear solutions.",
        photo: Israel,
        contact: {
            linkedin: {
                show: true,
                handle: "Israel Taiwo",
                link: "https://www.linkedin.com/in/israel-t-89141a163/",
            },
            instagram: {
                show: true,
                handle: "ng_roylty",
                link: "https://www.instagram.com/ng_roylty/",
            },
            x: {
                show: false,
                handle: "",
                link: "",
            },
        },
    },
    {
        name: "Paul Yakubu",
        role: "Curator",
        description: "Architect and Researcher with a Master’s Degree in “Architecture and Urbanism” from the Architectural Association, London. Interested in housing, culture, semiotics, social boundaries of space",
        photo: Paul,
        contact: {
            linkedin: {
                show: true,
                handle: "Paul Yakubu",
                link: "https://www.linkedin.com/in/paul-yakubu-1b2326119/",
            },
            instagram: {
                show: true,
                handle: "yakubupaul",
                link: "https://www.instagram.com/yakubupaul/",
            },
            x: {
                show: false,
                handle: "",
                link: "",
            },
        },
    },
]