import create from 'zustand';

export const useIdStore = create((set) => ({
    auth : {
        inviteeId : '',
        active : false
    },
    setInviteeId : (name) => set((state) => ({ auth : { ...state.auth, inviteeId : name }})) 

}))