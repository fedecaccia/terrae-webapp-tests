import { eth } from './provider';
import contractDenarisAbi from "./denarisAbi";
import contractFarmAbi from "./farmAbi";
import contractResourceAbi from "./resourceAbi";
// import contractArmyAbi from "./armyAbi";
import addresses from "./addresses";
import BigNumber from "bignumber.js";

const denarisAddress = addresses.tokens.TDEN;
const ETH_DECIMALS = 18;
const DENARIS_DECIMALS = 18;

// const handleAddress = (dispatch, address) => {
//   dispatch({
//     type: 'UPDATE_ADDRESS',
//     payload: address
//   });
// }

// const handleBalance= (dispatch, token, balance) => {
//   dispatch({
//     type: 'UPDATE_BALANCE',
//     payload: { token, balance }
//   });
// }

const toHex = decimal => (`0x${decimal.toString(16)}`);
const ethToWei = eth => (BigNumber(eth).multipliedBy(10**ETH_DECIMALS));
const denarisToWei = denaris => (denaris*10**DENARIS_DECIMALS);

export const train = async ({ unitId, userAddress }) => {
  let count = await eth.getTransactionCount(userAddress);

  // First, give allowance to army contract (to spend resources on behalf of user)

  const contractOptions = {
    from: userAddress,
    value: "0x00",
    // gasLimit: "0x30D40",
    gasLimit: "0xFFD40",
    // gasPrice: "0x12A05F200", // default will use web3.eth.getGasPrice(), // 5000000000 (5 gwei)
    gasPrice: "0x4A817C800", // default will use web3.eth.getGasPrice(), // 20000000000 (20 gwei)
    nonce: toHex(count), // default will use web3.eth.getTransactionCount()
    // chainId: 1, // default will use web3.eth.net.getId()
  }

  let approvals = [];

  addresses.army[unitId].resources.forEach((resourceId, idx) => {

    resourceId = resourceId.toLowerCase();

    const tokenContractInstance = new eth.Contract(contractResourceAbi, addresses.tokens[resourceId]);
    approals.push(tokenContractInstance.methods.approve(
      addresses.army[unitId].address,
      ethToWei(addresses.army[unitId].cost[idx]).toString()
    ).send(contractOptions));

    count += 1;
    contractOptions.count = count;
  });

  await Promise.all(approvals);


  // Second, train!

  const contractInstanceArmy = new eth.Contract(contractArmyAbi, addresses.army[unitId].address);

  return contractInstanceArmy.methods.train().send(contractOptions)
  // .once('sending', function(payload){ 
  //   console.log(payload);
  //  })
  // .once('sent', function(payload){ 
  //   console.log(payload);
  //  })
  .once('transactionHash', function(hash){ 
    console.log(hash);
   })
  // .once('receipt', function(receipt){ console.log(receipt) })
  // .on('confirmation', function(confNumber, receipt, latestBlockHash){ 
  //   // console.log(confNumber);console.log(receipt);console.log(latestBlockHash); 
  //   // console.log(`transaction confirmation number ${confNumber}`);
  // })
  .on('error', function(error){ console.log(error) });
};