import Image from "next/image";
import TerraeButton from "./TerraeButton";
import { useState } from "react";

function ArmyShow({ result }) {

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
          <div className="flex flex-row items-center justify-center">
            {result.cost.forEach(c => {
              return <div>
                <Image
                className=""
                objectFit="cover"
                src={`/resources/${result.resource}.png`}
                width={25}
                height={25}
                layout="fixed"
                alt=""
              />
              <p className="pl-1 addressText text-gray-lightest">{c.amount}</p>
              </div>
            })}
            
          </div>
        </div>

        <div className="flex flex-row justify-between items-center px-2 mediumText text-gray-lightest ">
          <p className="pl-1 addressText text-gray-lightest">Power: {result.power} - Health: {result.health}</p>
        </div>

        <TerraeButton
          isPrimary
          text="Train"
          enabled
          extraClass="mx-2 mb-3 h-8"
          onClick={()=>console.log("click!")}
        />


      </div>
    </div>
  )
}

export default ArmyShow
