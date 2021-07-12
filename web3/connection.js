import askMetamaskDisconnection from "./disconnection";

const chains = {
  mainnet: "0x1",
  ropsten: "0x3",
  rinkeby: "0x4",
  goerli: "0x5",
  kovan: "0x2a",
  binance: "56",
  tbinance: "97",
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

  if (ethereum.chainId !== chains.rinkeby) {
    try{
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chains.rinkeby }],
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