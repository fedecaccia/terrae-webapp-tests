import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";
import { useState } from "react";

const Exchange = () => {

  const userAddress = "0xsdf87sdhf8sd8fhs8fs8df8sdf";

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

      <Header userAddress={userAddress} toogleSidebar={toogleSidebar} expanded={expandedSidebar}/>

      <main className="flex flex-row h-screen">
        <Sidebar expanded={expandedSidebar} selected={"EXCHANGE"}/>
        <ExchangeWidget address={userAddress}/>
      </main>
    </div>
  );
};

export default Exchange;
