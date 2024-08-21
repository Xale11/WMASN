import React, { createContext, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { LineItem, Product } from '../data/StoreData'

export type ContextData = {
  bag: LineItem[];
  setBag: React.Dispatch<SetStateAction<LineItem[]>>;
  addToBag: (item: Product) => void;
  editItemQuantity: (item: LineItem, quantity: number) => void;
  removeFromBag: (item: LineItem) => void;
  subtotal: string;
  numItems: number;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<SetStateAction<boolean>>;
};

export const ContextAPI = createContext<ContextData | undefined>(undefined)

type Props = {
    children: ReactNode
}

const ContextProvider = ({children}: Props) => {

    const [bag, setBag] = useState<LineItem[]>([])
    const [subtotal, setSubtotal] = useState<string>("0");
    const [numItems, setNumItems] = useState<number>(0);
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    const editItemQuantity = (item: LineItem, quantity: number) => {
      console.log(item, quantity)
      const newBag = [...bag].map((lineItem) => {
        if (lineItem === item) {
          return { ...lineItem, quantity: quantity };
        } else {
          return lineItem;
        }
      });
      setBag(newBag)
      localStorage.setItem("wmasnShoppingBag", JSON.stringify(newBag));
    }

    const removeFromBag = (item: LineItem) => {
      const newBag = [...bag].filter((lineItem) => lineItem !== item);
      setBag(newBag)
      localStorage.setItem("wmasnShoppingBag", JSON.stringify(newBag));
    }
    
    const addToBag = (item: Product) => {
      const lineItems = convertToLineItem(item)
      console.log(lineItems)
      setBag(lineItems)
      localStorage.setItem("wmasnShoppingBag", JSON.stringify(lineItems))
    }

    const convertToLineItem = (item: Product) => {
      let newItem = true

      const newBag = [...bag].map((lineItem) => {
        if (
          lineItem.price_data.product_data.name === item.name &&
          lineItem.price_data.product_data.description === item.description
        ) {
          newItem = false
          return ({...lineItem, quantity: lineItem.quantity + 1})
        } else {
          return lineItem
        }
      })

      if (newItem) {
        newBag.push({
          price_data: {
            currency: "gbp",
            unit_amount: item.price * 100,
            product_data: {
              name: item.name,
              images: item.img2 === undefined ? [item.img1] : [item.img1, item.img2],
              description: item.description
            }
          },
          quantity: 1,
        });
      }
      return newBag
    }

    useEffect(() => {
      const calcSummary = () => {
        let total = 0;
        let quantity = 0;
        for (const item of bag) {
          quantity = quantity + item.quantity;
          total = total + item.quantity * (item.price_data.unit_amount / 100);
        }
        setSubtotal(total.toFixed(2));
        setNumItems(quantity);
      };

      calcSummary();
    }, [bag]);

    useEffect(() => {
      const jsonBag = localStorage.getItem("wmasnShoppingBag");
      const authBag = sessionStorage.getItem("wmasnLogin");

      if (authBag !== null){
        const data = JSON.parse(authBag)
        setLoggedIn(data.loggedIn)
        return
      }
      if (jsonBag === null){
        setBag([...bag])
      }else {
        const storedBag = JSON.parse(jsonBag);
        console.log(storedBag);
        setBag(storedBag)
      }
    }, [])

  return (
    <ContextAPI.Provider
      value={{
        bag,
        setBag,
        addToBag,
        subtotal,
        numItems,
        editItemQuantity,
        removeFromBag,
        loggedIn,
        setLoggedIn
      }}>
      {children}
    </ContextAPI.Provider>
  );
}

export default ContextProvider