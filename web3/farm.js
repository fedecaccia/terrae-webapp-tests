import { eth } from './provider';
import contractDenarisAbi from "./denarisAbi";
import contractFarmAbi from "./farmAbi";
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

export const harvest = async ({ farmId, userAddress }) => {
  const count = await eth.getTransactionCount(userAddress);

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

  const contractInstance = new eth.Contract(contractFarmAbi, addresses.farms[farmId].address);

  return contractInstance.methods.harvest().send(contractOptions)
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

export const harvestAndStake = async ({ farmId, amount, userAddress }) => {
  const count = await eth.getTransactionCount(userAddress);

  // First, give allowance to farm

  let contractOptions = {
    from: userAddress,
    value: "0x00",
    // gasLimit: "0x30D40",
    gasLimit: "0xFFD40",
    // gasPrice: "0x12A05F200", // default will use web3.eth.getGasPrice(), // 5000000000 (5 gwei)
    gasPrice: "0x4A817C800", // default will use web3.eth.getGasPrice(), // 20000000000 (20 gwei)
    nonce: toHex(count), // default will use web3.eth.getTransactionCount()
    // chainId: 1, // default will use web3.eth.net.getId()
  }
  const tokenContractInstance = new eth.Contract(contractDenarisAbi, denarisAddress);
  let res = await tokenContractInstance.methods.approve(
    addresses.farms[farmId].address,
    ethToWei(amount).toString()
  ).send(contractOptions);

  // Second, harvest and stake!

  contractOptions = {
    from: userAddress,
    value: "0x00",
    // gasLimit: "0x30D40",
    gasLimit: "0xFFD40",
    // gasPrice: "0x12A05F200", // default will use web3.eth.getGasPrice(), // 5000000000 (5 gwei)
    gasPrice: "0x4A817C800", // default will use web3.eth.getGasPrice(), // 20000000000 (20 gwei)
    nonce: toHex(count+1), // default will use web3.eth.getTransactionCount()
    // chainId: 1, // default will use web3.eth.net.getId()
  }

  const contractInstance = new eth.Contract(contractFarmAbi, addresses.farms[farmId].address);

  return contractInstance.methods.harvestAndStake(ethToWei(amount).toString()).send(contractOptions)
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

export const harvestAndUnstake = async ({ farmId, amount, userAddress }) => {
  const count = await eth.getTransactionCount(userAddress);

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

  const contractInstance = new eth.Contract(contractFarmAbi, addresses.farms[farmId].address);

  return contractInstance.methods.harvestAndUnstake(ethToWei(amount).toString()).send(contractOptions)
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