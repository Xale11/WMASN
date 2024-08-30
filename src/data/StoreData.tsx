import { doc, addDoc, collection, getDocs, query, serverTimestamp, updateDoc, deleteDoc } from "firebase/firestore";

import Product1_1 from "../assets/Product1_1.png";
import Product1_2 from "../assets/Product1_2.png";
import Product2 from "../assets/Product2.png";
import Product2_2 from "../assets/Product2_2.png";
import Product3 from "../assets/Product3.png";
import Product3_2 from "../assets/Product3_2.png";
import Product4_1 from "../assets/Product4_1.png";
import Product4_2 from "../assets/Product4_2.png";
import Product5 from "../assets/Product5.png";
import { db, storage } from "../firebase/firebase";
import { deleteObject, getDownloadURL, listAll, ref, StorageReference, uploadBytes } from "firebase/storage";

export interface Product {
  id?: string;
  name: string;
  img1: string;
  img2: string | undefined;
  price: number;
  description: string;
  stock?: number
  createdAt?: string
}

export interface FirebaseLineItem {
  id?: string;
  name: string;
  price: number;
  description: string;
  img1: File,
  img2: File | undefined;
  stock?: number
  createdAt?: string
}

export interface LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: string[];
      description: string;
    };
    unit_amount: number;
  };
  quantity: number;
}

export interface ShippingRate {
  id?: string,
  name: string,
  price: number,
  shipMax: number,
  shipMin: number,
}

