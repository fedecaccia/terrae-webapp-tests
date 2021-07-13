import askMetamaskDisconnection from "./disconnection";

const chains = {
  mainnet: "0x1",
  ropsten: "0x3",
  rinkeby: "0x4",
  goerli: "0x5",
  kovan: "0x2a",
  binance: "0x38", //56
  tbinance: "0x61", // 97
}

const askMetamaskConnection = async ({ userWeb3, dispatch }) => {
  if(userWeb3.chainId === null){
    try {
      await ethereum.request({method: 'eth_requestAccounts'});
    } catch (err) {
      console.log(err);
      console.error("User denied access to their BNB addresses!");
      askMetamaskDisconnection(dispatch);
      return false;
    }
  }

  if (ethereum.chainId !== chains.tbinance) {
    try{
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chains.tbinance,
          nativeCurrency: {
            name: "Binance",
            symbol: "BNB",
            decimals: 18,
          },
          chainName: "Binance Smart Chain Testnet",
          blockExplorerUrls: ["https://testnet.bscscan.com"],
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          // iconUrls: [""]
        }],
      });
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chains.tbinance }],
      });
    } catch(err) {
      console.log(err);
      console.log("User denied network chain change");
      askMetamaskDisconnection(dispatch);
      return false;
    }
  }

  dispatch({
    type: "UPDATE_CHAIN_ID", 
    payload: ethereum.chainId
  });

  return true;
}

export default askMetamaskConnection;