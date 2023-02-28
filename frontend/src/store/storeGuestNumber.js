import create from 'zustand';

export const useNumberStore = create((set) => ({
    auth : {
        guestnumber : '',
        active : false
    },
    setGuestnumber : (name) => set((state) => ({ auth : { ...state.auth, guestnumber : name }})) 

}))