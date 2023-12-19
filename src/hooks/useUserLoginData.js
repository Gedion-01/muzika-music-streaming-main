import {create} from "zustand"
import React from 'react'

export const useUserLoginData = create((set) => ({
  isSignedIn: false,
  userId: "",
  refreshCount: 0, // to refresh the playlist when event happen
  setUserid: (id) => set((state) => ({userId: id})),
  setIsSignedIn: (status) => set((state) => ({isSignedIn: status})),
  // only used to refresh the page when incrementing the value
  setRefreshCount: () => set((state) => ({refreshCount: state.refreshCount + 1}))
}));
