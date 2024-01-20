import React, { useEffect, useRef, useState } from "react";
import AddToast from "../AddToast";
import { FiMusic } from "react-icons/fi";
import { FiFolder } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { useUserLoginData } from "../../hooks/useUserLoginData";
import { put } from "../../HttpService/http_service";

const Rename = Object.freeze({
  playlist: 1,
  playlistFolder: 2,
  playlistInsideFolder: 3
});

function RenameDialog({ open, handleClose, id, playlistid, name, RenameFlag, Title }) {

  const { userId, setRefreshCount, openToast, setOpenToast, setToastMessage } = useUserLoginData();
  const [inputValue, setInputValue] = useState("");
  // const [openToast, setOpenToast] = useState(false);
  const [toastmessage, setToastmessage] = useState("");

  const inputRef = useRef(null);
  console.log(inputValue);
  // load current value
  useEffect(() => {
    if (inputRef.current) {
      setInputValue(name);
      console.log("yes");
      inputRef.current.focus();
      //inputRef.current.select()
    }
  }, [open]);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  async function rename(e) {
    
    if (Rename.playlist === RenameFlag) {
      const data = {
        userid: userId,
        playlistid: id,
        playlistname: inputValue,
      };

      try {
        const result = await put("/rename-playlist", data);
        setToastMessage(result.message);
        setOpenToast(true);
        //setTimeout(setRefreshCount, 200)
        handleClose(e);
        setRefreshCount();
      } catch (error) {
        setOpenToast(true);
        setToastMessage("failed to rename the playlist");
        console.log(error);
      }
      return
    }
    if(Rename.playlistFolder === RenameFlag) {
      const data = {
        userid: userId,
        folderid: id,
        folderName: inputValue,
      };
      console.log(data);
      try {
        const result = await put("/rename-folder", data);
        setToastMessage(result.message);
        setOpenToast(true);
        //setTimeout(setRefreshCount, 200)
        handleClose(e);
        setRefreshCount();
      } catch (error) {
        setOpenToast(true);
        setToastMessage("failed to rename the playlist folder");
        console.log(error);
      }
      return
    }
    if(Rename.playlistInsideFolder === RenameFlag) {
      const data = {
        userid: userId,
        folderid: id,
        playlistid: playlistid,
        name: inputValue,
      };
      console.log(data);
      try {
        const result = await put("/renameplaylistinsidefolder", data);
        setToastMessage(result.message);
        setOpenToast(true);
        //setTimeout(setRefreshCount, 200)
        handleClose(e);
        setRefreshCount();
      } catch (error) {
        setOpenToast(true);
        setToastMessage("failed to rename the playlist inside a folder");
        console.log(error);
      }
      return
    }
  }
  return (
    <>
      {/* <AddToast open={openToast} setOpen={setOpenToast} name={toastmessage} /> */}
      <section
        onClick={(e) => handleClose(e)}
        className={`${
          open ? "fixed inset-0 z-40 animate-contentShow w-full h-full" : ""
        }`}
      ></section>
      <div
        className={`${
          open
            ? "fixed z-40 animate-contentShow top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
            : "hidden"
        } p-6 data-[state=open]:animate-contentShow max-h-[85vh]  w-[40%] rounded-md bg-gray-900 text-slate-50 focus:outline-none`}
      >
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-[17px] font-bold text-xl text-left">
            {Title}
          </h1>
          <button
            id="close-Rename-Dialog"
            className="cursor-pointer hover:text-cyan-500 duration-300 text-right"
            onClick={(e) => handleClose(e)}
          >
            <CgClose className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-rowz justify-between gap-4 items-center mt-4">
          <div className="flex items-center justify-center p-3 rounded-md bg-gray-800">
            {
              RenameFlag === 1 ? <FiMusic className="h-10 w-10" /> : <FiFolder className="h-10 w-10" />
            }
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="h-14 w-[100%] bg-gray-800 px-4 py-2 outline-none rounded-md border-gray-700 border text-slate-50"
          />
        </div>
        <div className="flex items-center flex-row gap-2 justify-end mt-2">
          <button
            onClick={(e) => rename(e)}
            className="py-2 px-4 bg-slate-200 hover:bg-white transition-all text-slate-950 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default RenameDialog;
