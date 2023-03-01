import create from 'zustand';

export const useAuthStore = create((set) => ({
    auth : {
        testKey : '',
        active : false
    },
    setTestKey : (name) => set((state) => ({ auth : { ...state.auth, testKey : name }})) 
}))