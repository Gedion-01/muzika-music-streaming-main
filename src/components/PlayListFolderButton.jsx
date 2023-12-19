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
//Do you really want to delete this folder and all playlists inside?
function PlayListFolderButton({ id, name, username, close, playlists }) {
  console.log(playlists.length);
  const [open, setOpen] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const handleOpen = (e) => {
    //e.stopPropagation()
    setOpen(true);
  };

  function handleClose(e) {
    console.log("close");
    //e.stopPropagation()
    e.stopPropagation();
    setOpen(false);
  }
  const handleRenameDialogOpen = () => {
    setOpenRenameDialog(true);
  };
  const handleRenameDialogClose = (e) => {
    e.stopPropagation();
    setOpenRenameDialog(false);
  };
  const location = useLocation();

  return (
    <>
      <DeleteDialog
        title={"Delete from Your Library"}
        id={id}
        name={name}
        open={open}
        handleClose={handleClose}
        DeleteFlag={2}
      />
      <RenameDialog
        open={openRenameDialog}
        handleClose={handleRenameDialogClose}
        id={id}
        name={name}
        RenameFlag={2}
        Title={"Rename Folder"}
      />
      <ContextMenu.Root>
        {/* <Link to={`/playlist/${id}`} onClick={close}> */}
        <ContextMenu.Trigger
        //   className={`mr-5 mb-1 rounded-md flex flex-row items-center gap-1 transition-all duration-300 hover:bg-gray-900 ${
        //     location.pathname === `/playlist/${id}` ? "bg-gray-900" : ""
        //   }`}
        >
          <Accordion.Root type="single" collapsible>
            <Accordion.Item value="item-1">
              <Accordion.Trigger className="grid grid-cols-4 items-center group rounded-md hover:bg-gray-900 mb-1 mr-5 w-full">
                <div className="col-span-3 flex flex-row items-center gap-1">
                  <div className="h-12 w-12 m-1.5 flex items-center justify-center rounded-md bg-gray-800">
                    <FiFolder className="h-8 w-6" />
                  </div>
                  <div className="flex flex-col justify-between gap-2">
                    <p className="text-md text-left">{name}</p>
                    <p className="text-xs text-start">{playlists.length} playlist</p>
                  </div>
                </div>
                <div className="flex justify-end mr-3 data-[state=open]:bg-red-300">
                  <IoMdArrowDropright className="h-6 w-6 data-[state=open]:bg-red-300 transition-transform  group-data-[state=open]:rotate-90" />
                </div>
              </Accordion.Trigger>
              <Accordion.Content className="">
                {playlists.map((playlist) => {
                  return (
                    <>
                      <div
                        id="playlist-in-the-folder"
                        className={`ml-5 mb-1 rounded-md flex flex-row items-center gap-1 transition-all duration-300 hover:bg-gray-900 ${
                          location.pathname === `/playlist/${id}`
                            ? "bg-gray-900"
                            : ""
                        }`}
                      >
                        <div className="h-12 w-12 m-1.5 flex items-center justify-center rounded-md bg-gray-800">
                          <FiMusic className="h-6 w-5" />
                        </div>
                        <div className="flex flex-col justify-between gap-2">
                          <p className="text-md text-left">{playlist.playListName}</p>
                          <p className="text-xs text-start">
                            Playlist {username}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </ContextMenu.Trigger>
        {/* </Link> */}
        <ContextMenu.Portal>
          <ContextMenu.Content
            className={`z-20 bg-gray-800 text-slate-50 min-w-[220px] rounded-md p-1`}
            sideOffset={5}
            align="end"
          >
            <ContextMenu.Item
              className="outline-none px-3 py-1 rounded-md hover:bg-gray-700 cursor-default"
              onSelect={handleOpen}
            >
              Delete
            </ContextMenu.Item>
            <ContextMenu.Separator className="h-[1px] my-[2px] mx-[1px] bg-gray-700" />
            <ContextMenu.Item
              onSelect={handleRenameDialogOpen}
              className="outline-none px-3 py-1 rounded-md hover:bg-gray-700 cursor-default"
            >
              Rename
            </ContextMenu.Item>
            <ContextMenu.Item className="outline-none px-3 py-1 rounded-md hover:bg-gray-700 cursor-default">
              Share
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </>
  );
}

export default PlayListFolderButton;
