import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'

import { registerValidation } from '../helper/validate'
import avatar from '../assets/avatar.jpg'
import styles from '../styles/Home.module.css'
import convertToBase64 from '../helper/convert'

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
import { useProfileStore } from '../store/storeProfile'

function Home() {

    const navigate = useNavigate();

    const[file, setFile] = useState();
    
    const setInviteename = useIStore(state => state.setInviteename);
    const setInviteeId = useIdStore(state => state.setInviteeId);
    const setEmail = useEStore(state => state.setEmail);

    const setGuestname = useGStore(state => state.setGuestname);
    const setGuestemail = useGemailStore(state => state.setGuestemail);
    const setGuestnumber = useNumberStore(state => state.setGuestnumber);
    const setGuestaddress = useAddressStore(state => state.setGuestaddress);
    const setGuestadhaar = useAdhaarStore(state => state.setGuestadhaar);
    const setGuestdesignation = useDesignationStore(state => state.setGuestdesignation);

    const setStartdate = useStartStore(state => state.setStartdate);
    const setEnddate = useEndStore(state => state.setEnddate);

    const setProfile = useProfileStore(state => state.setProfile);

    const formik = useFormik({
        initialValues: {
            inviteename: '',
            inviteeId: '',
            email: '',

            guestname: '',
            guestemail: '',
            guestnumber: '',
            guestaddress: '',
            guestadhaar: '',
            guestdesignation: '',

            startdate: '',
            enddate: ''
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        
        onSubmit: async values => {
            setInviteename(values.inviteename);
            setEmail(values.email);
            setInviteeId(values.inviteeId)

            setGuestname(values.guestname);
            setGuestemail(values.guestemail);
            setGuestnumber(values.guestnumber);
            setGuestaddress(values.guestaddress);
            setGuestadhaar(values.guestadhaar);
            setGuestdesignation(values.guestdesignation);

            setStartdate(values.startdate);
            setEnddate(values.enddate);

            setProfile(file);

            console.log(values)
            navigate('/otp')
        }
    })

    //because formik doesn't support file input
    const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    }

  return (
    <div className='container mx-auto'>

        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className='flex justify-center items-center h-fit' style={{paddingTop: "20px",paddingBottom: "20px"}}>
            
            <div className={styles.glass} style={{width: "50%", paddingTop: '3em'}}>

                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Visitor's Help!</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        Always here to help you.
                    </span>
                </div>

                <div className='profile flex justify-center py-4'>
                        <img src={avatar} alt="avatar" className={styles.profile_img}/>
                </div>

                <form className='py-1' onSubmit={formik.handleSubmit}>

                    <div className='textbox flex flex-col items-center gap-6'>

                        <label htmlFor='invitee' className='py-4 text-xl w-3/3 text-center text-gray-500'>Enter Details of Invitee</label>
                        <input {...formik.getFieldProps('inviteename')} className={styles.textbox} type= "text" placeholder="Enter Invitee's Name"/>
                        <input {...formik.getFieldProps('inviteeId')} className={styles.textbox} type= "text" placeholder="Enter Invitee's Employee ID"/>
                        <input {...formik.getFieldProps('email')} className={styles.textbox} type= "text" placeholder="Enter Invitee's Email"/>
                        
                        <label htmlFor='guest' className='py-4 text-xl w-3/3 text-center text-gray-500'>Enter Details of Guest</label>
                        <input {...formik.getFieldProps('guestname')} className={styles.textbox} type= "text" placeholder="Enter Guest's Name"/>
                        <input {...formik.getFieldProps('guestemail')} className={styles.textbox} type= "text" placeholder="Enter Guest's Email"/>
                        <input {...formik.getFieldProps('guestnumber')} className={styles.textbox} type= "text" placeholder="Enter Guest's Contact Number"/>
                        <input {...formik.getFieldProps('guestaddress')} className={styles.textbox} type= "text" placeholder="Enter Guest's Address"/>
                        <input {...formik.getFieldProps('guestadhaar')} className={styles.textbox} type= "text" placeholder="Enter Guest's Adhaar"/>
                        <input {...formik.getFieldProps('guestdesignation')} className={styles.textbox} type= "text" placeholder="Enter Guest's Designation"/>

                        <label htmlFor='validity' className='py-4 text-xl w-3/3 text-center text-gray-500'>Guest can come within following time period.</label>
                        
                        <div className="name flex w-4/4 gap-10">
                            <label htmlFor='startdate'className={styles.textbox} style={{width:'180px'}}>Start Date</label>
                            <input {...formik.getFieldProps('startdate')} className={styles.textbox} type= "date"/>
                        </div>

                        <div className="name flex w-4/4 gap-10">
                            <label htmlFor='enddate'className={styles.textbox} style={{width:'180px'}}>End Date</label>
                            <input {...formik.getFieldProps('enddate')} className={styles.textbox} type= "date" />
                        </div>

                        <div className='name flex w-4/4 gap-10'>
                            
                            <label htmlFor='profile' className={styles.textbox} style={{width:'200px'}}>Guest's photo</label>
                            <input onChange={onUpload} type="file" id='profile' name='profile' className={styles.textbox} style={{width:'300px'}} />
                        
                        </div>

                        <button className={styles.btn} type="submit">Let's go!</button>

                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}

export default Home