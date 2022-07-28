import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"

import {Box, Text, Flex, Image, Spinner, InputGroup, InputRightElement, Input, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import {BsSearch, BsChevronRight, BsChevronLeft} from "react-icons/bs";
import ReactPaginate from "react-paginate";

import {useAppContext} from "../context/AppContext";
import {getAllCoins} from "../config/api";

const DataTables = () => {

  const {currency} = useAppContext();
  const [coinsData, setCoinsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  let navigate = useNavigate();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchCoins = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(getAllCoins(currency.value));
      const data = await res.json();
      setCoinsData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err)
      setError(true);
    }
  }

  const handleSearch = () => {
    return coinsData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery) ||
        coin.symbol.toLowerCase().includes(searchQuery)
    );
  }

  const changePage = ({selected}) => {
    setPageNumber(selected + 1);
    window.scroll(0, 400);
  }

  useEffect(() => {
    fetchCoins();
  }, [currency])



  return (
    <Box>

      <Box mb={6}>
        <InputGroup>
          <Input placeholder='Search for a cryptocurrency...' borderColor='gray.500' onChange={(e) => setSearchQuery(e.target.value)} />
          <InputRightElement h='full'>
            <BsSearch fontSize='1.2rem'/>
          </InputRightElement>
        </InputGroup>
      </Box>

      <Box mb={6}>
        {error && <Text color='red.400' py={5}>It seems like an error occured. Couldn't fetch coin data.</Text>}
        { loading ? (
          <Flex align='center' justify='center' w='full' py={6}><Spinner color='blue.400' size='xl'/></Flex>) : (
          <TableContainer>
            <Table variant='simple' colorScheme='whiteAlpha' >
              <Thead bg='blue.500'>
                <Tr>
                  <Th color='white'>Coin</Th>
                  <Th isNumeric color='white'>Price</Th>
                  <Th isNumeric color='white'>24h Change(%)</Th>
                  <Th isNumeric color='white'>Market Cap</Th>
                </Tr>
              </Thead>
              <Tbody>
                {handleSearch().slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10).map((coin) => {
                  let profit = coin.price_change_percentage_24h >= 0;
                  return (
                      <Tr key={coin.id} onClick={() => navigate(`/coin/${coin.id}`)} >
                        <Td>
                          <Flex align='center' gap='0.5rem'>
                            <Image boxSize='3rem' src={coin.image} alt={coin.name} />
                            <Box>
                              <Text fontSize='0.8rem' color='gray.300' >{coin.name}</Text>
                              <Text>{coin.symbol.toUpperCase()}</Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td isNumeric>
                          {currency.symbol}{numberWithCommas(coin.current_price)}
                        </Td>
                        <Td isNumeric color={profit ? 'green.300' : 'red.300'}>
                          {profit && '+'}{coin.price_change_percentage_24h.toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {currency.symbol}{Math.round(((coin.market_cap)/1000000))}{"M"}
                        </Td>
                      </Tr>
                    )
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Coin</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>24h Change(%)</Th>
                  <Th isNumeric>Market Cap</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Box pb={8}>
        {handleSearch().length > 10 && (
          <ReactPaginate
            previousLabel={<BsChevronLeft/>}
            nextLabel={<BsChevronRight/>}
            pageCount={Math.ceil(handleSearch().length / 10)}
            onPageChange={changePage}
            containerClassName={"paginationBtns"}
            previousLinkClassName={"prevBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        )}
      </Box>

    </Box>
  )
}

export default DataTables