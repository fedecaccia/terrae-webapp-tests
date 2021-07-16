import Switch from "./Switch";
import Image from "next/image";
import { useWeb3 } from '../context/Web3';

function LandsHeader({ tabState, setTab }) {
  
  const userWeb3 = useWeb3();

  const getPower = (resource) => {
    return userWeb3.hourlyPower[resource.toLowerCase()];
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center h-9">
      <Switch
        option1="Farm"
        onOption1={() => setTab("farm")}
        option2="Owned"
        onOption2={() => setTab("owned")}
        option1Selected={tabState==="farm" ? true : false}
      />

      <div className="flex flex-row justify-end items-center bg-gray px-10 rounded-lg h-full
        addressText text-gray-lightest"
      >
        <div className="pr-5">
          <p>My power:</p>
        </div>

        <div className="flex flex-row items-center justify-evenly pr-5">
          <Image
            className=""
            objectFit="cover"
            src={"/resources/esmerald.png"}
            width={25}
            height={25}
            layout="fixed"
            alt=""
          />
          <p className="pl-1">{getPower("esmerald")}/hr</p>
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
          <p className="pl-1">{getPower("gold")}/hr</p>
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
          <p className="pl-1">{getPower("ruby")}/hr</p>
        </div>
        
        <div className="flex flex-row items-center justify-center">
        <Image
            className=""
            objectFit="cover"
            src={"/resources/zafir.png"}
            width={25}
            height={25}
            layout="fixed"
            alt=""
          />
          <p className="pl-1">{getPower("zafir")}/hr</p>
        </div>
      </div>
    </div>
  )
}

export default LandsHeader
