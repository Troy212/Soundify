import { create } from "zustand";

interface PlayerStore {
    ids: string[];
    activeId?: string;
    isShuffling: boolean; // Track shuffle state
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    setShuffle: (shuffle: boolean) => void; // Action to set shuffle state
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    isShuffling: false, // Default shuffle state is off
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids }),
    setShuffle: (shuffle: boolean) => set({ isShuffling: shuffle }), // Set shuffle state
    reset: () => set({ ids: [], activeId: undefined, isShuffling: false }), // Reset shuffle when resetting player
}));

export default usePlayer;
