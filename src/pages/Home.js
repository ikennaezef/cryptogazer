import React from 'react'

import { Container } from "@chakra-ui/react"
import { Banner, DataTables} from "../components";

const Home = () => {
  return (
    <Container maxW='container.xl'>
      <Banner/>
      <DataTables/>
    </Container>
  )
}

export default Home