import React, {useState} from 'react'

import {Box, Flex, Container, Image, Button, Text, Heading, Link} from "@chakra-ui/react";
import parse from "html-react-parser";

import {useAppContext} from "../context/AppContext";
import {numberWithCommas} from "../utils";

const CoinInfo = ({coin}) => {

  const {currency} = useAppContext();

  return (
    <Box w={{base: 'full', md: '30%'}} minH={{base: 'auto', md: '100vh'}} borderRightWidth={{base: '0', md: '1px'}} borderRightColor='gray.200'>
      <Box>
        <Flex direction='column' align='center' gap='1rem' mb={4}>
          <Image boxSize='6rem' src={coin?.image.large} alt={coin?.name} />
          <Heading>{coin?.name}</Heading>
        </Flex>
        <Text mb={3}>{parse(`${coin?.description.en.split('. ')[0]}`)}.</Text>
        <Box>
          <Text mb={3} fontSize='1.1rem'><strong>Rank: </strong> {coin?.coingecko_rank}</Text>
          <Text mb={3} fontSize='1.1rem'><strong>Current Price: </strong> {currency.symbol}{coin?.market_data.current_price[currency.value.toLowerCase()]}</Text>
          <Text mb={3} fontSize='1.1rem'><strong>Market Cap: </strong> {currency.symbol}{numberWithCommas((coin?.market_data.market_cap[currency.value.toLowerCase()]/1000000).toFixed(0))}{"M"}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default CoinInfo