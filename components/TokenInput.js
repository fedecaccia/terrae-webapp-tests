import Image from "next/image";

function TokenInput({
  value,
  inputRef,
  onChangeValue,
  maxBalance,
  setMax,
  symbol,
  isFrom,
  iconSource
}) {
  return (
    <div className="flex flex-col h-[6em] justify-evenly rounded-lg bg-gray w-full baseText py-2">
      
      <div className="flex flex-row justify-between px-5">
        <div className="text-left">
          <p>{isFrom ? "From" : "To"}</p>
        </div>
        <div className="text-right">
          <p>Balance: {maxBalance}</p>
        </div>
      </div>
        
      <div className="flex flex-row justify-between text-right px-5">

        <div>
          <input
            style={{ width: "150px", "text-align": "left", "border-radius": 5 }}
            ref={inputRef}
            type="number"
            value={value}
            onChange={(newValue) => onChangeValue(newValue.currentTarget.value)}
            className="focus:outline-none bg-gray flex-grow"
            placeholder={0}
          />
        </div>

        <div className="flex flex-row justify-end items-center">
          {
          isFrom && 
          <p className="text-iris-light pr-2 cursor-pointer"
            onClick={setMax}>{"MAX"}
          </p>
          }

          <Image
            className="px-2"
            src={iconSource}
            width={25}
            height={25}
            layout="fixed"
            alt=""
          />
          <p className="pl-2">{symbol}</p>
        </div>        


      </div>
    </div>
  )
}

export default TokenInput
