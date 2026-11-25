import { Admin } from '../models/adminModel.js';
import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import transporter from '../config/nodeMailer.js';

const accessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email!" });
    }

     // Here we match the received email with ADMN_EMAIL
    if(email !== process.env.ADMIN_EMAIL){
      return res.status(400).json({ success: false, message: "Email not matched with Admin Email!" });
    }

    const adminExist = await Admin.findOne({ email });
    
    // Here we check if length of admin is more than one
    const admins = await Admin.find();
    if (adminExist && admins.length > 0) {
      return res.status(400).json({ success: false, message: "Admin already registered, please login!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    })
    if (!admin) {
      return res.status(400).json({ success: false, message: "Admin registration failed. Please try again later" });
    }
    return res.status(200).json({ success: true, message: "Admin register successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const adminExist = await Admin.findOne({ email });
    if (!adminExist) {
      return res.status(400).json({ success: false, message: "Admin not exist!" });
    }

    const checkPassword = await bcrypt.compare(password, adminExist.password);
    if (!checkPassword) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const eCommerceAdminToken = accessToken(adminExist._id);

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    }

    return res.status(200)
      .cookie('eCommerceAdminToken', eCommerceAdminToken, options)
      .json({ success: true, message: "Admin login successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }

}

const adminVerify = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "Admin verified" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const adminLogout = async (req, res) => {
  try {
    res.clearCookie('eCommerceAdminToken', {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({ success: true, message: "Admin logout successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Send OTP to reset password
const sendResetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "admin not found!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP

    admin.verifyResetOtp = otp;
    admin.resetOtpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    await admin.save();

    const emailOption = {
      from: process.env.SENDER_EMAIL,
      to: admin.email,
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
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "admin not found" });
    }
    if (!admin.resetOtpExpiresAt || Date.now() > admin.resetOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if (admin.verifyResetOtp === '' || admin.verifyResetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// admin can reset password
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!newPassword || !email || !otp) {
      return res.status(400).json({ success: false, message: "Email, Otp and password are required!" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "admin not found" });
    }

    if (!admin.resetOtpExpiresAt || Date.now() > admin.resetOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if (admin.verifyResetOtp === '' || admin.verifyResetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    admin.password = hashedPassword;

    admin.verifyResetOtp = "";
    admin.resetOtpExpiresAt = null;

    await admin.save();

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export {
  adminRegister, adminLogin, adminVerify, adminLogout,
  sendResetPasswordOtp, verifyResetPasswordOtp, resetPassword,
};