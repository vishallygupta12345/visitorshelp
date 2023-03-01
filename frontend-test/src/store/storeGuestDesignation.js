import create from 'zustand';

export const useDesignationStore = create((set) => ({
    auth : {
        guestdesignation : '',
        active : false
    },
    setGuestdesignation : (name) => set((state) => ({ auth : { ...state.auth, guestdesignation : name }})) 

}))