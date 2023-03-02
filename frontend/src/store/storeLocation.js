import create from 'zustand';

export const useLocationStore = create((set) => ({
    auth : {
        location : '',
        active : false
    },
    setLocation : (name) => set((state) => ({ auth : { ...state.auth, location : name }})) 

}))