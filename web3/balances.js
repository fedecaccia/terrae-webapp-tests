import denarisAbi from "./denarisAbi";
import { eth } from './provider';
import contracts from './addresses';

const handleAddress = (dispatch, address) => {
  dispatch({
    type: 'UPDATE_ADDRESS',
    payload: address
  });
}

const handleBalance= (dispatch, token, balance) => {
  console.log(token, balance)
  dispatch({
    type: 'UPDATE_BALANCE',
    payload: { token, balance }
  });
}

const updateWeb3UserInfo = async ( dispatch ) => {

  try{
    const addresses = await eth.getAccounts(); // Get user's ETH addresses
    handleAddress(dispatch, addresses[0]);
    const bnbBalance = await eth.getBalance(addresses[0]);
    handleBalance(dispatch, "bnb", bnbBalance);

    for (const symbol of Object.keys(contracts.tokens)) {
      let inst = new eth.Contract(denarisAbi, contracts.tokens[symbol])
      let balance = await inst.methods.balanceOf(addresses[0]).call();
      handleBalance(dispatch, symbol.toLowerCase(), balance);
    }
  } catch(err) {
    console.log(err);
  }
};

export default updateWeb3UserInfo;