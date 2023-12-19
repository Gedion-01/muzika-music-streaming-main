import { create } from "zustand";
import React, { useRef } from "react";

export const usePlayList = create((set) => ({
  audioRef: React.createRef(),
  progressBarRef: React.createRef(),
  animationRef: React.createRef(),
  //
  isplaying: false,
  currentData: {},
  currentTrackIndex: -1,
  setCurrentTrackIndex: (index) =>
    set((state) => ({ currentTrackIndex: index })),
  playList: [],
  playListLength: 0,
  //
  isPlaying: false,
  reload: 0,
  setIsPlaying: (status) => set((state) => ({ isplaying: status })),
  currentTime: 0,
  setCurrentTime: (time) => set((state) => ({ currentTime: time })),
  playNext: false,
  setPlayNext: (status) => set((state) => ({ playNext: status })),
  //
  setCurrentData: (data) => set((state) => ({ currentData: data })),
  setPlayList: (list) => set((state) => ({ playList: list })),
  setPlayListLength: (length) => set((state) => ({ playListLength: length })),
}));
