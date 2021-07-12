const chains = {
  mainnet: "0x1",
  ropsten: "0x3",
  rinkeby: "0x4",
  goerli: "0x5",
  kovan: "0x2a",
}

const askMetamaskConnection = async ({ userWeb3, dispatch }) => {
  if(userWeb3.chainId === null){
    try {
      await ethereum.request({method: 'eth_requestAccounts'});
      console.log(`Chain id:  ${ethereum.chainId}`);

      if (ethereum.chainId !== chains.rinkeby) {
        console.log("Please connect to the Rinkeby network");
      }

      dispatch({
        type: "UPDATE_CHAIN_ID", 
        payload: ethereum.chainId
      });

    } catch (err) {
      console.log(err);
      console.error("User denied access to their BNB addresses!")
    }
  } else {
    console.log("Trying to connect but user already connected")
  }
}

export default askMetamaskConnection;