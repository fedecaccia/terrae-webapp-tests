import {
  FlagIcon,
  ScaleIcon,
  BeakerIcon,
  GiftIcon,
} from "@heroicons/react/outline";
import {
  LibraryIcon,
  SwitchHorizontalIcon,
  PhotographIcon,
  FireIcon,
} from "@heroicons/react/solid";
import SidebarRow from "./SidebarRow";

const Sidebar = ({ expanded }) => {

  return (
    <div className={`pt-7 pb-2 max-w-[600px] 
      ${expanded && "xl:min-w-[300px]"}
      h-full mb-5
      bg-gray-dark border-r-[1px] border-gray-border transition duration-300`
    }>
      
      <SidebarRow expanded={expanded} Icon={LibraryIcon} title="Home" />
      <SidebarRow expanded={expanded} Icon={SwitchHorizontalIcon} title="Exchange" isActive/>
      <SidebarRow expanded={expanded} Icon={PhotographIcon} title="Lands" />
      <SidebarRow expanded={expanded} Icon={FlagIcon} title="Army" />
      <SidebarRow expanded={expanded} Icon={FireIcon} title="Battle" />
      <SidebarRow expanded={expanded} Icon={ScaleIcon} title="Marketplace" />
      <SidebarRow expanded={expanded} Icon={BeakerIcon} title="Alchemy" />
      <SidebarRow expanded={expanded} Icon={GiftIcon} title="Coffers" />
      
    </div>
  );
};

export default Sidebar;
