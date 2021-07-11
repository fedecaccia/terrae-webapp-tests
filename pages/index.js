import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";

const Exchange = () => {

  const userAddress = "0xsdf87sdhf8sd8fhs8fs8df8sdf"
  
  return (
    <div className="h-screen bg-gray-darkest overflow-hidden">
      <Head>
        <title>Terrae</title>
        <link rel="icon" href="/TerraeIconBlack.jpg" />
      </Head>

      <Header address={userAddress} />

      <main className="flex flex-row h-screen">
        <Sidebar />
        <ExchangeWidget address={userAddress}/>
      </main>
    </div>
  );
};

export default Exchange;
