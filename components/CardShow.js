import Image from "next/image";
import TerraeButton from "./TerraeButton";
import { useRef, useState } from "react";

function CardShow({ result }) {
  console.log(result);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(1);

  return (
    <div className="flex w-225">
      <div className="flex flex-col gap-3 bg-gray-dark rounded-xl cursor-pointer transition transform hover:-translate-y-1 ">
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

        <div className="flex flex-row justify-between items-center px-2 mediumText text-gray-lightest ">
           <input
            style={{ width: "150px", "text-align": "right", "border-radius": 5 }}
            ref={inputRef}
            type="number"
            value={inputValue}
            onChange={(newValue) => setInputValue(newValue.currentTarget.value)}
            className="focus:outline-none bg-gray flex-grow"
          />
        </div>

        <TerraeButton
          isPrimary
          text="stake"
          enabled={inputValue>0 && true}
          extraClass="mx-2 mb-3 h-8"
          onClick={()=>console.log("click!")}
        />


      </div>
    </div>
  )
}

export default CardShow
