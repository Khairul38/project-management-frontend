import { create } from "zustand";

export const useAuthStore = create((set) => ({
  users: [
    { name: "Test User", email: "testuser@gmail.com", password: "12345" },
  ],
  register: (data) => set((state) => ({ users: [...state.users, data] })),
}));

// export const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }));
