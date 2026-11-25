import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        default:null,
        trim:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        default:null,
    },
    verifyOtpExpiresAt: {
        type: Date,
        default: null
    },
    verifyResetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpiresAt: {
        type: Date,
        default: null
    }
},{timestamps:true}); 

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

