import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from "./src/config/db.js";
import userRouter from './src/routes/userRoute.js';
import adminRouter from './src/routes/adminRoute.js';
import passport from 'passport';
import './src/config/passport.js';
import rateLimiter from './src/middlewares/rateLimiter.js';
import { stripeWebhook } from './src/controllers/orderController.js';

// App Config
const app = express();
const PORT = process.env.PORT || 8003;

connectDB();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
// app.use(cors({
//     origin: [
//         'http://localhost:5173', // Replace with your frontend URL
//         'http://localhost:5174'
//     ],
//     credentials: true
// }));

// Stripe webhook MUST come before express.json()
app.post(
    process.env.STRIPE_WEBHOOK_ENDPOINT || "/api/v1/user/stripe-webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public/temp'));
app.use(cookieParser());
app.use(passport.initialize());
// app.use(rateLimiter);

app.get('/', (req,res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});