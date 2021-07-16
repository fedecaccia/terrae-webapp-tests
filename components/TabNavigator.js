function TabNavigator({
  options,
  onOptions,  
  optionSelected
}) {

  const getComponents = () => (
    options.map((option, index) => (
      <div key={index} onClick={onOptions[index]} className={`flex h-8 justify-center cursor-pointer transition duration-300 items-center pl-4 rounded-full ${optionSelected === option ? "pr-4 bg-iris text-gray-lightest" : "pr-4 "}`}>
        <p className="baseText sm:baseText xl:baseText align-middle">{option}</p>
      </div>
    )
  ))

  return (
    <div className="flex flex-row rounded-full h-8 bg-gray-lightest text-iris border-1 border-iris justify-center items-center">
      {getComponents()}
    </div>
  )
}

export default TabNavigator;