import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: undefined,
  userLoggedIn: (data) => set({ user: data }),
  userLoggedOut: () => set({ user: undefined }),
}));

// export const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }));
