import { User } from "@/@types";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface States {
  user: User | null;
}

interface Actions {
  setUser: (user: User) => void;
  logout: () => void;
}

const useUser = create<States & Actions>((set, get) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
}));

export { useUser };

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("User Store", useUser);
}
