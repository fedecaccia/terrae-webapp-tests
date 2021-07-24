import { useReducer, useContext, createContext } from 'react';

const Web3StateContext = createContext();
const Web3DispatchContext = createContext();

const landIds = [
  "Gold Farm",
  "Emerald Farm",
  "Sapphire Farm",
  "Ruby Farm",
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
  denarisPrice: 0,
  decimals: {
    bnb: 18,
    tden: 18,
    tgld: 18,
    temr: 18,
    tspp: 18,
    trby: 18
  },
  balances: {
    bnb: 0,
    tden: 0,
    tgld: 0,
    temr: 0,
    tspp: 0,
    trby: 0,
  },
  hourlyPower: {
    tgld: 0,
    tspp: 0,
    temr: 0,
    trby: 0,
  },
  deposited: {},
  accumulated: {},
  army: {}
}


/* POPULATE INIT STATE FOR DEMO */

landIds.forEach((id) => {
  initialState.deposited[id]=0;
  initialState.accumulated[id]=0;

  if (id === "Gold Farm" || id === "Sapphire Farm") {
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
/* ---------------------------- */

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ADDRESS':
      return {...state, address: action.payload}
    case 'UPDATE_BALANCE':
      let response = {...state};
      response.balances[action.payload.token] = action.payload.balance;
      return response;
    case "UPDATE_CHAIN_ID":
      return {...state, chainId: action.payload}
    case "UPDATE_DENARIS_PRICE":
      return {...state, denarisPrice: action.payload}
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