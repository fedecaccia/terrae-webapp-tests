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

const Sidebar = () => {

  return (
    <div className="pt-7 pb-2 max-w-[600px] xl:min-w-[300px]
    h-full mb-5
    bg-gray-dark border-r-[1px] border-gray-border">
      
      <SidebarRow Icon={LibraryIcon} title="Home" />
      <SidebarRow Icon={SwitchHorizontalIcon} title="Exchange" />
      <SidebarRow Icon={PhotographIcon} title="Lands" />
      <SidebarRow Icon={FlagIcon} title="Army" />
      <SidebarRow Icon={FireIcon} title="Battle" />
      <SidebarRow Icon={ScaleIcon} title="Marketplace" />
      <SidebarRow Icon={BeakerIcon} title="Alchemy" />
      <SidebarRow Icon={GiftIcon} title="Coffers" />
      
    </div>
  );
};

export default Sidebar;
