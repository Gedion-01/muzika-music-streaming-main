import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ track, isCurrent, isnotCurrent, playNext, index,  setMindex, handlePlayPause, isPlaying }) => {
    console.log('is current', isCurrent, index)

 
  function playPause() {
    setMindex(index)
    handlePlayPause(index)
    
  }
  return (
    <div>
      <h3>{track.title}</h3>
      {/* <audio controls ref={audioRef} src={track.url} onEnded={handleEnded} /> */}
      <button onClick={playPause}>{isPlaying && isCurrent ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default AudioPlayer;
