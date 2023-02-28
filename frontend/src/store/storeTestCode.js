import create from 'zustand';

export const useTestCodeStore = create((set) => ({
    auth : {
        testcode : '',
        active : false
    },
    setTestcode : (name) => set((state) => ({ auth : { ...state.auth, testcode : name }})) 

}))