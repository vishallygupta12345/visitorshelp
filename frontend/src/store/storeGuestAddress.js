import create from 'zustand';

export const useAddressStore = create((set) => ({
    auth : {
        guestaddress : '',
        active : false
    },
    setGuestaddress : (name) => set((state) => ({ auth : { ...state.auth, guestaddress : name }})) 

}))