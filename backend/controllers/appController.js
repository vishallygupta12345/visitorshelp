import UserModel from "../model/User.model.js";
import otpGenerator from 'otp-generator';
import jwt from "jsonwebtoken";
import ENV from '../config.js';

/** POST: http://localhost:8282/api/register 
 * @param : {
  "inviteename" : "xyz",
  "inviteeId": "abc",
  "email" : "xyz@iitjammu.ac.in",

  "guestname" : "Vishally Gupta",
  "guestemail" : "abc@gmail.com",
  "guestnumber" : "6767676767",
  "guestaddress" : "asdfghjkl",
  "guestadhaar" : "asdfghjkl",
  "guestdesignation" : "abc",

  "startdate" : "dfghjk",
  "enddate" : "asdfghjk",

  "ID" : "rtrtrtrt"
}
*/
export async function register(req,res){
    try {
        const {email, inviteename, inviteeId, guestname, guestemail, guestnumber, guestaddress, guestadhaar, guestdesignation, startdate, enddate, ID, profile} = req.body;        

                //saving data in db
                const user = new UserModel({
                    email, 
                    inviteename, 
                    inviteeId, 
                    guestname, 
                    guestemail, 
                    guestnumber, 
                    guestaddress, 
                    guestadhaar, 
                    guestdesignation,
                    startdate,
                    enddate,
                    ID,
                    profile
                });

                // return save result as a response
                user.save()
                    .then(result => {
                        res.status(201).send({ msg: "User Register Successfully"});
                        console.log(result)
                    })
                    .catch(error => res.status(500).send({error}))

    } catch (error) {
        return res.status(500).send(error);
    }
}

/** GET: http://localhost:8282/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8282/api/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for next
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


//middleware for verify user 
export async function verifyUser(req, res, next){
    try {
        
        const { ID } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ ID });
        if(!exist) return res.status(500).send({ error : "Can't find Key!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}

/** POST: http://localhost:8282/api/login 
 * @param: {
  "ID" : "sdfghjk"
}
*/
export async function login(req,res){
   
    const { ID } = req.body;

    try {
        
        UserModel.findOne({ ID })
            .then(user => {
    
                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        ID : user.ID
                                    }, process.env.JWT_SECRET , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            ID: user.ID,
                            token
                        });                                    

            })
            .catch( error => {
                return res.status(404).send({ error : "ID not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}

/** GET: http://localhost:8282/api/user/example123 */
export async function getUser(req,res){
    
    const { ID } = req.params;

    try {
        
        if(!ID) return res.status(501).send({ error: "Invalid ID"});

        UserModel.findOne({ ID }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const {  ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }

}

