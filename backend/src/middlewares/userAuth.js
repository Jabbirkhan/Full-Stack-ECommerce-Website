import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const userAuth = async (req,res,next) => {
    try {
        let token;
        if(req.cookies.eCommerceUserToken){
            token = req.cookies.eCommerceUserToken
        }
        if(!token){
            return res.status(401).json({success:false, message:"Unautharized Access"});
        }
        const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodeToken.id).select("-password");
        if (!user) {
            return res.status(403).json({ success: false, message: "Forbiden Access" });
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}

export default userAuth