// all API requests
import axios from 'axios';
import jwt_decode from 'jwt-decode';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
//axios.defaults.baseURL = 'https://help-backend.onrender.com';

// register user function 
export async function gateRegister(inviteename, guestname, guestnumber, ID, time){
    try {
        const { data , status } = await axios.post(`/api/register`, { inviteename, guestname, guestnumber, ID, time});

        if(status === 201){
            return { data, status }
           }
    
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** authenticate function */
export async function authenticate(ID){
    try {
        return await axios.post('/api/authenticate', { ID })
    } catch (error) {
        return { error : "Key doesn't exist...!"}
    }
}

/** login function */
export async function verifyKey( ID ){
    try {
        if(ID){
            const { data } = await axios.post('/api/login', { ID })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "ID doesn't exist...!"})
    }
}

/** update data function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Data...!"})
    }
}

/** To get username from Token */
export async function getID(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}
