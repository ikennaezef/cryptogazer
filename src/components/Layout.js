import React from 'react'

import {Box} from "@chakra-ui/react";
import {Header} from "./";

const Layout = ({children}) => {
  return (
    <Box bg='gray.800' color='gray.50' minH='100vh'>
      <Header/>
      <main>
        {children}
      </main>
    </Box>
  )
}

export default Layout