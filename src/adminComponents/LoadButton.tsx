import { Spinner } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  loading: boolean
  children: ReactNode
}
const LoadButton = ({loading, children}: Props) => {
  return (
    <>
      {loading && <Spinner/>}
      {!loading && children}
    </>
  )
}

export default LoadButton