import { useReducer, useContext, createContext } from 'react';

const Web3StateContext = createContext()
const Web3DispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ADDRESS':
      return {...state, address: action.payload}
    case 'UPDATE_BNB_BALANCE':
      return {...state, bnbBalance: action.payload}
    case 'UPDATE_TOKEN_BALANCE':
      let response = {...state};
      response.tokensBalance[action.payload.token] = action.payload.value;
      return response;
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const Web3Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    address: "",
    bnbBalance: 0,
    tokensBalance: {
      denaris: 0
    }
  });

  return (
    <Web3DispatchContext.Provider value={dispatch}>
      <Web3StateContext.Provider value={state}>
        {children}
      </Web3StateContext.Provider>
    </Web3DispatchContext.Provider>
  )
}

export const useWeb3 = () => useContext(Web3StateContext)
export const useDispatchWeb3 = () => useContext(Web3DispatchContext)