import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";
import { useState, useEffect } from "react";
import askMetamaskConnection from "../web3/connection";
import updateWeb3UserInfo from "../web3/balances";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';

const Exchange = () => {
  const [expandedSidebar, setExpandedSidebar] = useState(true);
  const userWeb3 = useWeb3();
  const dispatch = useDispatchWeb3();

  const toogleSidebar = () => {
    if (expandedSidebar === true) {
      setExpandedSidebar(false);
    } else {
      setExpandedSidebar(true);
    }
  }

  useEffect(async () => {
    let connected = await askMetamaskConnection({ userWeb3, dispatch });
    if (connected) await updateWeb3UserInfo( dispatch );
  }, []);
  
  return (
    <div className="h-screen 
    bg-exchange
    overflow-hidden">
      <Head>
        <title>Terrae</title>
        <link rel="icon" href="/TerraeIconBlack.jpg" />
      </Head>

      <Header userAddress={userWeb3.address} toogleSidebar={toogleSidebar} expanded={expandedSidebar}/>

      <main className="flex flex-row h-screen">
        <Sidebar expanded={expandedSidebar} selected={"EXCHANGE"}/>
        <ExchangeWidget address={userWeb3.address} bnbBalance={userWeb3.balances.bnb} denarisBalance={userWeb3.balances.denaris} />
      </main>
    </div>
  );
};

export default Exchange;
