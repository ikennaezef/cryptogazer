import React from 'react'

import {Box, Container, Flex, Heading, Select} from "@chakra-ui/react";

import {useAppContext} from "../context/AppContext";

const Header = () => {

  const {supportedCurrencies, setCurrency } = useAppContext();

  return (
    <Box py={5}>
      <Container maxW='container.xl'>
        <Flex align='center' justify='space-between'>
          <Heading fontSize='1.5rem' fontWeight='600' color='cyan.300'>CryptoGazer</Heading>
          <Box>
            <Select onChange={(e) => setCurrency(e.target.value)} colorScheme='blue.700' >
              {supportedCurrencies.map((currency, i) => (
                <option style={{background: '#2D3748'}} key={i} value={currency}>{currency}</option>
              ))}
            </Select>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header