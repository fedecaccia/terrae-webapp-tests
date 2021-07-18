import abi from "./abi";
import { eth } from './provider';

const pancakeRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
const denarisAddress = "0xb1c7bC091BE121af3Bf53a37ef21287D61Dfe697";
const wbnbAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

const routerAddress = pancakeRouter;
const ETH_DECIMALS = 18;
const DENARIS_DECIMALS = 6;

import contractPancakeRouterAbi from "./uniswapV2Router02Abi";

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
    gasLimit: "0x989680",
    gasPrice: "0x4A817C800", // default will use web3.eth.getGasPrice(), // 20000000000 (20 gwei)
    nonce: toHex(count), // default will use web3.eth.getTransactionCount()
    // chainId: 1, // default will use web3.eth.net.getId()
  }

  return contractInstance.methods.swapExactETHForTokens(
    options.swapExactETHForTokens.amountOutMin,
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