import React from 'react';
import { Link } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

import './reader.css';
import styles from '../../styles/Home.module.css'
import extend from '../../styles/profile.module.css'
import avatar from '../../assets/avatar.jpg'
import useFetch from '../../../../frontend/src/components/hooks/fetch.hook';

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

  return (
    <div className='container mx-auto'>

        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className='flex justify-center items-center h-fit'>
            <div className={`${styles.glass} ${extend.glass}`} style={{width: "80%", paddingTop: '3em'}}>

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
                        
                        <button className={styles.btn}> <Link to={'/test'}> Verified ! </Link></button>
                
                    </div>

                </form>

            </div>
        </div>
    </div>
  );
};

export default Reader