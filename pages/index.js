import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";
import { useState, useEffect } from "react";
import askMetamaskConnection from "../web3/connection";
import updateWeb3UserInfo from "../web3/balances";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';

const Home = () => {
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
    await askMetamaskConnection({ userWeb3, dispatch });
    await updateWeb3UserInfo( dispatch );
  }, []);
  
  return (
    <div className="h-screen 
    bg-home
    overflow-hidden">
      <Head>
        <title>Terrae</title>
        <link rel="icon" href="/TerraeIconBlack.jpg" />
      </Head>

      <Header toogleSidebar={toogleSidebar} expanded={expandedSidebar}/>

      <main className="flex flex-row h-screen">
        <Sidebar expanded={expandedSidebar} selected={"HOME"}/>
        <ExchangeWidget address={userWeb3.address} bnbBalance={userWeb3.balances.bnb} denarisBalance={userWeb3.balances.denaris} />
      </main>
    </div>
  );
};

export default Home;
