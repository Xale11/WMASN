import React, { createContext, ReactNode, SetStateAction, useState } from 'react'

type ContextData = {
    ph: boolean
    setPh: React.Dispatch<SetStateAction<boolean>>
}

export const ContextAPI = createContext<ContextData | undefined>(undefined)

type Props = {
    children: ReactNode
}

const ContextProvider = ({children}: Props) => {

    const [ph, setPh] = useState<boolean>(true);

  return (
    <ContextAPI.Provider value={{ph, setPh}}>
        {children}
    </ContextAPI.Provider>
  )
}

export default ContextProvider