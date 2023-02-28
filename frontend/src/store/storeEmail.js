import create from 'zustand';

export const useEStore = create((set) => ({
    auth : {
        email : '',
        active : false
    },
    setEmail : (ename) => set((state) => ({ auth : { ...state.auth, email : ename }})) 

}))