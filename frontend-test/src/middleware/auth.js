import { Navigate } from "react-router-dom";
import { useGStore } from "../store/storeGuestName";
import {useAuthStore} from '../store/storeTestKey.js'

// to protect otp page from unauthorized users
export const ProtectRoute = ({ children }) => {
    const guestname = useGStore.getState().auth.guestname;
    if(!guestname){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}

// to protect scanning page from unauthorized users
export const Authorize = ({ children }) => {
    const testKey = useAuthStore.getState().auth.testKey;
    if(!testKey){
        return <Navigate to={'/test'} replace={true}></Navigate>
    }
    return children;
}