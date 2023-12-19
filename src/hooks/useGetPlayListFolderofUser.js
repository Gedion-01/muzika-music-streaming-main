import { useState, useEffect } from 'react';
import { get } from '../HttpService/http_service';
import { useAuth0 } from "@auth0/auth0-react";
import { useUserLoginData } from './useUserLoginData';

export function useGetPlayListFolderofUser(userId, isSignedIn) {
    const {refreshCount, setRefreshCount} = useUserLoginData()
    //
    const {user} = useAuth0()
    //
    const [playListFolders, setPlayListFolders] = useState([]);
    const [playListFoldersLength, setPlayListFoldersLength] = useState(0);
    //
    useEffect(() => {
        if (userId && user) {
          async function getAllPlayListFolders() {
            const result = await get(`/getfolders/${userId}`);
            console.log(result);
            setPlayListFolders(result.folders);
            setPlayListFoldersLength(result.folders.length);
          }
          getAllPlayListFolders()
        }
        console.log(userId, user)
      }, [userId, refreshCount]);

      return {
        playListFolders: playListFolders,
        playListFoldersLength: playListFoldersLength,
        setPlayListFoldersLength: setPlayListFoldersLength,
        setReloadFolder: setRefreshCount
      }
}
