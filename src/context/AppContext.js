import React, {useState, createContext, useContext} from 'react'

const StateContext = createContext();

export const useAppContext = () => {
  return useContext(StateContext);
}

const AppContext = ({children}) => {
  
  const supportedCurrencies = [
    {
      value: 'USD',
      symbol: '$'
    },
    {
      value: 'GBP',
      symbol: '£'
    },
    {
      value: 'EUR',
      symbol: '€'
    },
    {
      value: 'NGN',
      symbol: 'N'
    }
  ];

  const [currency, setCurrency] = useState(supportedCurrencies[0]);


  return (
    <StateContext.Provider value={{currency, setCurrency, supportedCurrencies}}>
      {children}
    </StateContext.Provider>
  )
}

export default AppContext