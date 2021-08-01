import Image from "next/image";
import TerraeButton from "./TerraeButton";
import { useState } from "react";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';
import { train } from "../web3/army";
import updateWeb3UserInfo from "../web3/balances";
import { useToasts } from "react-toast-notifications";

function ArmyShow({ result }) {
  const userWeb3 = useWeb3();
  const dispatch = useDispatchWeb3();

  const { addToast } = useToasts();

  const getResourceImageFromSymbol = symbol => {
    if (symbol.toLowerCase() === "tgld"){
      return "/resources/gold.png";
    }
    if (symbol.toLowerCase() === "temr"){
      return "/resources/emerald.png";
    }
    if (symbol.toLowerCase() === "trby"){
      return "/resources/ruby.png";
    }
    if (symbol.toLowerCase() === "tspp"){
      return "/resources/sapphire.png";
    }
  }

  return (
    <div className="flex justify-center mt-1">
      <div className="flex flex-col gap-y-3 bg-gray-dark rounded-xl cursor-pointer transition transform hover:-translate-y-1">
        <Image
          className="rounded-xl"
          objectFit="cover"
          src={result.image}
          width={180*1.25}
          height={140*1.25}
          layout="fixed"
          alt=""
        />

        <div className="flex flex-row justify-between items-center px-2">
          <div>
            <p className="baseText text-gray-lightest ">
              {result.id}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-left px-2 gap-5">
          {result.cost.map(c => {
            return <div className="flex flex-row items-center justify-center">
              <Image
                className=""
                objectFit="cover"
                src={getResourceImageFromSymbol(c.resource)}
                width={25}
                height={25}
                layout="fixed"
                alt=""
              />
              <p className="pl-1 addressText text-gray-lightest">{c.amount}</p>
            </div>
            })}
        </div>

        <div className="flex flex-row justify-between items-center px-2 mediumText text-gray-lightest ">
          <p className="addressText text-gray-lightest">Power: {result.power} - Health: {result.health}</p>
        </div>

        <TerraeButton
          isPrimary
          text="Train"
          enabled
          extraClass="mx-2 mb-3 h-8"
          onClick={async ()=>{
            try{
              addToast("Processing... please wait", { appearance: "info", autoDismissTimeout: "30000" });
              await train({ unitId: result.id, userAddress: userWeb3.address });
              addToast(`Unit trained!`, { appearance: "success" });
              await updateWeb3UserInfo(dispatch);
            } catch(err) {
              console.log(err);
              addToast(`Train couldn't be completed`,{
                appearance: "error"
              });
            }
          }}
        />

      </div>
    </div>
  )
}

export default ArmyShow
