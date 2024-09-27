import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider, extendTheme, theme as base } from '@chakra-ui/react'
import ContextProvider from './context/ContextProvider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Gallery from './pages/Gallery.tsx'
import Store from './pages/Store.tsx'
import Contacts from './pages/Contacts.tsx'
import Fonts from './fonts/Fonts.tsx'
import Projects from './pages/Projects.tsx'
import AboutUs from './pages/AboutUs.tsx'
import Bag from './pages/Bag.tsx'
import Cancel from './pages/Cancel.tsx'
import Success from './pages/Success.tsx'
import StoreAdmin from './adminPages/StoreAdmin.tsx'
import AboutAdmin from './adminPages/AboutAdmin.tsx'
import ProjectsAdmin from './adminPages/ProjectsAdmin.tsx'
import HomeAdmin from './adminPages/HomeAdmin.tsx'
import GalleryAdmin from './adminPages/GalleryAdmin.tsx'
import Auth from './adminPages/Auth.tsx'
import { QueryClient, QueryClientProvider } from 'react-query';
import SubmittedArtefacts from './pages/SubmittedArtefacts.tsx'
import ComissionedArtefacts from './pages/CommissionedArtefacts.tsx'
import ArtefactsAdmin from './adminPages/ArtefactsAdmin.tsx'

const fonts = {
  Roboto: `'Roboto', ${base.fonts?.body}, sans-serif`,
  RobotoLight: `'Roboto-Light', ${base.fonts?.heading}, sans-serif`,
  RobotoBold: `'Roboto-Bold', ${base.fonts?.heading}, sans-serif`,
}

const queryClient = new QueryClient();

const theme = extendTheme({fonts})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/artefacts/submitted",
    element: <SubmittedArtefacts />,
  },
  {
    path: "/artefacts/commissioned",
    element: <ComissionedArtefacts />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/bag",
    element: <Bag />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/admin",
    element: <Auth />,
  },
  {
    path: "/admin/home",
    element: <HomeAdmin />,
  },
  {
    path: "/admin/store",
    element: <StoreAdmin />,
  },
  {
    path: "/admin/about",
    element: <AboutAdmin />,
  },
  {
    path: "/admin/projects",
    element: <ProjectsAdmin />,
  },
  {
    path: "/admin/gallery",
    element: <GalleryAdmin />,
  },
  {
    path: "/admin/artefacts",
    element: <ArtefactsAdmin/>,
  },
  {
    path: "/admin/artefacts/submitted",
    element: <ArtefactsAdmin/>,
  },
  {
    path: "/admin/artefacts/commissioned",
    element: <ArtefactsAdmin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Fonts/>
        <ContextProvider>
          <RouterProvider router={router}/>
        </ContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
