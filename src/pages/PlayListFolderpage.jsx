import { useState, useEffect } from "react"

import PageTitle from "../components/PageTitle"
import PlayListTracksList from "../components/PlayListTracksList"
//
import { useParams } from 'react-router-dom'
import { useUserLoginData } from '../hooks/useUserLoginData'
import { get } from '../HttpService/http_service'

function PlayListFolderpage () {
    const [playListSongs, setplayListSongs] = useState([])
    const [playListName, setPlayListName] = useState("")
    const {folderid, playlistid} = useParams()
    const {userId, refreshCount} = useUserLoginData()

    const queryParams = {
        userid: userId,
        folderid: folderid,
        playlistid: playlistid,
    }
    useEffect(() => {
        async function getPlayListdata() {
            const result = await get(`/getplaylistfolderdata`, queryParams);
            console.log(result);
            setplayListSongs(result.playlist[0]?.songs);
            setPlayListName(result.playlist[0]?.playListName)
        }
        getPlayListdata()
    }, [playlistid, refreshCount])
    return (
        <>
        <div className="mx-3 h-full pb-20">
        <div className='max-w-3xl'>
            <PageTitle title={playListName}/>
            <PlayListTracksList data={playListSongs}/>
        </div>
        </div>
        </>
    )
}

export default PlayListFolderpage