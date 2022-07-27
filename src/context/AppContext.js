import React, {useState, createContext, useContext} from 'react'

const StateContext = createContext();

export const useAppContext = () => {
  return useContext(StateContext);
}

const AppContext = ({children}) => {

  const [currency, setCurrency] = useState('USD');

  return (
    <StateContext.Provider value={{currency, setCurrency}}>
      {children}
    </StateContext.Provider>
  )
}

export default AppContext