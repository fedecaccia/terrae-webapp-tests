import abi from "../web3/abi";
import { eth } from './provider';


const denarisContractAddress = "0xb1c7bC091BE121af3Bf53a37ef21287D61Dfe697";
const denarisSymbol = "DENARIS";

const handleAddress = (dispatch, address) => {
  dispatch({
    type: 'UPDATE_ADDRESS',
    payload: address
  });
}

const handleBalance= (dispatch, token, balance) => {
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
    const denarisInst = new eth.Contract(abi, denarisContractAddress)
    const denarisBalance = await denarisInst.methods.balanceOf(addresses[0]).call();
    handleBalance(dispatch, "denaris", denarisBalance);
  } catch(err) {
    console.log(err);
  }
};

export default updateWeb3UserInfo;