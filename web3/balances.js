import denarisAbi from "./denarisAbi";
import farmAbi from "./farmAbi";
import { eth } from './provider';
import contracts from './addresses';

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

const handleReward= (dispatch, farm, reward) => {
  dispatch({
    type: 'UPDATE_REWARD',
    payload: { farm, reward }
  });
}

const handleStake= (dispatch, farm, stake) => {
  dispatch({
    type: 'UPDATE_STAKE',
    payload: { farm, stake }
  });
}

const handleHourlyYield= (dispatch, farms ) => {
  dispatch({
    type: 'UPDATE_YIELD',
    payload: { farms }
  });
}

const updateWeb3UserInfo = async ( dispatch ) => {

  try{
    const addresses = await eth.getAccounts(); // Get user's ETH addresses
    handleAddress(dispatch, addresses[0]);

    // BNB balance
    const bnbBalance = await eth.getBalance(addresses[0]);
    handleBalance(dispatch, "bnb", bnbBalance);

    // tokens balance
    for (const symbol of Object.keys(contracts.tokens)) {
      let inst = new eth.Contract(denarisAbi, contracts.tokens[symbol])
      let balance = await inst.methods.balanceOf(addresses[0]).call();
      handleBalance(dispatch, symbol.toLowerCase(), balance);
    }

    // farms positions
    let farms = [];
    for (const farm of Object.keys(contracts.farms)) {
      let inst = new eth.Contract(farmAbi, contracts.farms[farm].address)
      for (let i=0; i<contracts.farms[farm].resources.length; i++){
        let reward = await inst.methods.getAddressReward(i, addresses[0]).call();
        handleReward(dispatch, farm, reward);

        let stake = await inst.methods.getAddressStake(addresses[0]).call();
        handleStake(dispatch, farm, stake);
      }
      farms.push({
        id: farm,
        resources: contracts.farms[farm].resources,
        rewardsPerBlock: contracts.farms[farm].rewardsPerBlock,
      });
    }
    handleHourlyYield(dispatch, farms)

  } catch(err) {
    console.log(err);
  }
};

export default updateWeb3UserInfo;