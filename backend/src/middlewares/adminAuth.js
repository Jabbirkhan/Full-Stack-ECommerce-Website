import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";

const adminAuth = async (req,res,next) => {
    try {
        let token;
        if(req.cookies.eCommerceAdminToken){
            token = req.cookies.eCommerceAdminToken
        }
        if(!token){
            return res.status(401).json({success:false, message:"Unautharized Access"});
        }
        
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decodeToken.id).select("-password");
        if(!admin){
            return res.status(403).json({success:false, message:"Forbiden Access"});
        }
        req.admin = admin
        next()
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}

export default adminAuth