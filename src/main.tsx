import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider, extendTheme, theme as base } from '@chakra-ui/react'
import ContextProvider from './context/ContextProvider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Gallery from './pages/Gallery.tsx'
import Artefacts from './pages/Artefacts.tsx'
import Store from './pages/Store.tsx'
import Contacts from './pages/Contacts.tsx'
import Fonts from './fonts/Fonts.tsx'
import Projects from './pages/Projects.tsx'
import ProjectPage from './pages/ProjectPage.tsx'
import AboutUs from './pages/AboutUs.tsx'

const fonts = {
  Roboto: `'Roboto', ${base.fonts?.body}, sans-serif`,
  RobotoLight: `'Roboto-Light', ${base.fonts?.heading}, sans-serif`,
  RobotoBold: `'Roboto-Bold', ${base.fonts?.heading}, sans-serif`,
}

const theme = extendTheme({fonts})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/gallery",
    element: <Gallery/>
  },
  {
    path: "/artefacts/submitted",
    element: <Artefacts/>
  },
  {
    path: "/artefacts/commissioned",
    element: <Artefacts/>
  },
  {
    path: "/store",
    element: <Store/>
  },
  {
    path: "/contacts",
    element: <Contacts/>
  },
  {
    path: "/about",
    element: <AboutUs/>
  },
  {
    path: "/projects",
    element: <Projects/>
  },
  {
    path: "/project/:id",
    element: <ProjectPage/>
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts/>
      <ContextProvider>
        <RouterProvider router={router}/>
      </ContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
