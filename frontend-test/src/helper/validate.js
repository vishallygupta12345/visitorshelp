import toast from 'react-hot-toast'
import { authenticate } from './helper';


//validate Home page 
export async function registerValidation(values){
    const errors = emailVerify({}, values);
    inviteenameVerify(errors, values);
    inviteeIdVerify(errors, values);

    guestemailVerify(errors, values);
    guestnameVerify(errors, values);
    guestnumberVerify(errors, values);
    guestaddressVerify(errors, values);
    guestadhaarVerify(errors, values);
    guestdesignationVerify(errors, values);

    startdateVerify(errors, values);
    enddateVerify(errors,values);

    return errors;
}

// validate email 
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Invitee Email Required !!!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Invitee Email !!!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid Invitee email !!!")
    }else if(!values.email.includes("@iitjammu.ac.in")){
        error.email = toast.error("Invalid Invitee email !!!")
    }

    return error;
}

// validate Invitee name
function inviteenameVerify(error={}, values){
    if(!values.inviteename){
        error.inviteename = toast.error('Invitee name required !!!');
    }

    return error;
}

// validate Invitee id
function inviteeIdVerify(error={}, values){
    if(!values.inviteeId){
        error.inviteeId = toast.error('Invitee ID required !!!');
    }

    return error;
}

// validate Guest email
function guestemailVerify(error={}, values){
    if(!values.guestemail){
        error.guestemail = toast.error("Guest Email Required !!!");
    }else if(values.guestemail.includes(" ")){
        error.guestemail = toast.error("Wrong Guest Email !!!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.guestemail)){
        error.guestemail = toast.error("Invalid Guest email !!!")
    }

    return error;
}

// validate Guest name
function guestnameVerify(error={}, values){
    if(!values.guestname){
        error.guestname = toast.error('Guest name required !!!');
    }

    return error;
}

// validate Guest number
function guestnumberVerify(error={}, values){
    if(!values.guestnumber){
        error.guestnumber = toast.error('Guest number required !!!');
    }

    return error;
}

// validate Guest address
function guestaddressVerify(error={}, values){
    if(!values.guestaddress){
        error.guestaddress = toast.error('Guest address required !!!');
    }

    return error;
}

// validate Guest adhaar
function guestadhaarVerify(error={}, values){
    if(!values.guestadhaar){
        error.guestadhaar = toast.error('Guest adhaar required !!!');
    }

    return error;
}

// validate Guest designation
function guestdesignationVerify(error={}, values){
    if(!values.guestdesignation){
        error.guestdesignation = toast.error('Guest designation required !!!');
    }

    return error;
}

// validate start date
function startdateVerify(error={}, values){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();
    if(!values.startdate){
        error.startdate = toast.error('Start Date required !!!');
    }else if(values.startdate < `${year}-${month<10 ? `0${month}`:`${month}`}-${date<10 ? `0${date}`:`${date}`}`){
        error.startdate = toast.error('Start Date Invalid !!!');
    }

    return error;
}

// validate end date
function enddateVerify(error={}, values){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();
    console.log(`${year}-${month<10 ? `0${month}`:`${month}`}-${date<10 ? `0${date}`:`${date}`}`)
    if(!values.enddate){
        error.enddate = toast.error('End Date required !!!');
    }else if(values.enddate < `${year}-${month<10 ? `0${month}`:`${month}`}-${date<10 ? `0${date}`:`${date}`}`){
        error.enddate = toast.error('End Date Invalid !!!');
    }

    return error;
}

// validate key
export async function keyValidate(values){
    const errors = keyVerify({}, values);

    if(values.ID){
        // check user exist or not
        const { status } = await authenticate(values.ID);
        
        if(status !== 200){
            errors.exist = toast.error('Key does not exist...!')
        }
    }

    return errors;
}
function keyVerify(error={}, values){
    if(!values.ID){
        error.ID = toast.error('Key required !!!');
    }

    return error;
}







