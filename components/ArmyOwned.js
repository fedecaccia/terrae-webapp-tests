import Image from "next/image";
import TerraeButton from "./TerraeButton";
import { useState } from "react";

function ArmyOwned({ result }) {

  return (
    <div className="flex justify-center mt-1">
      <div className="flex flex-col gap-y-3 bg-gray-dark rounded-xl cursor-pointer transition transform hover:-translate-y-1 pb-3">
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
            <p className="baseText text-gray-lightest">
              {result.id}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center px-2 mediumText text-gray-lightest ">
          <p className="addressText text-gray-lightest">Power: {result.power} - Health: {result.health}</p>
        </div>

        <div className="flex flex-row justify-between items-center px-2 mediumText text-gray-lightest ">
          <p className="addressText text-gray-lightest">Matches: 12 - Won:11</p>
        </div>

        {/* <TerraeButton
          isPrimary
          text="Sell"
          enabled
          extraClass="mx-2 mb-3 h-8"
          onClick={()=>console.log("click!")}
        /> */}


      </div>
    </div>
  )
}

export default ArmyOwned
