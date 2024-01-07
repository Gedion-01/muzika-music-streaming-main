import * as Menubar from "@radix-ui/react-menubar";
import { SlOptions } from "react-icons/sl";

import { ChevronRightIcon } from "@radix-ui/react-icons";

import { useState } from "react";
import { useUserLoginData } from "../hooks/useUserLoginData";
import { useGetPlayListsofUser } from "../hooks/useGetPlayListsofUser";
import { useGetPlayListFolderofUser } from "../hooks/useGetPlayListFolderofUser";
import AddToast from "./AddToast";
import { put, post } from "../HttpService/http_service";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AddtoPlayListDialog from "./AddtoPlayListDialog";
import SignInDialog from "./Dialogs/SignInDialog";
import SmallAddtoPlayListbuttonLoading from "./animations/SmallAddtoPlayListbuttonLoading";

import { useAuth0 } from "@auth0/auth0-react";

const playListName = "My Playlist #";
const messageStatus = {
  EXISTS: "Song already exists in the playlist",
  ADDED: "Song added to playlist successfully",
};

const loadingloop = new Array(3);
for (let i = 0; i < 3; i++) {
  loadingloop[i] = i;
}

function MenubarOption({ songid }) {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const location = useLocation();
  // the playlist id from the dynamic router parameter
  const { id } = useParams();

  const { userId, isSignedIn, setRefreshCount } = useUserLoginData();
  const [open, setOpen] = useState(false);
  //for opening playlists for small screen
  const [openPlayList, setOpenPlayList] = useState(false);
  console.log(openPlayList);
  const [toastmessage, setToastmessage] = useState("");

  // to get the playList of the user
  const { playLists, playListLength, setReload } = useGetPlayListsofUser(
    userId,
    isSignedIn
  );
  // to get folder of a user
  const {
    playListFolders,
    playListFoldersLength,
    setPlayListFoldersLength,
    setReloadFolder,
  } = useGetPlayListFolderofUser(userId, isSignedIn);
  // to open small screeen playlist
  const handlePlaylistOpen = () => {
    setOpenPlayList(true);
  };
  // to close small screen playlist
  const handlePlaylistClose = () => {
    setOpenPlayList(false);
  };
  async function addToPlayList(playlistId, playlistname) {
    console.log(userId, playlistId, songid);

    const data = {
      userid: userId,
      playlistid: playlistId,
      songid: songid,
    };
    try {
      const res = await put("/add-to-playlist", data);
      console.log(res);
      if (res.message === messageStatus.EXISTS) {
        setOpen(true);
        setToastmessage(`This is already in your '${playlistname}' playlist`);
      } else if (res.message === messageStatus.ADDED) {
        setOpen(true);
        setToastmessage(`Added to '${playlistname}'`);
        handlePlaylistClose();
      }
    } catch (error) {
      console.log("failed to add to the playlist");
    }
  }
  async function removeFromplaylist(playlistname) {
    const data = {
      userid: userId, // from state
      playlistid: id, // from router param
      songid: songid, // for props
    };
    try {
      const res = await put("/remove-from-playlist", data);
      setToastmessage(`Song removed from the playlist`);
      setOpen(true);
      setRefreshCount(); // using it for refreshing the playlist data
    } catch (error) {
      console.log("failed to remove from playlist");
    }
  }
  // --- to open dialog that the user need to sign in
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  // --- end
  async function createPlaylist() {
    if (!user) {
      handleDialogOpen();
      console.log("no user account");
    }
    //const {data, isLoading()}
    if (userId && isSignedIn) {
      const data = {
        userid: userId,
        name: `${playListName}${playListLength}`,
      };
      const res = await post("/createplaylist", data);
      console.log(res);
      setReload((prev) => prev + 1);
    }
  }
  return (
    <>
      <SignInDialog
        open={dialogOpen}
        handlePlayListClose={handleDialogClose}
        title={"Create a PlayList"}
        description={"Login to create a playlists"}
      />
      <AddtoPlayListDialog
        playLists={playLists}
        id={id}
        openPlayList={openPlayList}
        handlePlayListClose={handlePlaylistClose}
        createPlaylist={createPlaylist}
        addToPlayList={addToPlayList}
      />

      <AddToast open={open} setOpen={setOpen} name={toastmessage} />
      <Menubar.Root className="flex">
        <Menubar.Menu>
          <Menubar.Trigger className="outline-none">
            <SlOptions className="cursor-pointer" />
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className={`z-10 bg-gray-800 ${
                openPlayList ? "hidden" : ""
              } text-slate-50 min-w-[220px] rounded-md p-1`}
              align="end"
              sideOffset={-10}
              alignOffset={-1}
            >
              <Menubar.Sub>
                <Menubar.SubTrigger
                  id="for-small-screen"
                  className={`outline-none flex sm:hidden items-center px-3 py-2 rounded-md hover:bg-gray-700 cursor-default`}
                >
                  <button
                    onClick={handlePlaylistOpen}
                    className="outline-none flex items-center w-full cursor-default"
                  >
                    Add to playlist
                    <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                      <ChevronRightIcon />
                    </div>
                  </button>
                </Menubar.SubTrigger>
                <Menubar.SubTrigger
                  id="for-big-screen"
                  className={`outline-none hidden sm:flex items-center px-3 py-2 rounded-md hover:bg-gray-700 cursor-default`}
                >
                  Add to playlist
                  <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    <ChevronRightIcon />
                  </div>
                </Menubar.SubTrigger>
                <Menubar.Portal>
                  <Menubar.SubContent
                    className="hidden sm:block z-10 bg-gray-800 text-slate-50 min-w-[220px] rounded-md p-1 drop-shadow-lg"
                    alignOffset={5}
                    sideOffset={0}
                  >
                    <Menubar.Item
                      onSelect={(e) => e.preventDefault()}
                      className="flex items-center outline-none mb-1"
                    >
                      <input
                        className="rounded-md px-3 py-2 bg-gray-700 focus:outline-none"
                        type="search"
                        placeholder="Find a playlist"
                      />
                    </Menubar.Item>
                    <Menubar.Item
                      onClick={createPlaylist}
                      className="outline-none px-3 py-2 my-1 rounded-md hover:bg-gray-700 cursor-default"
                    >
                      Create New Playlist
                    </Menubar.Item>
                    <div className="max-h-[400px] overflow-y-scroll scrollbar-none">
                      {isLoading
                        ? loadingloop.map((data, index) => {
                            return (
                              <SmallAddtoPlayListbuttonLoading key={index} />
                            );
                          })
                        : ""}
                      {/* playLists */}
                      {playLists.map((playlist, index) => {
                        // we don't need the current playlist we are at.
                        if (playlist._id !== id) {
                          return (
                            <Menubar.Item
                              className="outline-none px-3 py-2 my-1 rounded-md hover:bg-gray-700 cursor-default"
                              key={index}
                              onClick={() =>
                                addToPlayList(
                                  playlist._id,
                                  playlist.playListName
                                )
                              }
                            >
                              {playlist.playListName}
                            </Menubar.Item>
                          );
                        }
                      })}
                    </div>
                  </Menubar.SubContent>
                </Menubar.Portal>
              </Menubar.Sub>
              <Menubar.Sub>
                <Menubar.SubTrigger
                  id="for-small-screen"
                  className={`outline-none flex sm:hidden items-center px-3 py-2 rounded-md hover:bg-gray-700 cursor-default`}
                >
                  <button
                    onClick={"handleOpen"}
                    className="outline-none flex items-center w-full cursor-default"
                  >
                    Add to a folder
                    <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                      <ChevronRightIcon />
                    </div>
                  </button>
                </Menubar.SubTrigger>
                <Menubar.SubTrigger
                  id="for-big-screen"
                  className={`outline-none hidden sm:flex items-center px-3 py-2 rounded-md hover:bg-gray-700 cursor-default`}
                >
                  Add to a folder
                  <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    <ChevronRightIcon />
                  </div>
                </Menubar.SubTrigger>
                <Menubar.Portal>
                  <Menubar.SubContent
                    className="hidden sm:block z-10 bg-gray-800 text-slate-50 min-w-[220px] rounded-md p-1 drop-shadow-lg"
                    alignOffset={5}
                    sideOffset={0}
                  >
                    <Menubar.Item
                      onSelect={(e) => e.preventDefault()}
                      className="flex items-center outline-none mb-1"
                    >
                      <input
                        className="rounded-md px-3 py-2 bg-gray-700 focus:outline-none"
                        type="search"
                        placeholder="Find a folder"
                      />
                    </Menubar.Item>
                    {/* TODO! create a folder */}
                    <Menubar.Item
                      onClick={"createPlaylist"}
                      className="outline-none px-3 py-2 my-1 rounded-md hover:bg-gray-700 cursor-default"
                    >
                      Create New Folder
                    </Menubar.Item>
                    <div className="max-h-[400px] overflow-y-scroll scrollbar-none">
                      {isLoading
                        ? loadingloop.map((data, index) => {
                            return (
                              <SmallAddtoPlayListbuttonLoading key={index} />
                            );
                          })
                        : ""}
                      {/* folder */}
                      {playListFolders.map((playListFolder, index) => {
                        
                        return (
                          <Menubar.Sub key={index}>
                            <Menubar.SubTrigger className="outline-none hidden sm:flex items-center px-3 py-2 rounded-md hover:bg-gray-700 cursor-default">
                              {playListFolder.folderName}
                              <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                                <ChevronRightIcon />
                              </div>
                            </Menubar.SubTrigger>
                            <Menubar.Portal>
                              <Menubar.SubContent
                                className="hidden sm:block z-20 bg-gray-800 text-slate-50 min-w-[180px] rounded-md p-1 drop-shadow-lg"
                                alignOffset={5}
                                sideOffset={0}
                                
                              >
                                {
                                  playListFolder.playLists.map((playlist, index) => {
                                    // we don't need the current playlist folder we are at. !TODO
                                    // TODO, add to playlist folder onClick event
                                    return (
                                    <Menubar.Item
                                    className="outline-none px-3 py-2 my-1 rounded-md hover:bg-gray-700 cursor-default"
                                    key={index}
                                    >
                                      {playlist.playListName}
                                    </Menubar.Item>
                                    )
                                  })
                                }
                              </Menubar.SubContent>
                            </Menubar.Portal>
                          </Menubar.Sub>
                        );
                      })}
                    </div>
                  </Menubar.SubContent>
                </Menubar.Portal>
              </Menubar.Sub>
              <Menubar.Item
                className={`outline-none px-3 py-2 rounded-md hover:bg-gray-700 ${
                  location.pathname === `/playlist/${id}` ? "block" : "hidden"
                } cursor-default`}
                onClick={removeFromplaylist}
              >
                Remove from this playlist
              </Menubar.Item>
              <Menubar.Item className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default">
                <div>Save to your Liked Songs</div>
              </Menubar.Item>
              <Menubar.Item className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default">
                <div>Share</div>
              </Menubar.Item>
              <Menubar.Item></Menubar.Item>
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>
    </>
  );
}

export default MenubarOption;
