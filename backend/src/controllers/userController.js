import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import transporter from "../config/nodeMailer.js";

const accessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Please enter a valid email!' });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists. Try other signin methods' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            provider: null,
            providerId: null,
            avatar: null,
            cartData: {},
        });

        const createdUser = await User.findById(user._id).select('-password');
        if (!createdUser) {
            return res.status(400).json({ message: 'User creation failed!' });
        }

        return res.status(201).json({ success: true, message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist!' });
        }

        if (!user.password) {
            return res.status(404).json({ success: false, message: "Please login using your OAuth provider" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const eCommerceUserToken = accessToken(user._id);
        if (!eCommerceUserToken) {
            return res.status(500).json({ message: 'Token generation failed!' });
        }

        const options = {
            httpOnly: true,
            // secure: true, // for production
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
        }

        return res.status(200)
            .cookie('eCommerceUserToken', eCommerceUserToken, options)
            .json({ success: true, message: 'Login successful!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const handleGoogleCallback = async (req, res) => {
    const profile = req.user;
    try {
        if (!profile) {
            return redirect('http://localhost:5173/login');
        }

        const name = profile.displayName;
        const email = profile.emails[0].value;
        const providerId = profile.id;
        const avatar = profile.photos[0].value || null;

        let user;
        user = await User.findOne({provider:"google", providerId});
        
        if(!user && email){
            user = await User.findOne({email});
            if(user){
                user.provider = "google";
                user.providerId = providerId;
                user.avatar = avatar;
                await user.save();
            }
        } else {
            user = await User.create({
                name,
                email,
                password: null,
                provider: "google",
                providerId,
                avatar,
                cartData: {},
            });
        }

        await user.save();

        const eCommerceUserToken = accessToken(user._id);
        if(!eCommerceUserToken){
            return res.status(400).json({success:false, message:"Access Token creation failed!"});
        }

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        }

        res.cookie("eCommerceUserToken", eCommerceUserToken, options);
        return res.redirect('http://localhost:5173/');
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const handleGithubCallback = async (req, res) => {
    const profile = req.user;
    try {
        if(!profile){
            return redirect('http://localhost:5173/login');
        }

        const name = profile.username;
        const providerId = profile.id;
        const email = profile._json?.email || null;
        const avatar = profile.photos?.[0]?.value || profile._json?.avatar_url;

        let user;
        user = await User.findOne({provider:"github", providerId});
        
        if(!user && email){
            user = await User.findOne({email});
            if(user){
                user.provider = "github";
                user.providerId = providerId;
                user.avatar = avatar;
                await user.save();
            }
        } else {
            user = await User.create({
                name,
                email,
                password: null,
                provider: "github",
                providerId,
                avatar,
                cartData: {},   
            });
        }

        await user.save();

        const eCommerceUserToken = accessToken(user._id);
        if(!eCommerceUserToken){
            return res.status(400).json({success:false, message:"Access Token creation failed!"});
        }

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        }

        res.cookie("eCommerceUserToken", eCommerceUserToken, options);
        return res.redirect('http://localhost:5173/');
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const verifyUser = async (req, res) => {
    try {
        return res.status(200).json({success:true, message:"User verified successfully"});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const userProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id).select("isAccountVerified");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({success:true, user});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("eCommerceUserToken", {
            httpOnly: true,
            secure: false,
            sameSite:"lax",
        });
        return res.status(200).json({success:true, message:"User logout successfully"});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const sendContactMessage = async (req, res) => {
  try {
    const {name, orderNumber, subject, message} = req.body;
    if (!name || !subject || !message) {
      return res.status(400).json({ success: false, message: "Fields are empty!" });
    }

    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (user.isAccountVerified === false) {
      return res.status(400).json({ success: false, message: "Account is not verified" });
    }

    const emailOption = {
      from: user.email,
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      text: `From ${name} and Order #${orderNumber}, ${message}`,
    };

    await transporter.sendMail(emailOption);

    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Send OTP to verify email
const sendVerifyEmailOtp = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found!" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ success: false, message: "Account is already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP

    user.verifyOtp = otp;
    user.verifyOtpExpiresAt = Date.now() +  5 * 60 * 1000; // 5 minutes 
    await user.save();

    const emailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verification email from LMS",
      text: `Your OTP for email verification is ${otp}`,
    };

    await transporter.sendMail(emailOption);

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Verify OTP to verify email
const verifyEmailOtp = async (req, res) => {
  try {
    const id = req.user._id;
    const { otp } = req.body;
    if(!otp) {
      return res.status(400).json({ success: false, message: "OTP is required" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found!" });
    }
    if (Date.now() > user.verifyOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpiresAt = null;

    await user.save();
    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Send OTP to reset password
const sendResetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found!" });
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP

    user.verifyResetOtp = otp;
    user.resetOtpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    const emailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset password OTP from LMS",
      text: `Your OTP for reset password is this ${otp}`,
    };

    await transporter.sendMail(emailOption);

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Verify OTP to reset password
const verifyResetPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "OTP is required" });
    }
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    }
    if (!user.resetOtpExpiresAt || Date.now() > user.resetOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if(user.verifyResetOtp === '' || user.verifyResetOtp !== otp){
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    
    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// user can reset password
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!newPassword || !email || !otp) {
      return res.status(400).json({ success: false, message: "Email, Otp and password are required!" });
    }
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    if (!user.resetOtpExpiresAt || Date.now() > user.resetOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if(user.verifyResetOtp === '' || user.verifyResetOtp !== otp){
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    user.verifyResetOtp = "";
    user.resetOtpExpiresAt = null;

    await user.save();
    
    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export {
    userRegister, userLogin, handleGoogleCallback, handleGithubCallback, verifyUser, logoutUser,
    userProfile, sendContactMessage,
  sendVerifyEmailOtp, verifyEmailOtp, sendResetPasswordOtp, verifyResetPasswordOtp, resetPassword,
};