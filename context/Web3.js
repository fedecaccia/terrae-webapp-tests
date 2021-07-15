import { useReducer, useContext, createContext } from 'react';

const Web3StateContext = createContext();
const Web3DispatchContext = createContext();

const initialState = {
  chainId: null,
  address: "",
  balances: {
    bnb: 0,
    denaris: 0,
    gold: 0,
    zafir: 0,
    esmerald: 0,
    ruby: 0,
  },
  hourlyPower: {
    gold: 0,
    zafir: 0,
    esmerald: 0,
    ruby: 0,
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ADDRESS':
      return {...state, address: action.payload}
    case 'UPDATE_BALANCE':
      let response = {
        ...state,
        balances: {
          ...state.balances,
        }
      };
      response.balances[action.payload.token] = action.payload.balance;
      return response;
    case "UPDATE_CHAIN_ID":
      return {...state, chainId: action.payload}
    case "RESET":
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const Web3Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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