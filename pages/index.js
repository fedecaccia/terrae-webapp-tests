import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";
import { useState, useEffect } from "react";
import { eth } from '../web3/provider' 


const Home = () => {

  const [expandedSidebar, setExpandedSidebar] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  const [userBNBBalance, setUserBNBBalance] = useState(0);

  const toogleSidebar = () => {
    if (expandedSidebar === true) {
      setExpandedSidebar(false);
    } else {
      setExpandedSidebar(true);
    }
  }


  const askMetamaskConnection = async () => {
    try {
      await ethereum.request({method: 'eth_requestAccounts'})
      const addresses = await eth.getAccounts(); // Get user's ETH addresses
      setUserAddress(userAddress);
      const balance = await eth.getBalance(addresses[0]);
      setUserBNBBalance(balance);
    } catch (err) {
      console.log(err);
      console.error("User denied access to their ETH addresses!")
    }
  }

  useEffect(async () => await askMetamaskConnection(), [])
  
  
  return (
    <div className="h-screen 
    bg-home
    overflow-hidden">
      <Head>
        <title>Terrae</title>
        <link rel="icon" href="/TerraeIconBlack.jpg" />
      </Head>

      <Header userAddress={userAddress} toogleSidebar={toogleSidebar} expanded={expandedSidebar}/>

      <main className="flex flex-row h-screen">
        <Sidebar expanded={expandedSidebar} selected={"HOME"}/>
        <ExchangeWidget address={userAddress}/>
      </main>
    </div>
  );
};

export default Home;
