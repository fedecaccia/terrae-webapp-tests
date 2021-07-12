function TerraeButton({ 
  isPrimary,
  text,
  enabled,
  extraClass,
  onClick
}) {
  return (
    <div className={`flex flex-row justify-center items-center rounded-lg px-5 py-2 cursor-pointer hover:bg-iris-light
      ${isPrimary && enabled && "bg-iris"} ${isPrimary && enabled && "text-gray-lightest"}
      ${!isPrimary && enabled && "bg-gray-lightest"} ${!isPrimary && enabled && "text-iris border-2 border-iris"}
      ${!enabled && "bg-gray"}
      ${extraClass}
    `}
    onClick={onClick}
    >
      <p className="mediumText align-middle">
        {text}
      </p>
    </div>
  )
}

export default TerraeButton
