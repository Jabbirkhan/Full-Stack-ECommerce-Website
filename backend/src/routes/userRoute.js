import Router from "express";
import { handleGithubCallback, handleGoogleCallback, logoutUser, resetPassword, sendContactMessage, sendResetPasswordOtp, sendVerifyEmailOtp, userLogin, userProfile, userRegister, verifyEmailOtp, verifyResetPasswordOtp, verifyUser } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";
import passport from 'passport';
import { addToCart, updateCart, userCart } from "../controllers/cartController.js";
import { placeOrder, placeStripeOrder, userOrder, verifyStripeOrder } from "../controllers/orderController.js";
import { productList } from "../controllers/productController.js";

const userRouter = Router();

// User-related routes
userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);
userRouter.route('/verify').get(userAuth, verifyUser);
userRouter.route('/profile').get(userAuth, userProfile);
userRouter.route('/logout').post(userAuth, logoutUser);

userRouter.route('/send-verify-email-otp').get(userAuth, sendVerifyEmailOtp);
userRouter.route('/verify-email-otp').post(userAuth, verifyEmailOtp);
userRouter.route('/send-reset-password-otp').post(sendResetPasswordOtp);
userRouter.route('/verify-reset-password-otp').post(verifyResetPasswordOtp);
userRouter.route('/reset-password').post(resetPassword);

userRouter.route("/send-contact-message").post(userAuth, sendContactMessage);

userRouter.route('/products').get(userAuth, productList);

userRouter.route('/addtocart').post(userAuth, addToCart);
userRouter.route('/updatecart').patch(userAuth, updateCart);
userRouter.route('/cart').get(userAuth, userCart);

userRouter.route('/placeorder').post(userAuth, placeOrder);
userRouter.route('/placestripeorder').post(userAuth, placeStripeOrder);
userRouter.route('/verifystripeorder').post(userAuth, verifyStripeOrder);
userRouter.route('/orders').get(userAuth, userOrder);

userRouter.route('/google').get(passport.authenticate('google', {scope : ["email", "profile"]}));
userRouter.route('/google/callback').get(passport.authenticate('google', {session: false}), handleGoogleCallback);

userRouter.route('/github').get(passport.authenticate('github', {scope: ["user:email"]}));
userRouter.route('/github/callback').get(passport.authenticate('github', {session: false}), handleGithubCallback);

export default userRouter;