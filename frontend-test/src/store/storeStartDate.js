import create from 'zustand';

export const useStartStore = create((set) => ({
    auth : {
        startdate : '',
        active : false
    },
    setStartdate : (name) => set((state) => ({ auth : { ...state.auth, startdate : name }})) 

}))