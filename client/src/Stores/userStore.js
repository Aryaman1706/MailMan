import create from "zustand";
import { devtools } from "zustand/middleware";

export default create(
  devtools(
    (set) => ({
      loading: true,
      user: null,
      isAdmin: false,
      setLoading: (bool) => set((state) => ({ ...state, loading: bool })),
      setUser: (u) => set((state) => ({ ...state, user: u })),
      setIsAdmin: (bool) => set((state) => ({ ...state, isAdmin: bool })),
      setState: (loading, user, isAdmin) =>
        set((state) => ({ ...state, loading, user, isAdmin })),
    }),
    "userStore"
  )
);
