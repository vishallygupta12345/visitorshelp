import create from 'zustand';

export const useAdditionalStore = create((set) => ({
    auth : {
        additional : '',
        active : false
    },
    setAdditional : (name) => set((state) => ({ auth : { ...state.auth, additional : name }})) 

}))