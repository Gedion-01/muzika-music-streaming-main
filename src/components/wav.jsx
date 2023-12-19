// import React, { useRef, useState } from "react";
// import WaveSurfer from "wavesurfer.js";
// function AudioPlayer() {
//   const audioFiles = ["audio1.mp3", "audio2.mp3", "audio3.mp3"];
//   const [playingIndex, setPlayingIndex] = useState(null);
//   const wavesurferRefs = useRef([]);
//   const handlePlay = (index) => {
//     setPlayingIndex(index);
//     wavesurferRefs.current[index].play();
//   };
//   const handleFinish = (index) => {
//     setPlayingIndex(null);
//     const nextIndex = (index + 1) % audioFiles.length;
//     handlePlay(nextIndex);
//   };
//   return (
//     <div>
//       {audioFiles.map((audioFile, index) => (
//         <div key={index}>
//           <div id={`waveform${index}`} />
//           <button onClick={() => handlePlay(index)}>Play</button>
//           {playingIndex === index && (
//             <button onClick={() => wavesurferRefs.current[index].pause()}>
//               Pause
//             </button>
//           )}
//           <br />
//           <br />
//         </div>
//       ))}
//       {wavesurferRefs.current.map((_, index) => (
//         <WaveSurfer
//           key={index}
//           audioFile={audioFiles[index]}
//           onFinish={() => handleFinish(index)}
//           ref={(ref) => (wavesurferRefs.current[index] = ref)}
//         />
//       ))}
//     </div>
//   );
// }
// export default AudioPlayer;