export const getStoreItems = async () => {
  let isError: boolean = false;
  const res: Product[] | "error" = [];
  try {
    const q = query(collection(db, "storeItems"));
    const data = await getDocs(q);
    for (const doc of data.docs) {
      const data = doc.data();
      const photos = await getPhotoItem(doc.id);
    //   console.log(photos)
      if (photos[0] === undefined){
        console.log("error", doc.id)
        isError = true
      }else {
        res.push({
            id: doc.id,
            name: data.name,
            price: data.price,
            description: data.description,
            img1: photos[0],
            img2: photos[1],
            stock: data.stock,
            createdAt: `${data?.createdAt?.seconds}`
        });
      }
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
};

const getPhotoItem = async (id: string) => {
  const arr1: StorageReference[] = [];
  const arr2: StorageReference[] = [];
  const photoRef1 = ref(storage, `${id}/img1`);
  const photoRef2 = ref(storage, `${id}/img2`);
  try {
    await listAll(photoRef1)
        .then((res) => {
            res.items.forEach(async (item: StorageReference) => {
                arr1.push(item)
            })
        });
    await listAll(photoRef2)
        .then((res) => {
            res.items.forEach(async (item: StorageReference) => {
              arr2.push(item);
            });
        });
    // console.log(id, arr1, arr2);
  } catch (error) {
    console.error(error)
    return [undefined, undefined]
  }
  const res1 = arr1.length === 0 ? undefined : await getDownloadURL(arr1[0]);
  const res2 = arr2.length === 0 ? undefined : await getDownloadURL(arr2[0]);
  return [
    res1,
    res2,
  ];
};

export const addStoreItem = async (item: FirebaseLineItem) => {
  const colRef = collection(db, "storeItems")
  try {
    const docRef = await addDoc(colRef, {
      name: item.name,
      description: item.description,
      price: item.price,
      createdAt: serverTimestamp()
    })
    const img1Ref = ref(storage, `${docRef.id}/img1/${item.img1.name}`)
    const img2Ref = ref(storage, `${docRef.id}/img2/${item?.img2?.name}`)
    if (item.img2 === undefined){
      await uploadBytes(img1Ref, item.img1)
    } else {
      await uploadBytes(img1Ref, item.img1)
      await uploadBytes(img2Ref, item.img2)
    }
    return "success"
  } catch (error) {
    console.error(error)
    return "error"
  }

}

export const editStoreItem = async (item: FirebaseLineItem) => {
  const updateRef = doc(db, "storeItems", `${item.id}`)
  try {
    await updateDoc(updateRef, {
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
    })
    const img1Ref = `${item.id}/img1`
    const img2Ref = `${item.id}/img2`
    if (item.img2 !== undefined && item.img1 !== undefined) {
      await replaceImg(img1Ref, item.img1)
      await replaceImg(img2Ref, item.img2)
    }
    else if (item.img2 === undefined && item.img1 !== undefined){
      await replaceImg(img1Ref, item.img1)
    } 
    else if (item.img2 !== undefined && item.img1 === undefined){
      await replaceImg(img2Ref, item.img2)
    }
    
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}

const replaceImg = async (path: string, file: File) => {
    const data = await listAll(ref(storage, path))
    for (const itemRef of data.items) {
      await deleteObject(itemRef);
    }
    const imgRef = ref(storage, `${path}/${file.name}`)
    await uploadBytes(imgRef, file)
}

export const removeProductImg = async (item: Product) => {
  try {
    const data = await listAll(ref(storage, `${item.id}/img2`))
    for (const itemRef of data.items) {
      await deleteObject(itemRef);
    }
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}

export const deleteStoreItem = async (item: Product) => {
  try {
    await deleteDoc(doc(db, "storeItems", `${item.id}`));
    let data = await listAll(ref(storage, `${item.id}/img1`))
    for (const itemRef of data.items) {
      await deleteObject(itemRef);
    }
    data = await listAll(ref(storage, `${item.id}/img2`))
    for (const itemRef of data.items) {
      await deleteObject(itemRef);
    }
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}

export const addShippingRate = async (rate: ShippingRate) => {
  const colRef = collection(db, "shipping")
  try {
    await addDoc(colRef, {
      name: rate.name,
      price: rate.price,
      shipMin: rate.shipMin,
      shipMax: rate.shipMax
    })
    return "success"
  } catch (error) {
    console.error(error)
    return "error"
  }
}

export const getShippingRates = async () => {
  const res: ShippingRate[] = []
  let isError = false
  try {
    const q = query(collection(db, "shipping"));
    const data = await getDocs(q);
    for (const doc of data.docs) {
      const data = doc.data();
      res.push({
          id: doc.id,
          name: data.name,
          price: data.price,
          shipMax: data.shipMax,
          shipMin: data.shipMin
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

export const editShippingRates = async (rate: ShippingRate) => {
  const updateRef = doc(db, "shipping", `${rate.id}`)
  try {
    await updateDoc(updateRef, {
      name: rate.name,
      price: rate.price,
      shipMax: rate.shipMax,
      shipMin: rate.shipMin
    })
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}

export const removeShippingRates = async (rate: ShippingRate) => {
  try {
    await deleteDoc(doc(db, "shipping", `${rate.id}`));
  } catch (error) {
    console.error(error)
    return "error"
  }
  return "success"
}

export const items: Product[] = [
  {
    name: "Two Bronze Nigerian Deity Statues",
    img1: Product4_1,
    img2: Product4_2,
    price: 150.0,
    description: "Two Bronze Nigerian Deity Statues",
  },
  {
    name: "Painting of Lagos",
    img1: Product3,
    img2: Product3_2,
    price: 170.0,
    description: "Painting of Lagos",
  },
  {
    name: "Old Wooden Nigerian Carving of a Head",
    img1: Product5,
    img2: undefined,
    price: 30.0,
    description: "Old Wooden Nigerian Carving of a Head",
  },
  {
    name: "Nigerian Wooden Funriture",
    img1: Product2,
    img2: Product2_2,
    price: 20.0,
    description: "Nigerian Wooden Funriture",
  },
  {
    name: "Nigeria Themed Coasters",
    img1: Product1_2,
    img2: Product1_1,
    price: 6.0,
    description: "Nigeria Themed Coasters",
  },
];

export const testCart: LineItem[] = [
  {
    price_data: {
      currency: "gbp",
      product_data: {
        name: "TWO BRONZE NIGERIAN DEITY STATUES",
        images: [Product1_1],
        description: "test1",
      },
      unit_amount: 799,
    },
    quantity: 3,
  },
  {
    price_data: {
      currency: "gbp",
      product_data: {
        name: "TWO BRONZE NIGERIAN DEITY STATUES",
        images: [Product1_1],
        description: "test1",
      },
      unit_amount: 799,
    },
    quantity: 3,
  },
  {
    price_data: {
      currency: "gbp",
      product_data: {
        name: "TWO BRONZE NIGERIAN DEITY STATUES",
        images: [Product1_1],
        description: "test1",
      },
      unit_amount: 799,
    },
    quantity: 3,
  },
  {
    price_data: {
      currency: "gbp",
      product_data: {
        name: "TWO BRONZE NIGERIAN DEITY STATUES",
        images: [Product1_1],
        description: "test1",
      },
      unit_amount: 799,
    },
    quantity: 3,
  },
  {
    price_data: {
      currency: "gbp",
      product_data: {
        name: "TWO BRONZE NIGERIAN DEITY STATUES",
        images: [Product1_1],
        description: "test1",
      },
      unit_amount: 799,
    },
    quantity: 3,
  },
  {
    price_data: {
      currency: "gbp",
      product_data: {
        name: "TWO BRONZE NIGERIAN DEITY STATUES",
        images: [Product1_1],
        description: "test1",
      },
      unit_amount: 799,
    },
    quantity: 3,
  },
];