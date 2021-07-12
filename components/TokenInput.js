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
    <div className="flex flex-row h-[7em] justify-between rounded-lg bg-gray w-full baseText py-2">
      <div className="flex flex-col justify-evenly text-left px-5">
        <div>
          <text>{isFrom ? "From" : "To"}</text>
        </div>
        <div>
          <input
            width={25}
            ref={inputRef}
            type="number"
            value={value}
            onChange={(newValue) => onChangeValue(newValue.currentTarget.value)}
            className="focus:outline-none bg-gray flex-grow"
            placeholder={0}
          />
        </div>
      </div>
      <div className="flex flex-col justify-evenly text-right px-5">
        <div clas>
          <text >Balance: {maxBalance}</text>
        </div>
        <div className="flex flex-row justify-end items-center">
          {
          isFrom && 
          <text className="text-iris-light pr-2 cursor-pointer"
            onClick={setMax}>{"MAX"}
          </text>
          }

          <Image
            className="px-2"
            src={iconSource}
            width={25}
            height={25}
            layout="fixed"
            alt=""
          />
          <text className="pl-2">{symbol}</text>
        </div>
      </div>
    </div>
  )
}

export default TokenInput
