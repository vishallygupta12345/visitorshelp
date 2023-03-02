import React from 'react'
import {useNavigate } from 'react-router-dom'
import {toast, Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'

import {useAuthStore} from '../../store/storeTestKey.js'
import { verifyKey } from '../../helper/helper'
import { keyValidate } from '../../helper/validate'
import avatar from '../../assets/avatar.jpg'
import styles from '../../styles/Home.module.css'


function Test() {

    const navigate = useNavigate();

    const setTestKey = useAuthStore(state => state.setTestKey);

    const formik = useFormik({
        initialValues: {
            ID: ''
        },
        validate: keyValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {

            values = await Object.assign(values);
            setTestKey(values.ID);
            console.log(values);

            let loginPromise = verifyKey(values.ID)
            toast.promise(loginPromise, {
                loading: 'Checking...',
                success: <b>Login Successfully !!!</b>,
                error: <b>Password didn't match!</b>
            });
            loginPromise.then(res => {
                let {token} = res.data;
                localStorage.setItem('token',token);
                console.log(values)
                navigate('/scan')
            })

        }
    })

  return (
    <div className='container mx-auto'>

        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className='flex justify-center items-center h-fit'>
        {/* style={{marginTop:'90px'}} */}
            <div className={styles.glass} >

                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Visitor's Help!</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        Always here to help you.
                    </span>                
                </div>

                <div className='profile flex justify-center py-4'>
                        <img src={avatar} alt="avatar" className={styles.profile_img}/>
                </div>

                <form className='py-1'>

                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps('ID')} className={styles.textbox} type= "text" placeholder="Enter Unique Key"/>
                    </div>
                </form>

                <br></br>

                <button onClick={formik.handleSubmit} style={{width:'400px'}} className={`${styles.btn}`} type='submit'>Let's go</button>


            </div>
        </div>
    </div>
  )
}

export default Test