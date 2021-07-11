function Switch({
  option1,
  onOption1,
  option2,
  onOption2,
  option1Selected
}) {
  return (
    <div className="flex flex-row rounded-full h-8 bg-gray-lightest text-iris border-1 border-iris justify-center justify-items-center">
      <div onClick={onOption1} className={`cursor-pointer items-center  pl-4 rounded-full ${option1Selected ? "pr-4 bg-iris text-gray-lightest" : "pr-2 "}`}>
        <text className="baseText sm:baseText xl:baseText align-middle">{option1}</text>
      </div>
      <div onClick={onOption2} className={`cursor-pointer items-center pr-4 rounded-full ${!option1Selected ? "pl-4 bg-iris text-gray-lightest" : "pl-2"}`}>
        <text className="baseText sm:baseText xl:baseText align-middle">{option2}</text>
      </div>
    </div>
  )
}

export default Switch;