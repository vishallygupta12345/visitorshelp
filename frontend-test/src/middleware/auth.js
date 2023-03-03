import { Navigate } from "react-router-dom";
import {useAuthStore} from '../store/storeTestKey.js'


// to protect scanning page from unauthorized users
export const Authorize = ({ children }) => {
    const testKey = useAuthStore.getState().auth.testKey;
    if(!testKey){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}