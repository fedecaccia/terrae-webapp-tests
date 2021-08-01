import Switch from "./Switch";
import Image from "next/image";
import { useWeb3 } from '../context/Web3';
import BigNumber from 'bignumber.js';

function LandsHeader({ tabState, setTab }) {
  
  const userWeb3 = useWeb3();

  const weiToEth = (amount) => (BigNumber(amount).dividedBy(10**18).toFixed(2));

  const getPower = (resource) => {

    return userWeb3.hourlyPower[resource.toLowerCase()];
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center h-9">
      <Switch
        option1="Train"
        onOption1={() => setTab("train")}
        option2="My Army"
        onOption2={() => setTab("my army")}
        option1Selected={tabState==="train" ? true : false}
      />

      <div className="flex flex-row justify-end items-center bg-gray px-10 rounded-lg h-full
        addressText text-gray-lightest"
      >
        <div className="pr-5">
          <p>Balances:</p>
        </div>

        <div className="flex flex-row items-center justify-evenly pr-5">
          <Image
            className=""
            objectFit="cover"
            src={"/resources/emerald.png"}
            width={25}
            height={25}
            layout="fixed"
            alt=""
          />
          <p className="pl-1">{weiToEth(userWeb3.balances["temr"])}</p>
        </div>
        
        <div className="flex flex-row items-center justify-center pr-5">
          <Image
            className=""
            objectFit="cover"
            src={"/resources/gold.png"}
            width={25}
            height={25}
            layout="fixed"
            alt=""
          />
          <p className="pl-1">{weiToEth(userWeb3.balances["tgld"])}</p>
        </div>
        
        <div className="flex flex-row items-center justify-center pr-5">
        <Image
            className=""
            objectFit="cover"
            src={"/resources/ruby.png"}
            width={25}
            height={25}
            layout="fixed"
            alt=""
          />
          <p className="pl-1">{weiToEth(userWeb3.balances["trby"])}</p>
        </div>
        
        <div className="flex flex-row items-center justify-center">
        <Image
            className=""
            objectFit="cover"
            src={"/resources/sapphire.png"}
            width={25}
            height={25}
            layout="fixed"
            alt=""
          />
          <p className="pl-1">{weiToEth(userWeb3.balances["tspp"])}</p>
        </div>
      </div>
    </div>
  )
}

export default LandsHeader
