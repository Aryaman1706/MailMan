import create from "zustand";
import { devtools } from "zustand/middleware";

export default create(
  devtools(
    (set) => ({
      loading: true,
      user: null,
      isAdmin: false,
      idToken: null,
      setLoading: (bool) => set((state) => ({ ...state, loading: bool })),
      setUser: (u) => set((state) => ({ ...state, user: u })),
      setIsAdmin: (bool) => set((state) => ({ ...state, isAdmin: bool })),
      setIdToken: (t) => set((state) => ({ ...state, idToken: t })),
      setState: (loading, user, isAdmin, idToken) =>
        set((state) => ({ ...state, loading, user, isAdmin, idToken })),
    }),
    "userStore"
  )
);
