import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import { useParams } from 'react-router-dom'
import { useUserLoginData } from '../hooks/useUserLoginData'
import { get } from '../HttpService/http_service'
import PlayListTracksList from '../components/PlayListTracksList'
function PlayListpage() {
    const [playListSongs, setplayListSongs] = useState([])
    const [playListName, setPlayListName] = useState("")
    const {id} = useParams()
    const {userId, refreshCount} = useUserLoginData()

    const queryParams = {
        userid: userId,
        playlistid: id
    }
    useEffect(() => {
        async function getPlayListdata() {
            const result = await get(`/getplaylistdata`, queryParams);
            console.log(result);
            setplayListSongs(result.playlist[0]?.songs);
            setPlayListName(result.playlist[0]?.playListName)
        }
        getPlayListdata()
    }, [id, refreshCount])
  return (
    <div className="mx-3 h-full pb-20">
        <div className='max-w-3xl'>
            <PageTitle title={playListName} />
            <PlayListTracksList data={playListSongs} />
        </div>
    </div>
  )
}

export default PlayListpage