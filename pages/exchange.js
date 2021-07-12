import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";
import { useState } from "react";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';

const Exchange = () => {

  const userWeb3 = useWeb3();

  const [expandedSidebar, setExpandedSidebar] = useState(true);

  const toogleSidebar = () => {
    if (expandedSidebar === true) {
      setExpandedSidebar(false);
    } else {
      setExpandedSidebar(true);
    }
  }
  
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
