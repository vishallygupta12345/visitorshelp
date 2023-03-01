import create from 'zustand';

export const useGStore = create((set) => ({
    auth : {
        guestname : '',
        active : false
    },
    setGuestname : (name) => set((state) => ({ auth : { ...state.auth, guestname : name }})) ,

}))