import React, {useState, useEffect} from "react";

import {Box, Flex, Spinner, Button} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

import {useAppContext} from "../context/AppContext";
import {getChart} from "../config/api";
import {buttons} from "../config/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({coin}) => {

  const {currency} = useAppContext();
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1); 

  const fetchChartData = async() => {
    const res = await fetch(getChart(coin.id, days, currency.value));
    const data = await res.json();
    setHistoricalData(data.prices);
  }

  useEffect(()=> {
    fetchChartData();
  }, [currency, days])

  const labels = historicalData && historicalData.map(coin => {
    let date = new Date(coin[0]);
    let time = 
    date.getHours() > 12 
      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
      : `${date.getHours()}:${date.getMinutes()} AM`;

    return days === 1 ? time : date.toLocaleDateString();
  })

  const data = {
    labels,
    datasets: [{
      data: historicalData && historicalData.map(coin => coin[1]),
      label: `Price (Past ${days} days) in ${currency.value}`,
      borderColor: '#4299E1',
    }]
  }

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 1,
      }
    }
  };

  return (
    <Box w={{base: 'full', md: '70%'}} pl={{base: 0, md: 3}}>
      <Box>
        {
          !historicalData ? (
            <Flex w='full' justify='center' py={5}><Spinner color='blue.400' size='xl' /></Flex>
          ) : (
            <>
              <Box>
                <Line data={data} options={options} />
                <Flex mt={8} justify='space-between' gap={{base: '0.5rem', md: 0}} >
                  {
                    buttons.map(btn => (
                      <Button
                        key={btn.value}
                        bgColor={btn.value === days ? 'blue.400' : 'transparent'}
                        border='1px'
                        borderColor='blue.400' 
                        color={btn.value === days ? 'white' : 'blue.400'} 
                        _hover={{transform: 'scale(1.05)'}}
                        onClick={() => setDays(btn.value)}
                      >
                        {btn.text}
                      </Button>
                    ))
                  }
                </Flex>
              </Box>
            </>
          )
        }
      </Box>
    </Box>
  )
}

export default CoinChart