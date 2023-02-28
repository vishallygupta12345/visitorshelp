import create from 'zustand';

export const useEndStore = create((set) => ({
    auth : {
        enddate : '',
        active : false
    },
    setEnddate : (name) => set((state) => ({ auth : { ...state.auth, enddate : name }})) 

}))