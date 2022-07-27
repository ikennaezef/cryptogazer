import React, {useState, useEffect} from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';

import {Link} from "react-router-dom";
import {Box, Container, Flex, Heading, Text, Image, Spinner} from "@chakra-ui/react";
import AliceCarousel from 'react-alice-carousel';

import {getTrendingCoins} from "../config/api";
import {useAppContext} from "../context/AppContext";

const handleDragStart = (e) => e.preventDefault();

const Banner = () => {

  const {currency} = useAppContext();
  const [trendingCoins, setTrendingCoins] = useState([]);

  const fetchTrending = async () => {
    try {
      const res = await fetch(getTrendingCoins(currency.value));
      const data = await res.json();
      setTrendingCoins(data);
    } catch (err) {
      console.log(err)
    }
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const responsive = {
    0: {
      items: 2
    },
    512: {
      items: 4
    }
  }

  const items = trendingCoins && trendingCoins.map(coin => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
        <Link to={`/coin/${coin.id}`}>
          <Flex direction='column' align='center' gap='0.8rem'>
            <Image boxSize='4rem' src={coin.image} alt='coin image' />
            <Flex align='center' gap='0.5rem'>
              <Text>{coin.symbol.toUpperCase()}</Text>
              <Text color={profit ? 'green.300' : 'red.300'}>{profit ? '+' : '-'}{coin.price_change_percentage_24h.toFixed(2)}</Text>
            </Flex>
            <Text fontSize='1.2rem'>{currency.symbol}{numberWithCommas(coin.current_price.toFixed(2))}</Text>
          </Flex>
        </Link>
    )
  })

  useEffect(() => {
    fetchTrending();
  }, [currency])

  return (
    <Box py={10}>
      <Container maxW='container.md'>
        <Box mb={6} textAlign='center'>
          <Heading fontSize={{base: '2.4rem', md: '2.8rem'}} mb={2} >Crypto Gazer</Heading>
          <Text color='gray.300'>Get all the info you need about your favorite cryptocurrencies</Text>
        </Box>
        <Flex align='center' justify='center'>
          {trendingCoins.length < 1 ?
            (<Flex align='center' justify='center' w='full' py={6}><Spinner color='blue.400' size='xl'/></Flex>) :
            (<AliceCarousel
              mouseTracking
              disableDotsControls
              disableButtonsControls
              autoPlay={true}
              autoPlayInterval={1500}
              animationDuration={1000}
              infinite={true}
              responsive={responsive}
              items={items}
            />)
          }
        </Flex>
      </Container>
    </Box>
  )
}

export default Banner