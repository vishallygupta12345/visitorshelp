import create from 'zustand';

export const useGemailStore = create((set) => ({
    auth : {
        guestemail : '',
        active : false
    },
    setGuestemail : (name) => set((state) => ({ auth : { ...state.auth, guestemail : name }})) 

}))