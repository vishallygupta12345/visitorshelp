import create from 'zustand';

export const usekeyStore = create((set) => ({
    auth : {
        ID : '',
        active : false
    },
    setID : (name) => set((state) => ({ auth : { ...state.auth, ID : name }})) ,

}))