import abi from "./abi";
import { eth } from './provider';

const pancakeRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
const denarisAddress = "0xb1c7bC091BE121af3Bf53a37ef21287D61Dfe697";
const wbnbAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
const denarisETHPairAddress = "0x814346FcAD3c4DB287fc6C1853c840ebE6F17A65";

const routerAddress = pancakeRouter;
const ETH_DECIMALS = 18;
const DENARIS_DECIMALS = 6;

import contractDenarisAbi from "./abi";
import contractPancakeRouterAbi from "./uniswapV2Router02Abi";
import contractPairAbi from "./contractPairAbi";

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
const ethToWei = eth => (eth*10**ETH_DECIMALS);
const denarisToWei = denaris => (denaris*10**DENARIS_DECIMALS);

export const updateDenarisPrice = async ( dispatch ) => {

  const contractInstance = new eth.Contract(contractPairAbi, denarisETHPairAddress);

  let reserves = await contractInstance.methods.getReserves().call();
  let amountETH = Math.min(reserves._reserve0, reserves._reserve1);
  let amountDenaris = Math.max(reserves._reserve0, reserves._reserve1);
  let price = amountETH/amountDenaris;
  dispatch({ 
    type: "UPDATE_DENARIS_PRICE",
    payload: price
  })
};

export const swapExactETHForTokens = async ( userWeb3, dispatch, options ) => {

  const myAddress = options.from;

  // const contractInstanceAddress = web3.utils.toChecksumAddress(options.routerAddress);
  const contractInstance = new eth.Contract(contractPancakeRouterAbi, routerAddress);
  const count = await eth.getTransactionCount(myAddress);

  // First, no need to give allowance!

  // Second, swap!

  const contractOptions = {
    from: myAddress,
    value: toHex(ethToWei(options.swapExactETHForTokens.amountETH)),
    // gasLimit: "0x30D40",
    gasLimit: "0xFFD40",
    // gasPrice: "0x12A05F200", // default will use web3.eth.getGasPrice(), // 5000000000 (5 gwei)
    gasPrice: "0x4A817C800", // default will use web3.eth.getGasPrice(), // 20000000000 (20 gwei)
    nonce: toHex(count), // default will use web3.eth.getTransactionCount()
    // chainId: 1, // default will use web3.eth.net.getId()
  }

  return contractInstance.methods.swapExactETHForTokens(
    denarisToWei(options.swapExactETHForTokens.amountOutMin),
    [
      wbnbAddress,
      denarisAddress,
    ],
    myAddress,
    options.swapExactETHForTokens.deadline
  ).send(contractOptions)
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

export const swapExactTokensForETH = async ( userWeb3, dispatch, options ) => {

  const myAddress = options.from;

  // const contractInstanceAddress = web3.utils.toChecksumAddress(options.routerAddress);
  const tokenContractInstance = new eth.Contract(contractDenarisAbi, denarisAddress);
  const contractInstance = new eth.Contract(contractPancakeRouterAbi, routerAddress);
  const count = await eth.getTransactionCount(myAddress);

  // First, give allowance to router

  let contractOptions = {
    from: options.from,
    value: "0x00",
    // gasLimit: "0x30D40",
    gasLimit: "0xFFD40",
    // gasPrice: "0x12A05F200", // default will use web3.eth.getGasPrice(), // 5000000000 (5 gwei)
    gasPrice: "0x4A817C800", // default will use web3.eth.getGasPrice(), // 20000000000 (20 gwei)
    nonce: toHex(count), // default will use web3.eth.getTransactionCount()
    // chainId: 1, // default will use web3.eth.net.getId()
  }
  let res = await tokenContractInstance.methods.approve(
    routerAddress,
    denarisToWei(options.swapExactTokensForETH.amountToken)
  ).send(contractOptions);

  console.log(res);

  // Second, swap!

  contractOptions = {
    from: myAddress,
    value: "0x00",
    // gasLimit: "0x30D40",
    gasLimit: "0xFFD40",
    // gasPrice: "0x12A05F200", // default will use web3.eth.getGasPrice(), // 5000000000 (5 gwei)
    gasPrice: "0x4A817C800", // default will use web3.eth.getGasPrice(), // 20000000000 (20 gwei)
    nonce: toHex(count+1), // default will use web3.eth.getTransactionCount()
    // chainId: 1, // default will use web3.eth.net.getId()
  }

  return contractInstance.methods.swapExactTokensForETH(
    denarisToWei(options.swapExactTokensForETH.amountToken),
    ethToWei(options.swapExactTokensForETH.amountETHMin),
    [
      denarisAddress,
      wbnbAddress,
    ],
    myAddress,
    options.swapExactTokensForETH.deadline
  ).send(contractOptions)
  // .once('sending', function(payload){ console.log(payload) })
  .once('sent', function(payload){ console.log(payload) })
  // .once('transactionHash', function(hash){ console.log(hash) })
  // .once('receipt', function(receipt){ console.log(receipt) })
  // .on('confirmation', function(confNumber, receipt, latestBlockHash){ console.log(confNumber);console.log(receipt);console.log(latestBlockHash); })
  // .on('error', function(error){ console.log(error) })
};