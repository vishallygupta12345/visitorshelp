import create from 'zustand';

export const useProfileStore = create((set) => ({
    auth : {
        profile : '',
        active : false
    },
    setProfile : (name) => set((state) => ({ auth : { ...state.auth, profile : name }})) 

}))