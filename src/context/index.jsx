"use client";
import { editProfile, profile } from "@/actions/actions";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [state, setState] = useState({});
  const [story, setStory] = useState({});

  async function getProfile() {
    let res = await profile();
    setState(res);
  }

  useEffect(() => {
    getProfile();
  }, []);

  // Function to refresh profile data
  const refreshProfile = async () => {
    await getProfile();
  };

  return (
    <AppContext.Provider
      value={{ state, getProfile, refreshProfile, story, setStory }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
