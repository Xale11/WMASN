import { Global } from '@emotion/react'

const Fonts = () => {
  return (
    <Global
        styles={`
            @font-face{
                font-family: "Roboto";
                font-style: normal;
                font-weight: normal;
                src: url(./src/fonts/Roboto-Regular.ttf)
            }    
        `}
    />
  )
}

export default Fonts