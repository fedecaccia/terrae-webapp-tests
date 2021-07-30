import Image from "next/image";
import TerraeButton from "./TerraeButton";
import { useRef, useState, useEffect } from "react";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';
import BigNumber from 'bignumber.js';
import { harvest, hasvestAndUnstake } from "../web3/farm";
import updateWeb3UserInfo from "../web3/balances";
import { useToasts } from "react-toast-notifications";

function LandOwned({ result }) {
  const userWeb3 = useWeb3();
  const dispatch = useDispatchWeb3();

  const { addToast } = useToasts();
  

  const weiToETH = wei => (wei/10**18)

  const deposited = weiToETH(userWeb3.deposited[result.id])
  const totalYield = BigNumber(deposited).multipliedBy(result.hourlyYield).toString();//.toFixed(4);
  const hourlyYield = BigNumber(result.hourlyYield).toString();//.toFixed(4);
  const accumulated = BigNumber(weiToETH(userWeb3.accumulated[result.id][result.resource.toLowerCase()])).toFixed(4);

  const [buttonsEnabled, setButtonsEnabled] = useState(accumulated>0);

  // useEffect(() => {
  //   setButtonsEnabled(true);
  // }, []);

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

        <div className="flex flex-row justify-between items-center px-2">
          <div>
            <p className="addressText text-gray-lightest ">
              Unit yield
            </p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <Image
              className=""
              objectFit="cover"
              src={result.resourceImage}
              width={25}
              height={25}
              layout="fixed"
              alt=""
            />
            <p className="pl-1 addressText text-gray-lightest">{hourlyYield}/hr</p>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center px-2">
          <div>
            <p className="addressText text-gray-lightest ">
              Deposited
            </p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <Image
              className=""
              objectFit="cover"
              src={`/denaris.png`}
              width={25}
              height={25}
              layout="fixed"
              alt=""
            />
            <p className="pl-1 addressText text-gray-lightest">{deposited}</p>   
          </div>
        </div>
        
        <div className="flex flex-row justify-between items-center px-2">
          <div>
            <p className="addressText text-gray-lightest ">
              Total yield
            </p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <Image
              className=""
              objectFit="cover"
              src={result.resourceImage}
              width={25}
              height={25}
              layout="fixed"
              alt=""
            />
            <p className="pl-1 addressText text-gray-lightest">{totalYield}/hr</p>   
          </div>
        </div>

        <div className="flex flex-row justify-between items-center px-2">
          <div>
            <p className="addressText text-gray-lightest ">
              Accumulated
            </p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <Image
              className=""
              objectFit="cover"
              src={result.resourceImage}
              width={25}
              height={25}
              layout="fixed"
              alt=""
            />
            <p className="pl-1 addressText text-gray-lightest">{accumulated}</p>   
          </div>
        </div>

        <TerraeButton
          isPrimary
          text="Harvest"
          enabled={buttonsEnabled}
          extraClass="mx-2 h-8"
          onClick={async ()=>{
            setButtonsEnabled(false);
            try{
              addToast("Processing... please wait", { appearance: "info", autoDismissTimeout: "30000" });
              await harvest({ farmId: result.id, userAddress: userWeb3.address });
              addToast(`You have received new tokens!`, { appearance: "success" });
              await updateWeb3UserInfo(dispatch);
              setButtonsEnabled(accumulated>0);
            } catch(err) {
              console.log(err);
              addToast(`Harvest couldn't be completed`,{
                appearance: "error"
              });
              setButtonsEnabled(accumulated>0);
            }
          }}
        />

        <TerraeButton
          isPrimary={false}
          text="Unstake"
          enabled={buttonsEnabled}
          extraClass="mx-2 mb-3 h-8"
          onClick={async ()=>{
            setButtonsEnabled(false);
            try{
              addToast("Processing... please wait", { appearance: "info", autoDismissTimeout: "30000" });
              await harvestAndUnstake({ farmId: result.id, userAddress: userWeb3.address, amount: accumulated });
              addToast(`You have received new tokens!`, { appearance: "success" });
              await updateWeb3UserInfo(dispatch);
              setButtonsEnabled(deposited>0);
            } catch(err) {
              console.log(err);
              addToast(`Harvest couldn't be completed`,{
                appearance: "error"
              });
              setButtonsEnabled(deposited>0);
            }
          }}
        />


      </div>
    </div>
  )
}

export default LandOwned
