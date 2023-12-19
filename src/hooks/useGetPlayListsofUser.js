import { useState, useEffect } from 'react';
import { get } from '../HttpService/http_service';
import { useAuth0 } from "@auth0/auth0-react";
import { useUserLoginData } from './useUserLoginData';

export function useGetPlayListsofUser(userId, isSignedIn) {
    const {refreshCount, setRefreshCount} = useUserLoginData()
    //
    const {user} = useAuth0()
    //
    const [playLists, setPlayLists] = useState([]);
    const [playListLength, setPlayListLength] = useState(0);
    //const [reload, setReload] = useState(0); // only used to refresh the page when incrementing the value
    useEffect(() => {
      if (userId && user) {
        async function getAllPlayLists() {
          const result = await get(`/getplaylists/${userId}`);
          console.log(result);
          setPlayLists(result.playlists);
          setPlayListLength(result.playlists.length);
        }
        getAllPlayLists();
      }
      console.log(userId, user)
    }, [userId, refreshCount]);

    return {
        playLists: playLists,
        playListLength: playListLength,
        setPlayListLength: setPlayListLength,
        setReload: setRefreshCount // only used to refresh the page when incrementing the value
    }
}
