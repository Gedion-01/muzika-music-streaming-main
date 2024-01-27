import React, { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Accordion from "@radix-ui/react-accordion";
import { FiFolder } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import DeleteDialog from "./Dialogs/DeleteDialog";
import { FiMusic } from "react-icons/fi";
import SignInDialog from "./Dialogs/SignInDialog";
import RenameDialog from "./Dialogs/RenameDialog";
//
import { PiMusicNotesPlus } from "react-icons/pi";
import { FiFolderPlus } from "react-icons/fi";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { HiShare } from "react-icons/hi2";
import { FiTrash } from "react-icons/fi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
//
import { useCreationUserData } from "../hooks/useCreationUserData";
import { useGetPlayListFolderofUser } from "../hooks/useGetPlayListFolderofUser";
import { useUserLoginData } from "../hooks/useUserLoginData";
import { put } from "../HttpService/http_service";
import { useNavigate } from "react-router-dom";

//Do you really want to delete this folder and all playlists inside?
function PlayListFolderButton({ id, name, username, close, playlists }) {
  const navigate = useNavigate();
  const {
    userId,
    isSignedIn,
    setRefreshCount,
    openToast,
    setOpenToast,
    setToastMessage,
  } = useUserLoginData();
  const { createPlayListFolder, createPlaylistInsideFolder } =
    useCreationUserData();

  const {
    playListFolders,
    playListFoldersLength,
    setPlayListFoldersLength,
    setReloadFolder,
  } = useGetPlayListFolderofUser(userId);
  console.log(playlists.length);
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(0);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [playlistID, setPlayListID] = useState("");
  const [playlistNAME, setPlaylistNAME] = useState("");
  const handleOpen = (e, flag, id, name) => {
    // delete the delete dialog
    console.log("flag ", flag, id, name);
    //e.stopPropagation()
    setFlag(flag);
    setOpen(true);
    setPlayListID(id);
    setPlaylistNAME(name);
  };

  function handleClose(e) {
    console.log("close");
    //e.stopPropagation()
    e.stopPropagation();
    setOpen(false);
    setPlayListID("");
    setPlaylistNAME("");
    setFlag(0);
  }
  // to rename folder we set flag = 2, we can get the folder id and the name from the root component by default
  // to rename playlist inside folder we set flag = 2, id="which is playlistid", name="which is playlist name"
  const handleRenameDialogOpen = (e, flag, id, name) => {
    console.log("flag ", flag);
    e.stopPropagation();
    setOpenRenameDialog(true);
    setPlayListID(id);
    setPlaylistNAME(name);
    setFlag(flag);
  };
  const handleRenameDialogClose = (e) => {
    e.stopPropagation();
    setOpenRenameDialog(false);
    setPlayListID("");
    setPlaylistNAME("");
    setFlag(0);
  };
  const location = useLocation();
  console.log("flag ", flag);
  async function movePlaylistFromOneFolderToAnother(currentPlaylistID, destinationFolderID) {
    const data = {
        userid: userId,
        currentfolderid: id,
        currentplaylistid: currentPlaylistID,
        destinationfolderid: destinationFolderID
    }
    console.log(data)
    try {
      const res = await put("/moveplaylistfromfoldertoanotherfolder", data);
      setToastMessage(`playlist moved to folder successfully`);
      setRefreshCount();
      setOpenToast(true);
      navigate("/");
    } catch (error) {
      console.log("failed to add to the playlist");
      console.log(error);
    }
  }
  return (
    <>
      <DeleteDialog
        title={"Delete from Your Library"}
        id={id}
        playlistid={playlistID}
        name={flag === 3 ? playlistNAME : name} // if flag is 3 we need the playlistname not the folder name
        open={open}
        handleClose={handleClose}
        DeleteFlag={flag}
      />
      <RenameDialog
        open={openRenameDialog}
        handleClose={handleRenameDialogClose}
        id={id} // folder id
        playlistid={playlistID}
        name={flag === 3 ? playlistNAME : name} // if flag is 3 we need the playlistname not the folder name
        RenameFlag={flag}
        Title={"Rename Folder"}
      />

      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="item-1" className="overflow-hidden">
          <Accordion.Trigger className="group rounded-md w-full ">
            <ContextMenu.Root>
              <ContextMenu.Trigger className="grid grid-cols-4 rounded-md hover:bg-gray-900 mr-5 mb-1 transition-all duration-300">
                <div className="col-span-3 flex flex-row items-center gap-1">
                  <div className="h-12 w-12 m-1.5 flex items-center justify-center rounded-md bg-gray-800">
                    <FiFolder className="h-8 w-6" />
                  </div>
                  <div className="flex flex-col justify-between gap-2">
                    <p className="text-md text-left">{name}</p>
                    <p className="text-xs text-start">
                      {playlists.length} playlist
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end mr-3 data-[state=open]:bg-red-300">
                  <IoMdArrowDropright className="h-6 w-6 data-[state=open]:bg-red-300 transition-transform  group-data-[state=open]:rotate-90" />
                </div>
              </ContextMenu.Trigger>
              <ContextMenu.Portal>
                <ContextMenu.Content
                  className={`z-20 bg-gray-800 text-slate-50 min-w-[220px] rounded-md p-1`}
                  sideOffset={5}
                  align="end"
                >
                  <ContextMenu.Item
                    className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                    onSelect={(e) => handleOpen(e, 2)}
                  >
                    <FiTrash className="w-5 h-5 mr-2" />
                    Delete
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    onSelect={(e) => handleRenameDialogOpen(e, 2)}
                    className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                  >
                    <MdOutlineDriveFileRenameOutline className="w-5 h-5 mr-2" />
                    Rename
                  </ContextMenu.Item>
                  <ContextMenu.Separator className="h-[1px] my-[2px] mx-[1px] bg-gray-700" />
                  <ContextMenu.Item
                    onClick={() => {
                      createPlaylistInsideFolder(id, playlists.length); // create playlist inside a folder
                    }}
                    className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                  >
                    <PiMusicNotesPlus className="w-5 h-5 mr-2" />
                    Create playlist
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    onClick={() => {
                      createPlayListFolder();
                    }}
                    className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                  >
                    <FiFolderPlus className="h-5 w-5 mr-2" />
                    Create folder
                  </ContextMenu.Item>
                  <ContextMenu.Item className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center">
                    <HiShare className="w-5 h-5 mr-2" />
                    Share
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Portal>
            </ContextMenu.Root>
          </Accordion.Trigger>
          <Accordion.Content className="">
            {playlists.map((playlist, index) => {
              return (
                <>
                  <ContextMenu.Root key={index}>
                    <ContextMenu.Trigger>
                      <Link
                        to={`/folder/${id}/${playlist._id}`}
                        onClick={close}
                        key={index}
                      >
                        <div
                          key={index}
                          id="playlist-in-the-folder"
                          className={`ml-5 mb-1 rounded-md flex flex-row items-center gap-1 transition-all duration-300 hover:bg-gray-900 ${
                            location.pathname ===
                            `/folder/${id}/${playlist._id}`
                              ? "bg-gray-900"
                              : ""
                          }`}
                        >
                          <div className="h-12 w-12 m-1.5 flex items-center justify-center rounded-md bg-gray-800">
                            <FiMusic className="h-6 w-5" />
                          </div>
                          <div className="flex flex-col justify-between gap-2">
                            <p className="text-md text-left">
                              {playlist.playListName}
                            </p>
                            <p className="text-xs text-start">
                              Playlist {username}
                            </p>
                          </div>
                        </div>
                      </Link>
                      {/* context menu for playlists inside a folder */}
                    </ContextMenu.Trigger>
                    <ContextMenu.Portal>
                      <ContextMenu.Content
                        className={`z-20 bg-gray-800 text-slate-50 min-w-[220px] rounded-md p-1`}
                        sideOffset={5}
                        align="end"
                      >
                        <ContextMenu.Sub>
                          <ContextMenu.SubTrigger
                            className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                          >
                            Move to folder
                            <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                              <ChevronRightIcon />
                            </div>
                          </ContextMenu.SubTrigger>
                          <ContextMenu.Portal>
                            <ContextMenu.SubContent
                              className="z-20 bg-gray-800 text-slate-50 min-w-[220px] rounded-md p-1"
                              alignOffset={-1}
                              sideOffset={0}
                            >
                              <ContextMenu.Item
                                onSelect={(e) => e.preventDefault()}
                                className="flex items-center outline-none mb-1"
                              >
                                <input
                                  className="rounded-md px-3 py-2 bg-gray-700 focus:outline-none w-full"
                                  type="search"
                                  placeholder="Find a playlist"
                                />
                              </ContextMenu.Item>
                              <ContextMenu.Item
                                onClick={createPlayListFolder}
                                className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                              >
                                <AiOutlinePlus
                                  id="plus-button"
                                  className="w-5 h-5 mr-2"
                                />
                                Create folder
                              </ContextMenu.Item>
                              <ContextMenu.Item
                                onClick={createPlayListFolder}
                                className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                              >
                                Remove from folder
                              </ContextMenu.Item>
                              <ContextMenu.Separator className="h-[1px] mx-[1px] bg-gray-700" />
                              {playListFolders.map((playListFolder, index) => {
                                if(playListFolder.folderName === name) {
                                  return
                                }
                                return (
                                  <ContextMenu.Item
                                    key={index}
                                    onClick={() => 
                                      movePlaylistFromOneFolderToAnother(playlist._id, playListFolder._id)
                                      // movePlaylistToFolder(
                                      //   playListFolder._id,
                                      //   playListFolder.folderName
                                      // )
                                    }
                                    className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                                  >
                                    {playListFolder.folderName}
                                  </ContextMenu.Item>
                                );
                              })}
                            </ContextMenu.SubContent>
                          </ContextMenu.Portal>
                        </ContextMenu.Sub>
                        <ContextMenu.Separator className="h-[1px] my-[2px] mx-[1px] bg-gray-700" />
                        <ContextMenu.Item
                          className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                          onSelect={(e) =>
                            handleOpen(
                              e,
                              3,
                              playlist._id,
                              playlist.playListName
                            )
                          }
                        >
                          <FiTrash className="w-5 h-5 mr-2" />
                          Delete
                        </ContextMenu.Item>

                        <ContextMenu.Item
                          onSelect={(e) =>
                            handleRenameDialogOpen(
                              e,
                              3,
                              playlist._id,
                              playlist.playListName
                            )
                          }
                          className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
                        >
                          <MdOutlineDriveFileRenameOutline className="w-5 h-5 mr-2" />
                          Rename
                        </ContextMenu.Item>
                        <ContextMenu.Item className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center">
                          <HiShare className="w-5 h-5 mr-2" />
                          Share
                        </ContextMenu.Item>
                      </ContextMenu.Content>
                    </ContextMenu.Portal>
                  </ContextMenu.Root>
                </>
              );
            })}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
}

export default PlayListFolderButton;
