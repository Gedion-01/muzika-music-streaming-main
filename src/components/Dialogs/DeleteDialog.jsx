import React, { useState } from "react";
import AddToast from "../AddToast";
import { Cross2Icon } from "@radix-ui/react-icons";
import { put } from "../../HttpService/http_service";
import { useUserLoginData } from "../../hooks/useUserLoginData";
//data-[state=open]:animate-contentShow
import { useNavigate } from "react-router-dom";

const Delete = Object.freeze({
  playlist: 1,
  playlistFolder: 2,
});

function DeleteDialog({ title, id, name, open, handleClose, DeleteFlag }) { // using deleteflag for specific delete signal
  const navigate = useNavigate();
  const { userId, setRefreshCount } = useUserLoginData();
  const [openToast, setOpenToast] = useState(false);
  const [toastmessage, setToastmessage] = useState("");
  async function remove(e) {
    if (Delete.playlist === DeleteFlag) {
      const data = {
        userid: userId,
        playlistid: id,
      };

      try {
        const result = await put("/remove-playlist", data);
        handleClose(e);
        setRefreshCount();
        navigate("/");
      } catch (error) {
        setOpenToast(true);
        setToastmessage("An error occured while trying to remove the playlist");
      }
      return
    }
    if(Delete.playlistFolder === DeleteFlag) {
      const data = {
        userid: userId,
        folderid: id
      }
      try {
        const result = await put("/removefolder", data)
        handleClose(e)
        setRefreshCount()
        navigate("/")

      } catch (error) {
        setOpenToast(true)
        setToastmessage("An error occured while trying to remove the folder")
      }
      return
    }
  }
  return (
    <>
      <AddToast open={openToast} setOpen={setOpenToast} name={toastmessage} />

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
        } data-[state=open]:animate-contentShow max-h-[85vh] w-[90vw] max-w-[400px] rounded-md bg-gray-900 text-slate-50 focus:outline-none`}
      >
        <h1 className="text-[17px] font-bold px-6 py-4 text-xl text-left">
          {title}
        </h1>

        <p className="px-6 text-left text-sm font-normal">
          {
            DeleteFlag === 1 ?
            (
              <h1 className=" font-thin">This will delete <span className="font-semibold">{name}</span> from
              your <span className="font-semibold">Library.</span></h1>
            )
          : (
            <h1 className=" font-thin">This will delete <span className="font-semibold">{name}</span> and all playlists inside?</h1>
          )
          }
          
        </p>
        <div className="flex flex-row gap-2 p-6 justify-end">
          <button
            onClick={handleClose}
            className="py-2 px-4 bg-gray-900 text-slate-200 hover:text-slate-50 rounded-md transition-all outline-none"
          >
            Cancel
          </button>
          <button
            onClick={(e) => remove(e)}
            className="py-2 px-4 bg-slate-200 hover:bg-white transition-all text-slate-950 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteDialog;
