import { useReducer, useContext, createContext } from 'react';

const Web3StateContext = createContext();
const Web3DispatchContext = createContext();

const landIds = [
  "valley1",
  "forrest1",
  "river1",
  "field1",
  "valley2",
  "forrest2",
  "river2",
  "field2",
  "valley3",
  "forrest3",
  "river3",
  "field3",
  "valley4",
  "forrest4",
  "river4",
  "field4",
]

const heroeIds = [
  "aman",
  "pilos",
  "meises",
  "adenai",
]

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
  },
  deposited: {},
  accumulated: {},
  army: {}
}

landIds.forEach((id) => {
  initialState.deposited[id]=0;
  initialState.accumulated[id]=0;

  if (id === "valley1" || id === "forrest1" || id === "field1") {
    initialState.deposited[id]=10;
    initialState.accumulated[id]=120;
  }
});

heroeIds.forEach((id) => {
  initialState.army[id]=0;

  if (id === "pilos") {
    initialState.army[id]=1;
  }
});

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