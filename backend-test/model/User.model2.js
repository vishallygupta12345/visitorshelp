import mongoose from "mongoose";
import ENV from '../config.js';

const UserSchema =  new mongoose.Schema({
    inviteename: {
        type: String,
        required: [true, "Please provide Invitee name"]
    },
    guestname : {
        type: String,
        required : [true, "Please provide a Guest name"]
    },
    guestnumber : {
        type: String,
        required : [true, "Please provide a Guest number"]
    },
    ID : {
        type: String,
        required : [true, "Please provide ID"]
    },
    time : {
        type: String,
        required : [true, "Please provide time"]
    },
});

const connect2 = mongoose.createConnection(ENV.ATLAS_URI2);
export const User = connect2.model("User", UserSchema);
export default User;

//export default mongoose.model.Users || mongoose.model('User2', UserSchema);