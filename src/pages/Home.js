import React from 'react'

import {Box, Container, Flex, Image, Button, Link, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react"
import {Layout, Banner} from "../components";

import {useAppContext} from "../context/AppContext";

const Home = () => {



  return (
    <Layout>
      <Banner/>
    </Layout>
  )
}

export default Home