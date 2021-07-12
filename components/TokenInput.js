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
    <div className="flex flex-row h-[6em] justify-between rounded-lg bg-gray w-full baseText py-2">
      <div className="flex flex-col justify-evenly text-left px-5">
        <div>
          <p>{isFrom ? "From" : "To"}</p>
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
          <p >Balance: {maxBalance}</p>
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
