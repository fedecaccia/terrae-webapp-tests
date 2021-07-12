import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";
import { useState, useEffect } from "react";
import { eth } from '../web3/provider';
import { useWeb3, useDispatchWeb3 } from '../context/Web3';
import abi from "../web3/abi";

const denarisContractAddress = "0xb1c7bC091BE121af3Bf53a37ef21287D61Dfe697";
const denarisSymbol = "DENARIS";

const Home = () => {

  const [expandedSidebar, setExpandedSidebar] = useState(true);

  const toogleSidebar = () => {
    if (expandedSidebar === true) {
      setExpandedSidebar(false);
    } else {
      setExpandedSidebar(true);
    }
  }

  const userWeb3 = useWeb3()
  const dispatch = useDispatchWeb3()

  const handleAddress = (address) => {
    dispatch({
      type: 'UPDATE_ADDRESS',
      payload: address
    });
  }

  const handleBalance= (token, balance) => {
    dispatch({
      type: 'UPDATE_BALANCE',
      payload: { token, balance }
    });
  }

  const askMetamaskConnection = async () => {
    try {
      await ethereum.request({method: 'eth_requestAccounts'});
      console.log(`Chain id:  ${ethereum.chainId}`);
    } catch (err) {
      console.log(err);
      console.error("User denied access to their BNB addresses!")
    }
  }
  
  const getWeb3UserInfo = async () => {
    try{
      const addresses = await eth.getAccounts(); // Get user's ETH addresses
      handleAddress(addresses[0]);
      const bnbBalance = await eth.getBalance(addresses[0]);
      handleBalance("bnb", bnbBalance);
      const denarisInst = new eth.Contract(abi, denarisContractAddress)
      const denarisBalance = await denarisInst.methods.balanceOf(addresses[0]).call();
      handleBalance("denaris", denarisBalance);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await askMetamaskConnection();
    await getWeb3UserInfo();
  }, []);
  
  return (
    <div className="h-screen 
    bg-home
    overflow-hidden">
      <Head>
        <title>Terrae</title>
        <link rel="icon" href="/TerraeIconBlack.jpg" />
      </Head>

      <Header userAddress={userWeb3.address} toogleSidebar={toogleSidebar} expanded={expandedSidebar}/>

      <main className="flex flex-row h-screen">
        <Sidebar expanded={expandedSidebar} selected={"HOME"}/>
        <ExchangeWidget address={userWeb3.address} bnbBalance={userWeb3.balances.bnb} denarisBalance={userWeb3.balances.denaris} />
      </main>
    </div>
  );
};

export default Home;
