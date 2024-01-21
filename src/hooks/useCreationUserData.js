import { post, put } from "../HttpService/http_service";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserLoginData } from "./useUserLoginData";
import { useGetPlayListsofUser } from "./useGetPlayListsofUser";

export function useCreationUserData() {
    const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const {
    userId,
    isSignedIn,
    setRefreshCount,
    openToast,
    setOpenToast,
    setToastMessage,
  } = useUserLoginData();
  const { playLists, playListLength } = useGetPlayListsofUser(
    userId,
    isSignedIn
  );
  async function createPlaylist(length) {
    if (!user) {
      handleOpen();
      console.log("no user account");
    }
    //const {data, isLoading()}
    if (userId && isSignedIn) {
      const data = {
        userid: userId,
        name: `My Playlist #${playListLength}`,
      };
      const res = await post("/createplaylist", data);
      setToastMessage("Playlist created");
      setOpenToast(true);
      setRefreshCount();
    }
  }
  async function createPlayListFolder() {
    if (!user) {
      handleOpen();
      console.log("no user account");
    }
    if (userId && isSignedIn) {
      const data = {
        userid: userId,
        name: `New Folder`,
      };
      const res = await post("/createfolder", data);
      setToastMessage("Folder created");
      setOpenToast(true);
      setRefreshCount();
    }
  }
  async function createPlaylistInsideFolder(folderid, length) {
    if (!user) {
      handleDialogOpen();
      console.log("no user account");
    }
    //
    if (userId && isSignedIn) {
      const data = {
        userid: userId,
        folderid: folderid,
        name: `My Playlist #${length}`,
      };
      const res = await put("/createplaylistinsidefolder", data);
      setToastMessage(res.message);
      setOpenToast(true);
      setRefreshCount(); // using it for refreshing the playlist & folder data
    }
  }
  return {
    createPlaylist: createPlaylist,
    createPlayListFolder: createPlayListFolder,
    createPlaylistInsideFolder: createPlaylistInsideFolder
  }
}
