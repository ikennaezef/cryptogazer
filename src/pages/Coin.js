import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom";

import {Container, Flex, Spinner} from "@chakra-ui/react"
import { CoinInfo, CoinChart} from "../components";

import {getSingleCoin} from "../config/api";

const Coin = () => {

  const {coinId} = useParams();
  const [coinData, setCoinData] = useState(null);

  const fetchCoin = async() => {
    const res = await fetch(getSingleCoin(coinId));
    const data = await res.json();
    setCoinData(data);
  }

  useEffect(()=>{
    fetchCoin();
  }, [])

  return (
    <Container maxW='container.xl'>
      <Flex direction={{base: 'column', md: 'row'}} gap='1rem' py={5} >
        {!coinData ? <Flex w='full' justify='center' py={5}><Spinner color='blue.400' size='xl' /></Flex>
          : (
              <>
                <CoinInfo coin={coinData}/>
                <CoinChart coin={coinData}/>
              </>
            )
        }
      </Flex>
    </Container>
  )
}

export default Coin