import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlinePlus } from "react-icons/ai";
// user need to sign in dialogue
import SignInDialog from "./Dialogs/SignInDialog";

import { useAuth0 } from "@auth0/auth0-react";
import { useUserLoginData } from "../hooks/useUserLoginData";
import SmallAddtoPlayListbuttonLoading from "./animations/SmallAddtoPlayListbuttonLoading";

const loadingloop = new Array(3);
for (let i = 0; i < 3; i++) {
  loadingloop[i] = i;
}

function AddtoPlayListDialog({
  playLists,
  id,
  openPlayList,
  handlePlayListClose,
  createPlaylist,
  addToPlayList,
}) {
  // -- to open dialog that the user need to sign in
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // --- end
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const { userId, isSignedIn } = useUserLoginData();

  
  return (
    <>
      <SignInDialog
        open={open}
        handlePlayListClose={handleClose}
        title={"Create a PlayList"}
        description={"Login to create a playlists"}
      />
      {/* <SignInDialog open={open} handleClose={handleClose} title={'Create a PlayList'} description={'Login to create a playlists'}/> */}
      <Dialog.Root open={openPlayList} onOpenChange={handlePlayListClose}>
        <Dialog.Portal className="sm:hidden">
          <Dialog.Overlay className=" fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-10 top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-gray-800 text-slate-50 pb-3  focus:outline-none">
            <Dialog.Title className="text-[17px] font-medium p-3">
              Add to Playlist
            </Dialog.Title>
            <hr className="w-full l border-gray-800" />
            <Dialog.Description className="">
              {/* Make changes to your profile here. Click save when you're done. */}
            </Dialog.Description>
            <div
              onSelect={(e) => e.preventDefault()}
              className=" px-3 outline-none my-2"
            >
              <input
                className="rounded-md w-full px-3 py-2 bg-gray-700 focus:outline-none"
                type="search"
                placeholder="Find a playlist"
              />
            </div>
            <div id="holder" className="px-3">
              <button
                onClick={createPlaylist}
                className="outline-none w-full text-start px-3 py-2 rounded-md hover:bg-gray-700 cursor-default flex items-center"
              >
                <AiOutlinePlus id="plus-button" className="w-5 h-5 mr-2" />
                Create New Playlist
              </button>
              {/* playLists */}
              <div className="max-h-[200px] overflow-y-scroll scrollbar-none">
              {isLoading
                ? loadingloop.map(() => {
                    return <SmallAddtoPlayListbuttonLoading />;
                  })
                : ""}
              {playLists
                ? playLists.map((playlist, index) => {
                    // we don't need the current playlist we are at.
                    if (playlist._id !== id) {
                      return (
                        <div
                          className="outline-none px-3 py-2 rounded-md hover:bg-gray-700"
                          key={index}
                          onClick={() =>
                            addToPlayList(playlist._id, playlist.playListName)
                          }
                        >
                          {playlist.playListName}
                        </div>
                      );
                    }
                  })
                : ""}
                </div>

            </div>

            {/* <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close> */}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default AddtoPlayListDialog;
