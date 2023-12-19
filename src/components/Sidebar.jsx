import React, { useEffect, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Tabs from "@radix-ui/react-tabs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { BiHomeAlt2, BiSearch, BiLibrary } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { GiMusicSpell } from "react-icons/gi";
import { PiMusicNotesPlus } from "react-icons/pi";
import { FiFolderPlus } from "react-icons/fi";

//ssssssimport musicicon from "../assets/music-play-svgrepo-com.svg";
import { post } from "../HttpService/http_service";
import { useUserLoginData } from "../hooks/useUserLoginData";
import PlayListButton from "./PlayListButton";
import { useGetPlayListsofUser } from "../hooks/useGetPlayListsofUser";
import { useAuth0 } from "@auth0/auth0-react";
const loadingloop = new Array(3);
for (let i = 0; i < 3; i++) {
  loadingloop[i] = i;
}
// user need to sign in dialogue
import SignInDialog from "./Dialogs/SignInDialog";
import AddToast from "./AddToast";
import PlayListButtonLoading from "./animations/PlayListButtonLoading";
import PlayListFolderButton from "./PlayListFolderButton";
import { useGetPlayListFolderofUser } from "../hooks/useGetPlayListFolderofUser";
const playListName = "My Playlist #";
const folderName = "New Folder"
function Sidebar() {
  // --- to open dialog that the user need to sign in
  const [open, setOpen] = useState(false);
  const [toastmessage, setToastmessage] = useState("");
  const [toastOpen, setToastOpen] = useState("");
  const [hideToolTip, sethideToolTip] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // --- end

  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const location = useLocation();
  const { userId, isSignedIn } = useUserLoginData();
  // to get the playList of the user
  const { playLists, playListLength, setPlayListLength, setReload } =
    useGetPlayListsofUser(userId, isSignedIn);
  // to get the playlist folders of the user
  const {
    playListFolders,
    playListFoldersLength,
    setPlayListFoldersLength,
    setReloadFolder,
  } = useGetPlayListFolderofUser(userId, isSignedIn);
  console.log(playListFolders);
  async function createPlaylist() {
    if (!user) {
      handleOpen();
      console.log("no user account");
    }
    //const {data, isLoading()}
    if (userId && isSignedIn) {
      const data = {
        userid: userId,
        name: `${playListName}${playListLength}`,
      };
      const res = await post("/createplaylist", data);
      setToastmessage("Playlist created");
      setToastOpen(true);
      console.log(res);
      setReload((prev) => prev + 1);
    }
  }
  async function createPlayListFolder() {
    if (!user) {
      handleOpen();
      console.log("no user account");
    }
    if(userId && isSignedIn) {
      const data = {
        userid: userId,
        name: `${folderName}`
      }
      const res = await post("/createfolder", data)
      setToastmessage("Folder created")
      setToastOpen(true)
      setReloadFolder(prev => prev + 1)
    }
  }

  return (
    <div
      id="side-bar"
      className="hidden sm:block w-[400px] sticky h-screen top-0 text-center p-2 bg-gray-950 text-slate-100 border-r-2 border-gray-900"
    >
      <AddToast open={toastOpen} setOpen={setToastOpen} name={toastmessage} />
      <SignInDialog
        open={open}
        handlePlayListClose={handleClose}
        title={"Create a PlayList"}
        description={"Login to create a playlist"}
      />
      <div className="max-w-xs">
        <div className="mb-4 ">
          <GiMusicSpell className="h-10 w-10" />
        </div>
        <Link to={"/"}>
          <div
            className={`py-2 px-2 mb-1 flex flex-row items-center rounded-md duration-300 cursor-pointer text-lg hover:bg-gray-900 hover:text-cyan-500 ${
              location.pathname === "/" ? "bg-gray-900 text-cyan-500" : ""
            }`}
          >
            <BiHomeAlt2 className="h-7 w-7" />
            <span className="ml-3">Home</span>
          </div>
        </Link>
        <Link to={"/search"}>
          <div
            className={`py-2 px-2 mb-1 flex flex-row items-center rounded-md duration-300 cursor-pointer text-lg hover:bg-gray-900 hover:text-cyan-500 ${
              location.pathname === "/search" ? "bg-gray-900 text-cyan-500" : ""
            }`}
          >
            <BiSearch className="w-7 h-7" />
            <span className="ml-3">Search</span>
          </div>
        </Link>

        <div
          className={`py-2 flex flex-row items-center rounded-md justify-between duration-300 cursor-pointer text-lg hover:bg-gray-900 hover:text-cyan-500 ${
            location.pathname === "" ? "" : ""
          }`}
        >
          <div className="px-2 flex flex-row items-end">
            <BiLibrary className="w-7 h-7" />
            <span className="ml-3">Your library</span>
          </div>
          <div className="flex items-center">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="outline-none">
                  <AiOutlinePlus id="plus-button" className="w-5 h-5 mr-2" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[220px]  bg-gray-900 text-slate-50 rounded-md p-[5px]  data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  sideOffset={12}
                  alignOffset={-10}
                  collisionPadding={5}
                  align="start"
                >
                  <DropdownMenu.Item
                    onClick={() => createPlaylist()}
                    className="flex gap-3 items-center outline-none px-3 py-2 rounded-md hover:bg-gray-800 cursor-default"
                  >
                    <PiMusicNotesPlus className="h-5 w-5" />
                    Create a new playlist
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => createPlayListFolder()} className="flex gap-3 items-center outline-none px-3 py-2 rounded-md hover:bg-gray-800 cursor-default">
                    <FiFolderPlus className="h-5 w-5" />
                    Create a playlist folder
                  </DropdownMenu.Item>
                  {/* <DropdownMenu.Arrow className="fill-gray-900" /> */}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
        {isLoading || user ? (
          // <div className={`py-2 flex flex-row items-center justify-between`}>
          //   <div className="text-xs bg-gray-800 rounded-xl px-2 py-1 font-semibold">
          //     Playlists
          //   </div>
          // </div>
          <Tabs.Root className="py-2 flex flex-col w-full" defaultValue="tab1">
            <Tabs.List className="flex gap-3">
              <Tabs.Trigger
                className="text-xs bg-gray-800 rounded-xl px-2 py-1 font-semibold data-[state=active]:text-cyan-500"
                value="tab1"
              >
                Playlists
              </Tabs.Trigger>
              <Tabs.Trigger
                className="text-xs bg-gray-800 rounded-xl px-2 py-1 font-semibold data-[state=active]:text-cyan-500"
                value="tab2"
              >
                Folders
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="mt-2" value="tab1">
              <div className="max-h-[300px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-950 scrollbar-rounded-2">
                {playLists.map((playlistname, index) => {
                  return (
                    <PlayListButton
                      key={index}
                      id={playlistname._id}
                      name={playlistname.playListName}
                      username={"ghost"}
                    />
                  );
                })}
                {isLoading
                  ? loadingloop.map((data, index) => {
                      return <PlayListButtonLoading key={index} />;
                    })
                  : ""}
              </div>
            </Tabs.Content>
            <Tabs.Content className="mt-2" value="tab2">
              <div className="max-h-[300px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-950 scrollbar-rounded-2">
                {
                  playListFolders.map((playlistfolder, index) => {
                    return (
                      <PlayListFolderButton key={index} id={playlistfolder._id} name={playlistfolder.folderName} username={"ghost"} playlists={playlistfolder.playLists} />
                    )
                  })
                }
                {isLoading
                  ? loadingloop.map((data, index) => {
                      return <PlayListButtonLoading key={index} />;
                    })
                  : ""}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Sidebar;
