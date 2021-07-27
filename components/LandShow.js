import Image from "next/image";
import TerraeButton from "./TerraeButton";
import { useRef, useState } from "react";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';
import { harvestAndStake } from "../web3/farm";
import updateWeb3UserInfo from "../web3/balances";
import { useToasts } from "react-toast-notifications";

function LandShow({ result }) {
  const userWeb3 = useWeb3();
  const dispatch = useDispatchWeb3();

  const inputRef = useRef(null);
  const { addToast } = useToasts();
  const [inputValue, setInputValue] = useState(1);

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
            <p className="pl-1 addressText text-gray-lightest">{result.hourlyYield*inputValue}/hr</p>   
          </div>
        </div>

        <div className="flex flex-row justify-between items-center px-2 mediumText text-gray-lightest gap-1">
           <input
            style={{ width: "150px", "textAlign": "right", "borderRadius": 5 }}
            ref={inputRef}
            type="number"
            value={inputValue}
            onChange={(newValue) => setInputValue(newValue.currentTarget.value)}
            className="focus:outline-none bg-gray flex-grow"
          />
          <Image
            className=""
            objectFit="cover"
            src={"/denaris.png"}
            width={25}
            height={25}
            layout="fixed"
            alt=""
          />
        </div>

        <TerraeButton
          isPrimary
          text="stake"
          enabled={inputValue>0 && true}
          extraClass="mx-2 mb-3 h-8"
          onClick={async ()=>{
            setInputValue(0);
            try{
              addToast("Processing... please wait", { appearance: "info", autoDismissTimeout: "30000" });
              await harvestAndStake({ farmId: result.id, amount: inputValue, userAddress: userWeb3.address });
              addToast(`Success stake!`, { appearance: "success" });
              await updateWeb3UserInfo(dispatch);
            } catch(err) {
              console.log(err);
              addToast(`Stake couldn't be completed`,{
                appearance: "error"
              });
            }
          }}
        />


      </div>
    </div>
  )
}

export default LandShow
