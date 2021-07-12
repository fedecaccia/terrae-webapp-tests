import Web3 from "web3";

const provider = () => {
  // If the user has MetaMask:
  if (typeof web3 !== 'undefined') {
    return web3.currentProvider
  } else {
    console.error("You need to install MetaMask for this app to work!")
  }
}

const userProvider = new Web3(provider());

export const eth = userProvider.eth;