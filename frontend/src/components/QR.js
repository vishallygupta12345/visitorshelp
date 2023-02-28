import React from 'react'
import { useNavigate } from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';

import styles from '../styles/Home.module.css'
import { usekeyStore } from '../store/storeKey';

function QR() {

    const navigate = useNavigate();

    const ID = usekeyStore(state => state.auth.ID);

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
            <div className={styles.glass} style={{marginTop:'150px'}} >

                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>You got the key !!</h4>
                </div>

                <br></br><br></br>

                <div className='title flex flex-col items-center'>
                    <h2 className='text-2xl font-bold'>Unique Key : {ID}</h2>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        Keep this key with yourself while entering the gate.
                    </span>
                </div>

                <br></br>

                <div className='textbox flex flex-col items-center gap-6'>
                <button onClick ={onSubmit} className={styles.btn} style={{width:'500px'}}>Get back to Home Page</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default QR