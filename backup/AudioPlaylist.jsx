import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';

const AudioPlaylist = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playNext, setPlayNext] = useState(false)
  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    setPlayNext(true)
    console.log('next index', nextIndex)
  };
  function setMindex(value) {
    setCurrentTrackIndex(value)
    console.log(value)
  }
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     playNextTrack();
  //   }, 10000); // Change this value to adjust the delay between tracks (in milliseconds)

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [currentTrackIndex]);

  return (
    <div>
      <h2>Audio Playlist</h2>
      {tracks.map((track, index) => (
        <AudioPlayer
          key={index}
          track={track}
          isCurrent={currentTrackIndex === index}
          isnotCurrent={currentTrackIndex !== index}
          playNext={playNext}
          onTrackEnd={playNextTrack}
          setMindex={setMindex}
          index={index}
        />
      ))}
      <div>
        <p>Name</p>
      </div>
    </div>
  );
};

export default AudioPlaylist;
