import create from 'zustand';

export const useIStore = create((set) => ({
    auth : {
        inviteename : '',
        active : false
    },
    setInviteename : (iname) => set((state) => ({ auth : { ...state.auth, inviteename : iname }})) ,

}))