function TerraeButton({ 
  isPrimary,
  text,
  enabled,
  extraClass,
  onClick
}) {
  return (
    <div className={`flex flex-row justify-center rounded-lg px-5 py-2 cursor-pointer
      ${isPrimary && enabled && "bg-iris"} ${isPrimary && enabled && "text-gray-lightest"}
      ${!isPrimary && enabled && "bg-gray-lightest"} ${!isPrimary && enabled && "text-iris border-2 border-iris"}
      ${!enabled && "bg-gray"}
      ${extraClass}
    `}
    onClick={onClick}
    >
      <text className="mediumText align-middle">
        {text}
      </text>
    </div>
  )
}

export default TerraeButton
