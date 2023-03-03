import React from 'react'
import { useNavigate } from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';
import {useFormik} from 'formik'

import styles from '../styles/Home.module.css'
import {sendValidation} from '../helper/validate'
import { sendMail } from '../helper/helper';

import { usekeyStore } from '../store/storeKey';
import { useGStore } from '../store/storeGuestName'
import { useIStore } from '../store/storeInviteeName'
import { useStartStore } from '../store/storeStartDate';
import { useEndStore } from '../store/storeEndDate';

function QR() {

    const navigate = useNavigate();

    const ID = usekeyStore(state => state.auth.ID);
    const inviteename = useIStore(state => state.auth.inviteename);
    const guestname = useGStore(state => state.auth.guestname);
    const startdate = useStartStore(state => state.auth.startdate);
    const enddate = useEndStore(state => state.auth.enddate);

    const formik = useFormik({
        initialValues: {
            emails: ''
        },
        validate: sendValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {

            values = await Object.assign(values);
            //setTestKey(values.ID);
            console.log(values);

            let mailPromise = sendMail(values.emails, guestname, inviteename, startdate, enddate)
            toast.promise(mailPromise, {
                loading: 'Sending...',
                success: <b>Sent Successfully !!!</b>,
                error: <b>Can't send!</b>
            });
            mailPromise.then()

        }
    })

    async function onSubmit(e){
        e.preventDefault();
        try{
            navigate('/')
        }catch (error){
            return toast.error("Can't go back right now!");
         }
    }

  return (
    <div className='container mx-auto'>

        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className='flex justify-center items-center h-fit'>
        {/* style={{marginTop:'150px'}} */}
            <div className={styles.glass} >

                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>You got the key !!</h4>
                </div>

                <br></br><br></br>

                <div className='title flex flex-col items-center'>
                    <h2 className='text-2xl font-bold'>Unique Key : {ID}</h2>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        Your guest must have this key while entering the gate.
                    </span>
                </div>

                <br></br>

                <form className='py-1'>

                    <div className='textbox flex flex-col items-center gap-6'>

                        <span className='text-xl w-3/3 text-center text-gray-700'>
                            Need to Inform someone? Send a quick mail and inform them.
                        </span>

                        <input {...formik.getFieldProps('emails')} className={styles.textbox} type= "text" placeholder="Enter Email"/>
                    
                    </div>

                </form>

                <br></br>

                <div className='textbox flex flex-col items-center gap-6'>

                    <button onClick={formik.handleSubmit} style={{width:'400px'}} className={`${styles.btn}`} type='submit'>Send mail !</button>
                    
                    <span className='text-xl w-3/3 text-center text-gray-700'>
                        OR                    
                    </span>

                    <button onClick ={onSubmit} className={styles.btn} style={{width:'500px'}}>Get back to Home Page</button>
                
                </div>

            </div>
        </div>
    </div>
  )
}

export default QR