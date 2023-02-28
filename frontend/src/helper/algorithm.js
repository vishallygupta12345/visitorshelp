import React from 'react'
import { useCodeStore } from '../store/storeCode';

function algorithm(guestname,guestemail,guestnumber,guestaddress,guestadhaar,guestdesignation) {

    var guestname = guestname;
    var guestnameFirstthree = guestname.substring(0,2);

    var guestemail = guestemail;
    var guestemailFirstthree = guestemail.substring(0,2);

    var guestnumber = guestnumber;
    var guestnumberFirstthree = guestnumber.substring(0,2);

    var guestaddress = guestaddress;
    var guestaddressFirstthree = guestaddress.substring(0,2);

    var guestadhaar = guestadhaar;
    var guestadhaarFirstthree = guestadhaar.substring(0,2);

    var guestdesignation = guestdesignation;
    var guestdesignationFirstthree = guestdesignation.substring(0,2);

    var final = guestnameFirstthree + guestemailFirstthree + guestnumberFirstthree + guestaddressFirstthree + guestadhaarFirstthree + guestdesignationFirstthree

    //console.log(final); 

  return (
    
    final
    
  )
}

export default algorithm