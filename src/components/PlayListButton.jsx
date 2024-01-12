import React, { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { FiMusic } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import DeleteDialog from "./Dialogs/DeleteDialog";
import SignInDialog from "./Dialogs/SignInDialog";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import RenameDialog from "./Dialogs/RenameDialog";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { HiShare } from "react-icons/hi2";
import { FiTrash } from "react-icons/fi";

function PlayListButton({ id, name, username, close }) {
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
        DeleteFlag={1}
      />
      <RenameDialog
        open={openRenameDialog}
        handleClose={handleRenameDialogClose}
        id={id}
        name={name}
        RenameFlag={1}
        Title={"Rename playlist"}
      />
      <ContextMenu.Root>
        <Link to={`/playlist/${id}`} onClick={close}>
          <ContextMenu.Trigger
            className={`mr-5 mb-1 rounded-md flex flex-row items-center gap-1 transition-all duration-300 hover:bg-gray-900 ${
              location.pathname === `/playlist/${id}` ? "bg-gray-900" : ""
            }`}
          >
            <div className="h-12 w-12 m-1.5 flex items-center justify-center rounded-md bg-gray-800">
              <FiMusic className="h-6 w-5" />
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-md text-left">{name}</p>
              <p className="text-xs text-start">Playlist {username}</p>
            </div>
          </ContextMenu.Trigger>
        </Link>
        <ContextMenu.Portal>
          <ContextMenu.Content
            className={`z-20 bg-gray-800 text-slate-50 min-w-[220px] rounded-md p-1`}
            sideOffset={5}
            align="end"
          >
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger className="flex items-center outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default">
                Move to folder
                <div className="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  <ChevronRightIcon />
                </div>
              </ContextMenu.SubTrigger>
              <ContextMenu.Portal>
                <ContextMenu.SubContent
                  className="bg-gray-800 text-slate-50 min-w-[220px] rounded-md p-1"
                  alignOffset={-1}
                  sideOffset={0}
                >
                  <ContextMenu.Item
                    onSelect={(e) => e.preventDefault()}
                    className="flex items-center outline-none mb-1"
                  >
                    <input
                      className="rounded-md px-3 py-2 bg-gray-700 focus:outline-none"
                      type="search"
                      placeholder="Find a folder"
                    />
                  </ContextMenu.Item>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
            <ContextMenu.Separator className="h-[1px] my-[2px] mx-[1px] bg-gray-700" />
            <ContextMenu.Item
              className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
              onSelect={handleOpen}
            >
              <FiTrash className="w-5 h-5 mr-2" />
              Delete
            </ContextMenu.Item>
            <ContextMenu.Item
              onSelect={handleRenameDialogOpen}
              className="outline-none px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center "
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
}

export default PlayListButton;
