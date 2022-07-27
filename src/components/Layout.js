import React from 'react'

import {Box} from "@chakra-ui/react";
import {Header} from "./";

const Layout = ({children}) => {
  return (
    <Box bg='gray.700' color='white' minH='100vh'>
      <Header/>
      <main>
        {children}
      </main>
    </Box>
  )
}

export default Layout