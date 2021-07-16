function PageDescription({ description, extraClass }) {
  const getText = () => {
    switch(description) {
      case "LANDS_FARM_TAB":
        return "Stake denaris on lands to mine resources";
      case "LANDS_OWNED_TAB":
        return "My Kingdom";
      case "ARMY_TRAIN_TAB":
        return "Recruite warriors for your army";
      case "ARMY_OWNED_TAB":
        return "My Army";
      default:
        return "Page Description"
    }
  }

  return (
    <div className={`flex flex-row items-start justify-start largeText text-gray-lightest ${extraClass}`}>
      <p>{getText()}</p>
    </div>
  )
}

export default PageDescription
