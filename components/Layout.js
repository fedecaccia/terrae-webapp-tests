import Head from "next/head";
import Header from "../components/Header";
import { useEffect } from "react";
import askMetamaskConnection from "../web3/connection";
import updateWeb3UserInfo from "../web3/balances";
import { updateDenarisPrice } from "../web3/exchange";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';

const Layout = ({ children, extraClass }) => {
  const userWeb3 = useWeb3();
  const dispatch = useDispatchWeb3();

  useEffect(async () => {
    let connected = await askMetamaskConnection({ userWeb3, dispatch });
    if (connected) {
      await updateWeb3UserInfo( dispatch );
      await updateDenarisPrice( dispatch );
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      ethereum.on('accountsChanged', async (accounts) => {
        await updateWeb3UserInfo( dispatch );
      });

      ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    }
  }, []);  
  
  return (
    <div className={`${extraClass}`}>
      <Head>
        <title>Terrae</title>
        <link rel="icon" href="/TerraeIconBlack.jpg" />
      </Head>

      <Header/>

      <main className="flex flex-row">        
        {children}
      </main>
    </div>
  );
};

export default Layout;
