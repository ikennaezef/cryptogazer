import React from 'react'

import {Box, Container, Flex, Heading, Select} from "@chakra-ui/react";

const Header = () => {
  return (
    <Box py={5}>
      <Container maxW='container.xl'>
        <Flex align='center' justify='space-between'>
          <Heading color='cyan.300'>CryptoGazer</Heading>
          <Box>
            <Select>
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
            </Select>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header