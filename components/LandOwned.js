import Image from "next/image";
import TerraeButton from "./TerraeButton";
import { useRef, useState } from "react";
import { useWeb3 } from '../context/Web3';

function LandOwned({ result }) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(1);
  const userWeb3 = useWeb3();

  const deposited = userWeb3.deposited[result.id]
  const totalYield =deposited*result.hourlyYield;
  const accumulated = userWeb3.accumulated[result.id];

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-y-3 bg-gray-dark rounded-xl cursor-pointer transition transform hover:-translate-y-1">
        <Image
          className=""
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
              src={`/resources/${result.resource}.png`}
              width={25}
              height={25}
              layout="fixed"
              alt=""
            />
            <p className="pl-1 addressText text-gray-lightest">{result.hourlyYield*inputValue}/hr</p>   
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
              src={`/resources/${result.resource}.png`}
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
              src={`/resources/${result.resource}.png`}
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
          enabled={inputValue>0 && true}
          extraClass="mx-2 h-8"
          onClick={()=>console.log("click!")}
        />

        <TerraeButton
          isPrimary={false}
          text="Unstake"
          enabled={inputValue>0 && true}
          extraClass="mx-2 mb-3 h-8"
          onClick={()=>console.log("click!")}
        />


      </div>
    </div>
  )
}

export default LandOwned
