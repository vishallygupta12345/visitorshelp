import React from 'react';
import { Link } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

import './reader.css';
import styles from '../../styles/Home.module.css'
import extend from '../../styles/profile.module.css'
import avatar from '../../assets/avatar.jpg'
import useFetch from '../../hooks/fetch.hook.js';
import { gateRegister } from '../../helper/helper';

const Reader = () => {

    const[{isLoading, apiData, serverError}] = useFetch();

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();

    if(apiData?.enddate < `${year}-${month<10 ? `0${month}`:`${month}`}-${date<10 ? `0${date}`:`${date}`}`){
        toast.error("The Guest's period is over !!!");
    }

    const guestname = apiData?.guestname;
    const inviteename = apiData?.inviteename;
    const guestnumber = apiData?.guestnumber;
    const ID = apiData?.ID;
    const time = new Date().toLocaleString();

    async function onClick(e){
        e.preventDefault();
        try{
            if(apiData?.enddate < `${year}-${month<10 ? `0${month}`:`${month}`}-${date<10 ? `0${date}`:`${date}`}`){
                toast.error("Cannot save! Guest's period is over.");
            }else{
                let registerPromise = gateRegister(inviteename, guestname, guestnumber, ID, time)
                toast.promise(registerPromise, {
                    loading: 'Registering...',
                    success: <b>Registered Successfully !!!</b>,
                    error: <b>Can't Register!</b>
                });
                registerPromise.then()
            }
        }catch (error){
            return toast.error("Can't save right now!");
         }
    }

  return (
    <div className='container mx-auto'>

        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className='flex justify-center items-center h-fit'>
        {/* style={{width: "80%", paddingTop: '3em'}} */}
            <div className={`${styles.glass} ${extend.glass}`}>

                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Data Received</h4>
                    <span className='py-4 text-xl w-3/3 text-center text-gray-500'>
                        You can now verify the data.
                    </span>
                </div>

                <form className='py-1'>

                    <div className='profile flex justify-center py-4'>
                           
                            {/* src={apiData?.profile || file || avatar} */}
                            <div className='profile flex justify-center py-4'>
                              <img src={apiData?.profile || avatar} alt="avatar" className={styles.profile_img}/>
                            </div>  
                          
                    </div>

                    <div className='textbox flex flex-col items-center gap-6'>
                        

                        <span className='py-4 text-2xl w-3/3 text-center text-gray-1000'>
                            The Guest can come from <span style={{fontWeight:"bolder"}}>{apiData?.startdate}</span> to <span style={{fontWeight:"bolder"}}>{apiData?.enddate}</span>.
                        </span>
                        
                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Invitee's Name : </span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.inviteename}</span>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Invitee's Employee Id</span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.inviteeId}</span>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Invitee's Email </span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.email}</span>
                        </div>  

                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Guest's Name</span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.guestname}</span>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Guest's Email</span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.guestemail}</span>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Guest's Contact Number</span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.guestnumber}</span>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Guest's Address</span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.guestaddress}</span>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Guest's Adhaar</span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.guestadhaar}</span>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Guest's Designation</span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.guestdesignation}</span>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Visiting Location</span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.location}</span>
                        </div>

                        <div className="name flex w-3/4 gap-10 additional">
                            <span  className={`${styles.textbox} ${extend.textbox}`} >Additional Information</span>
                            <span  className={`${styles.textbox} ${extend.textbox}`} >{apiData?.additional}</span>
                        </div>
                        
                        <button className={styles.btn} onClick={onClick}> Verified ! </button>
                        
                        <button className={styles.btn} onClick={onClick}><Link to={'/'}> Back to Home Page </Link></button>

                    </div>

                </form>

            </div>
        </div>
    </div>
  );
};

export default Reader