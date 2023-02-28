import React, { useState, useEffect} from 'react'
import toast,{Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

import {verifyOTP , generateOTP, registerUser} from '../helper/helper';
import styles from '../styles/Home.module.css'
import generator from '../helper/idGenerator';

import { useStartStore } from '../store/storeStartDate'
import { useEndStore } from '../store/storeEndDate'
import { useDesignationStore } from '../store/storeGuestDesignation'
import { useAdhaarStore } from '../store/storeGuestAdhaar'
import { useAddressStore } from '../store/storeGuestAddress'
import { useNumberStore } from '../store/storeGuestNumber'
import { useGemailStore } from '../store/storeGuestEmail'
import { useGStore } from '../store/storeGuestName'
import { useIdStore } from '../store/storeInviteeId'
import { useEStore } from '../store/storeEmail'
import { useIStore } from '../store/storeInviteeName'
import { usekeyStore } from '../store/storeKey';
import { useProfileStore } from '../store/storeProfile';

function OTP() {

    const [OTP, setOTP] = useState();

    const navigate = useNavigate();

    const email = useEStore(state => state.auth.email);
    const inviteename = useIStore(state => state.auth.inviteename);
    const inviteeId = useIdStore(state => state.auth.inviteeId);

    const guestname = useGStore(state => state.auth.guestname);
    const guestemail = useGemailStore(state => state.auth.guestemail);
    const guestnumber = useNumberStore(state => state.auth.guestnumber);
    const guestaddress = useAddressStore(state => state.auth.guestaddress);
    const guestadhaar = useAdhaarStore(state => state.auth.guestadhaar);
    const guestdesignation = useDesignationStore(state => state.auth.guestdesignation);

    const startdate = useStartStore(state => state.auth.startdate);
    const enddate = useEndStore(state => state.auth.enddate);
    
    const profile = useProfileStore(state => state.auth.profile);

    //generating a random ID
    const setID = usekeyStore(state => state.setID);
    var id; 

    useEffect(()=>{
        id = generator()
       // console.log(id)
        setID(id);
        console.log(id, profile);
      }, [])
      
      
    const ID = usekeyStore(state => state.auth.ID);

    
    
    async function onSubmit(e){
        e.preventDefault();
        try{
            let {status} = await verifyOTP({code:OTP})
            if (status === 201){
                toast.success('Verify Successful!');
        
                try{
                    let {status} = await registerUser(email, inviteename, inviteeId, guestname, guestemail, guestnumber, guestaddress, guestadhaar, guestdesignation, startdate, enddate, ID, profile)
                    
                    if (status === 201) {
                        toast.success('Submitted');
                        return navigate('/qr');
                    }
                    
                }catch (error){
                    return toast.error('Cannot save');
                }

            }
        }catch (error){
            return toast.error('Wrong OTP! Check your email again!');
         }
    }

    // handler of sending OTP
    function sendOTP(){

        let sentPromise = generateOTP(email, guestname, inviteename);

        toast.promise(sentPromise ,
        {
            loading: 'Sending...',
            success: <b>OTP has been send to your email!</b>,
            error: <b>Could not Send it!</b>,
        }
        );

        sentPromise.then((OTP) => {
        console.log(OTP);
        });
    
  }

  return (
    <div className='container mx-auto'>

        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className='flex justify-center items-center h-fit'>
            <div className={styles.glass}>

                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>OTP Verification</h4>
                </div>

                <br></br><br></br>

                <div className='flex flex-col items-center gap-6'>
                
                    <span className='text-sm text-left text-gray-500' style={{paddingTop:'0'}}>
                        OTP will be sent to email address of your Invitee.                            
                    </span>
                    <button className={styles.btn} type="submit" onClick={sendOTP} >Get OTP</button>
            
                </div>
                
                <form className='pt-20' onSubmit={onSubmit}>  

                    <div className='textbox flex flex-col items-center gap-6'>

                        <span className='text-xl w-3/3 text-center text-gray-700'>
                            Enter OTP to get the Unique key.
                        </span>

                        <div className='input text-center'>
                            <input onChange={(e) => setOTP(e.target.value)} className={styles.textbox} type= "text" placeholder="OTP"/>
                        </div>

                        <button className={styles.btn} type="submit">Get Unique Key</button>
                        
                    </div>

                </form>

                <br></br>
                
                <div className='text-center py-4'>
                        <span className='text-gray-500'>Cant't get OTP? <button onClick={sendOTP} className='text-red-500'> Resend OTP </button></span>
                </div>

            </div>
        </div>
    </div>
  )
}

export default OTP