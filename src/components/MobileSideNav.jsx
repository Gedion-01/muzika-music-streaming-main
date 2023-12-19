import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";
// icon
import {GiMusicSpell} from "react-icons/gi"
import { BiHomeAlt2, BiSearch, BiLibrary } from "react-icons/bi";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
//
import { post } from "../HttpService/http_service";
import { useUserLoginData } from "../hooks/useUserLoginData";
import PlayListButton from "./PlayListButton";
import SignInDialog from "./Dialogs/SignInDialog";
import AddToast from "./AddToast";
import { useGetPlayListsofUser } from "../hooks/useGetPlayListsofUser";
const playListName = "My Playlist #";
import { useAuth0 } from "@auth0/auth0-react";

export default function MobileSideNav({ close, open }) {
  const location = useLocation();
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  // --- to open dialog that the user need to sign in
  const [openDialog, setOpenDialog] = useState(false);
  const [toastOpen, setToastOpen] = useState("")
  const [toastmessage, setToastmessage] = useState("");
  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  // --- end
  const { userId, isSignedIn } = useUserLoginData();
  // to get the playList of the user
  const { playLists, playListLength, setReload } = useGetPlayListsofUser(
    userId,
    isSignedIn
  );

  // async function createPlaylist() {
  //   //const {data, isLoading()}
  //   if (userId && isSignedIn) {
  //     const data = {
  //       userid: userId,
  //       name: `${playListName}${playListLength}`,
  //     };
  //     const res = await post("/createplaylist", data);
  //     console.log(res);
  //     setReload((prev) => prev + 1);
  //   }
  
  // }
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
      setToastmessage("Playlist created")
      setToastOpen(true)
      console.log(res);
      setReload((prev) => prev + 1);
    }
  }
  return (
    <>
    {/* <div className="fixed inset-0 z-40 w-full h-full bg-red-300"></div> */}
    <AddToast open={toastOpen} setOpen={setToastOpen} name={toastmessage} />
    <SignInDialog
        open={openDialog}
        handlePlayListClose={handleClose}
        title={"Create a PlayList"}
        description={"Login to create a playlist"}
        zindex={"z-30"}
      />
      <div
        id="side"
        className={`h-screen w-[100%] fixed inset-y-0 left-0 z-30 text-center bg-gray-950 bg-opacity-0 text-slate-100 transform  ${
          open ? "" : "-translate-x-full"
        }  transition duration-200 ease-out`}
      >
        <div className="max-w-[400px] px-2 py-2 bg-gray-950 h-screen">
        <div className="mb-4 flex flex-row justify-between w-full">
          <GiMusicSpell className="h-10 w-10" />
          <button
            id="close-mobile-sidebar"
            className="cursor-pointer hover:text-cyan-500 duration-300"
            onClick={close}
          >
            <IoIosClose className="w-10 h-10 text-right" />
          </button>
        </div>
        
        <Link to={"/"} onClick={close}>
          <div
            className={`py-2 px-2 mb-1 flex flex-row items-center rounded-md duration-300 cursor-pointer text-lg hover:bg-gray-900 hover:text-cyan-500 ${
              location.pathname === "/" ? "bg-gray-900 text-cyan-500" : ""
            }`}
          >
            <BiHomeAlt2 className="h-7 w-7" />
            <span className="ml-3">Home</span>
          </div>
        </Link>
        <Link to={"/search"} onClick={close}>
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
          <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="text-center">
                    <AiOutlinePlus
                      id="plus-button"
                      className="w-5 h-5 mr-2"
                      onClick={createPlaylist}
                    />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="z-30 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-gray-800 text-slate-100 px-[15px] py-[10px] text-[15px] leading-none will-change-[transform,opacity]"
                    sideOffset={5}
                  >
                    Create playlist
                    <Tooltip.Arrow className="fill-gray-800" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>
        {isLoading || user ? (
          <div className={`py-2 flex flex-row items-center justify-between`}>
            <div className="text-xs bg-gray-800 rounded-xl px-2 py-1 font-semibold">
              Playlists
            </div>
          </div>
        ) : (
          ""
        )}
          <div className="max-h-[300px] overflow-y-scroll">
          {playLists.map((playlistname, index) => {
            return (
              <PlayListButton
                key={index}
                id={playlistname._id}
                name={playlistname.playListName}
                username={"ghost"}
                close={close}
              />
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
}
