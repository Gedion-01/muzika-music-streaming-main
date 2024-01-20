import {create} from "zustand"
import React from 'react'

export const useUserLoginData = create((set) => ({
  isSignedIn: false,
  userId: "",
  refreshCount: 0, // to refresh the playlist when event happen
  openToast: false,
  toastMessage: "",
  setUserid: (id) => set((state) => ({userId: id})),
  setIsSignedIn: (status) => set((state) => ({isSignedIn: status})),
  setOpenToast: (status) => set((state) => ({openToast: status})),
  setToastMessage: (value) => set((state) => ({toastMessage: value})),
  // only used to refresh the page when incrementing the value
  setRefreshCount: () => set((state) => ({refreshCount: state.refreshCount + 1}))
}));
