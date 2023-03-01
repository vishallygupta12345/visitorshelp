import UserModel from "../model/User.model.js";
import jwt from "jsonwebtoken";
import ENV from '../config.js';


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
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});

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


// pehle register //phir get data se saara data lena hai // then we will match data id
/** PUT: http://localhost:8282/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
// export async function updateUser(req,res){
//     try {
        
//         // const id = req.query.id;
//         const { userId } = req.user;

//         if(userId){
//             const body = req.body;

//             // update the data
//             UserModel.updateOne({ _id : userId }, body, function(err, data){
//                 if(err) throw err;
//                 console.log(data)
//                 return (res.status(201).send({ msg : "Record Updated...!"}))
//             })

//         }else{
//             return res.status(401).send({ error : "User Not Found...!"});
//         }

//     } catch (error) {
//         return res.status(401).send({ error });
//     }
// }

/** POST: http://localhost:8282/api/verifyCode 
 * @param: {
  "ID" : "example123",
  "code" : "admin123"
}
*/
// export async function verifyCode(req,res){
   
//     const { ID , code } = req.body;

//     try {
        
//         UserModel.findOne({ ID })
//             .then(user => {
//                 if(code === user.code){
//                         return res.status(200).send({
//                             msg: "Verify Successful...!",
//                             ID: user.ID
//                         });                                    
//                     }
//                     else{
//                         return res.status(400).send({ error: "Code does not Match"})
//                     }
//             })
//             .catch( error => {
//                 return res.status(404).send({ error : "ID not Found"});
//             })

//     } catch (error) {
//         return res.status(500).send({ error});
//     }
// }

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

