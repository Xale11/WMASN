import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface HomePageInfo {
  email: string
  intro: string
  location: string
  number: string 
}
export const getHomePageInfo = async () => {
  console.log("startloc")
  let res: HomePageInfo = {
    email: "",
    intro: "",
    location: "",
    number: ""
  }
  let isError = false
  try {
    const q = query(collection(db, "home"));
    const data = await getDocs(q);
    for (const doc of data.docs) {
      const data = doc.data();
      res = {
        email: data.email,
        intro: data.intro,
        location: data.location,
        number: data.number
      }
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

export const editIntro = async (string: string) => {
  const updateRef = doc(db, "home", "homeContent")
  try {
    await updateDoc(updateRef, {
      intro: string
    })
    
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}

export const editContactDets = async (data: HomePageInfo) => {
  const updateRef = doc(db, "home", "homeContent")
  try {
    await updateDoc(updateRef, {
      number: data.number,
      location: data.location,
      email: data.location
    })
    
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}