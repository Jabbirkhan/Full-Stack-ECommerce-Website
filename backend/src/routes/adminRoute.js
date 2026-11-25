import { Router } from "express";
import {
    adminLogin, adminLogout, adminRegister, adminVerify, resetPassword, sendResetPasswordOtp,
    verifyResetPasswordOtp
} from "../controllers/adminController.js";
import { deleteProduct, productList, updateAvailability, updateProduct, uploadProduct } from "../controllers/productController.js";
import { ordersList, updateStatus } from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import upload from "./../middlewares/multer.js";

const adminRouter = Router();

// Admin-related routes
adminRouter.route('/register').post(adminRegister);
adminRouter.route('/login').post(adminLogin);
adminRouter.route('/verify').get(adminAuth, adminVerify);
adminRouter.route('/logout').post(adminAuth, adminLogout);

adminRouter.route('/send-reset-password-otp').post(sendResetPasswordOtp);
adminRouter.route('/verify-reset-password-otp').post(verifyResetPasswordOtp);
adminRouter.route('/reset-password').post(resetPassword);

adminRouter.route('/addproduct').post(adminAuth, upload.fields([
    {name:"image1", maxCount:1},
    {name:"image2", maxCount:1},
    {name:"image3", maxCount:1},
    {name:"image4", maxCount:1},
]), uploadProduct);
adminRouter.route('/products').get(adminAuth, productList);
adminRouter.route('/deleteproduct/:id').delete(adminAuth, deleteProduct);
adminRouter.route('/update-availability/:id').patch(adminAuth, updateAvailability);
adminRouter.route('/updateproduct/:id').patch(adminAuth, upload.fields([
    {name:"image1", maxCount:1},
    {name:"image2", maxCount:1},
    {name:"image3", maxCount:1},
    {name:"image4", maxCount:1},
]), updateProduct);

adminRouter.route('/allorders').get(adminAuth, ordersList);
adminRouter.route('/updatestatus/:id').patch(adminAuth, updateStatus);

export default adminRouter;