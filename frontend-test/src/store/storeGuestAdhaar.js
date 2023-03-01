import create from 'zustand';

export const useAdhaarStore = create((set) => ({
    auth : {
        guestadhaar : '',
        active : false
    },
    setGuestadhaar : (name) => set((state) => ({ auth : { ...state.auth, guestadhaar : name }})) 

}))