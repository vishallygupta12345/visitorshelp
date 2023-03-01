// create mongoose schema

import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    inviteename: {
        type: String,
        required: [true, "Please provide Invitee name"],
        unique : false,
    },
    inviteeId: {
        type: String,
        required: [true, "Please provide Invitee Employee ID"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide Invitee email"],
        unique: false,
    },
    guestname : {
        type: String,
        required : [true, "Please provide a Guest name"],
        unique: false,
    },
    guestemail: {
        type: String,
        required : [true, "Please provide Guest's email"],
        unique: false,
    },
    guestnumber : {
        type: String,
        required : [true, "Please provide a Guest number"],
        unique: false,
    },
    guestaddress : {
        type: String,
        required : [true, "Please provide a Guest address"],
        unique: false,
    },
    guestadhaar : {
        type: String,
        required : [true, "Please provide a Guest adhaar"],
        unique: false,
    },
    guestdesignation : {
        type: String,
        required : [true, "Please provide a Guest designation"],
        unique: false,
    },
    startdate : {
        type: String,
        required : [true, "Please provide start date"],
        unique: false,
    },
    enddate : {
        type: String,
        required : [true, "Please provide end date"],
        unique: false,
    },
    ID : {
        type: String,
        required : [true, "Please provide ID"],
        unique: true,
    },
    profile: { type: String}
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);