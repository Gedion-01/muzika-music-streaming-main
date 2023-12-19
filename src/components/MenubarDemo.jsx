import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";

const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

const MenubarDemo = () => {
  const [checkedSelection, setCheckedSelection] = React.useState([
    CHECK_ITEMS[1],
  ]);
  const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);

  return (
    <Menubar.Root className="flex w-10 bg-white p-[3px] rounded-md shadow-[0_2px_10px] shadow-blackA7">
      <Menubar.Menu>
        <Menubar.Trigger className="outline-none select-none font-medium leading-none rounded text-violet11 text-[13px] flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
          File
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-[220px] z-10 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity]"
            align="end"
            sideOffset={-7}
            alignOffset={0}
          >
            <Menubar.Item className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
              New Tab{" "}
              <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                ⌘ T
              </div>
            </Menubar.Item>
            <Menubar.Item className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
              New Window{" "}
              <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                ⌘ N
              </div>
            </Menubar.Item>
            <Menubar.Item
              className="text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none"
              disabled
            >
              New Incognito Window
            </Menubar.Item>
            <Menubar.Separator className="h-[1px] bg-violet6 m-[5px]" />
            <Menubar.Sub>
              <Menubar.SubTrigger className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
                Share
                <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>
              <Menubar.Portal>
                <Menubar.SubContent
                  className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity]"
                  alignOffset={-5}
                >
                  <Menubar.Item className="text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]::to-violet10 data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
                    Email Link
                  </Menubar.Item>
                  <Menubar.Item className="text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]::to-violet10 data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
                    Messages
                  </Menubar.Item>
                  <Menubar.Item className="text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]::to-violet10 data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
                    Notes
                  </Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className="h-[1px] bg-violet6 m-[5px]" />
            <Menubar.Item className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
              Print…{" "}
              <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                ⌘ P
              </div>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default MenubarDemo;
