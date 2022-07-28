import React, {useState} from 'react'

import {Box, Flex, Container, Image, Button, Text, Heading, Link} from "@chakra-ui/react";
import parse from "html-react-parser";

import {useAppContext} from "../context/AppContext";
import {numberWithCommas} from "../utils";

const CoinInfo = ({coin}) => {

  const {currency} = useAppContext();

  console.log(coin);

  return (
    <Box w={{base: 'full', md: '30%'}} borderRightWidth={{base: '0', md: '1px'}} borderRightColor='gray.200'>
      <Box>
        <Flex direction='column' align='center' gap='1rem' mb={4}>
          <Image boxSize='6rem' src={coin?.image.large} alt={coin?.name} />
          <Heading>{coin?.name}</Heading>
        </Flex>
        <Text mb={3}>{parse(`${coin?.description.en.split('. ')[0]}`)}.</Text>
        <Box>
          <Text mb={3} fontSize='1.1rem'><strong>Rank: </strong> {coin?.coingecko_rank}</Text>
          <Text mb={3} fontSize='1.1rem'><strong>Current Price: </strong> {currency.symbol}{coin?.market_data.current_price[currency.value.toLowerCase()]}</Text>
          <Text mb={3} fontSize='1.1rem'><strong>Rank: </strong> {coin?.coingecko_rank}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default CoinInfo