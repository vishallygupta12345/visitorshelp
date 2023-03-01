// all API requests
import axios from 'axios';
import jwt_decode from 'jwt-decode';
//axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
axios.defaults.baseURL = 'https://help-backend.onrender.com';

// register user function 
export async function registerUser(email, inviteename, inviteeId, guestname, guestemail, guestnumber, guestaddress, guestadhaar, guestdesignation, startdate, enddate, ID, profile){
    try {
        const { data , status } = await axios.post(`/api/register`, { email, inviteename, inviteeId, guestname, guestemail, guestnumber, guestaddress, guestadhaar, guestdesignation, startdate, enddate, ID, profile});

        if(status === 201){
            return { data, status }
           }
    
    } catch (error) {
        return Promise.reject({ error })
    }
}


// generate OTP 
export async function generateOTP(email, guestname, inviteename){
    
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP');

        // send mail with the OTP
        if(status === 201){
            let text = `Generated OTP is ${code}. Give this OTP to your invited person so that he/she can enter the campus.`;
            await axios.post('/api/registerMail', {inviteename: inviteename, guestname: guestname, Email: email, text, subject: "OTP Recieved"})
        }

        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

// verify OTP 
export async function verifyOTP({ code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { code }})

       if(status === 201){
        return { data, status }
       }

    } catch (error) {
        return Promise.reject(error);
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

/** verifying code function */
export async function verifyCode( ID, code ){
    try {
        if(ID){
            const { data } = await axios.post('/api/verifyCode', { ID, code })
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
