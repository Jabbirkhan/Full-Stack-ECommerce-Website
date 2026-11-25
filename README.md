# E-Commerce Website

A modern, full-stack **E-Commerce Platform** built using the **MERN Stack** (**MongoDB, Express.js, React.js, and Node.js**).
The application delivers a complete online shopping experience with dedicated interfaces for **Customers** and a **Single Administrator**.
Customers can browse products, filter and search items, manage shopping carts, place orders using **Cash on Delivery (COD)** or **Stripe**, and track their order history. Administrators can manage products, monitor orders, update order statuses, and oversee store operations through a dedicated **Admin Dashboard**.

---

## 🚀 Features
### 👤 Customer Features
- ✅ User Registration & Login
- ✅ Email Verification with OTP
- ✅ Forgot Password & Password Reset
- ✅ Google OAuth Authentication
- ✅ GitHub OAuth Authentication
- ✅ Browse Product Catalog
- ✅ Category & Subcategory Filtering
- ✅ Product Search
- ✅ Product Sorting
- ✅ Server-Side Pagination
- ✅ Best Sellers Section
- ✅ New Arrivals Section
- ✅ Product Detail Pages
- ✅ Product Size Selection (S, M, L, XL, XXL, etc.)
- ✅ Shopping Cart Management
- ✅ Quantity Management
- ✅ Stripe Payment Integration
- ✅ Cash on Delivery (COD)
- ✅ Order History & Tracking
- ✅ Contact Form
- ✅ Responsive Design
---
### 👨💼 Admin Features
- ✅ Single Admin Account Restriction
- ✅ Secure Authentication
- ✅ OTP-Based Password Recovery
- ✅ Centralized Store Administration Dashboard
#### 🛍 Product Management
- Create Products
- Update Products
- Delete Products
- Manage Product Images
- Configure Product Sizes
- Manage Best Sellers
#### 📦 Order Management
- View Orders
- Update Order Status
- Review Customer Details
---
# 🛠 Technology Stack
## 🎨 Frontend
| Technology | Purpose |
|------------|----------|
| React.js | Customer Interface |
| Tailwind CSS | Styling |
| React Router DOM | Client-Side Routing |
| Context API | State Management |
| Axios | HTTP Requests |
---
## 🧩 Admin Dashboard
| Technology | Purpose |
|------------|----------|
| React.js | Admin Interface |
| Tailwind CSS | Styling |
---
## ⚡ Backend
| Technology | Purpose |
|------------|----------|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
| REST APIs | API Architecture |
---
## ☁️ Database & Storage
| Technology | Purpose |
|------------|----------|
| MongoDB Atlas | Database |
| Cloudinary | Image & File Storage |
| Multer | File Upload Handling |
---
## 🔐 Authentication & Security
| Technology | Purpose |
|------------|----------|
| JWT | Authentication |
| bcrypt | Password Hashing |
| HTTP Cookies | Token Storage |
| Google OAuth | Google Authentication |
| GitHub OAuth | GitHub Authentication |
| Upstash Redis | API Rate Limiting |
---
## 💳 Payment Integration
| Technology | Purpose |
|------------|----------|
| Stripe | Online Payment Processing |
| Cash on Delivery | Offline Payment Method |
---
## 📧 Email Services
| Technology | Purpose |
|------------|----------|
| Nodemailer | Email Delivery |
| SMTP | Email Transport |
---
## 🚀 Deployment
| Component | Platform |
|------------|----------|
| Customer Frontend | Vercel |
| Admin Dashboard | Vercel |
| Backend API | Render |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |
---
# 📂 Project Structure
```text
E-Commerce-Website/
│
├── frontend/        # Customer Frontend
├── admin/           # Admin Dashboard
├── backend/         # Express API & Business Logic
└── README.md
```
---
# ✨ Core Functionalities
## 🔍 Product Discovery
Customers can discover products through:
- Browse All Products
- Search Products
- Category Filtering
- Subcategory Filtering
- Product Sorting
- Server-Side Pagination
### Homepage Sections
- ⭐ Best Sellers
- 🆕 New Arrivals
- 🎯 Featured Collections
- 💎 Product Highlights
---
## 🛍 Product Details
Each product includes:
- Product Images
- Product Title
- Description
- Category
- Subcategory
- Price
- Available Sizes
- Best Seller Status
### Available Sizes
```text
S
M
L
XL
XXL
```
> Product sizes can be configured individually by the administrator.
---
## 🛒 Shopping Cart
Customers can:
- Add Products to Cart
- Select Product Size
- Increase Quantity
- Decrease Quantity
- Remove Products
- View Cart Item Count
### Cart Features
- Real-Time Cart Updates
- Quantity Management
- Dynamic Pricing Calculations
- Checkout Integration
---
## 📦 Order Management
The application provides a complete checkout and order fulfillment workflow.
### Customer Order Journey
1. Register / Login
2. Browse Products
3. View Product Details
4. Select Product Size
5. Add Products to Cart
6. Proceed to Checkout
7. Enter Shipping Address
8. Choose Payment Method
9. Place Order
10. Track Order Status
---
## 💳 Payment Methods
### Cash on Delivery (COD)
- Offline Payment Method
- Order Placed Instantly
- Payment Collected Upon Delivery
### Stripe Payment Gateway
- Secure Online Payments
- Stripe Checkout Integration
- Payment Verification
- Order Confirmation
---
## 📋 Order Information
Customers can view:
- Order Number
- Ordered Products
- Product Quantities
- Total Amount
- Payment Method
- Shipping Address
- Order Date
- Order Status
---
# 👤 Customer Account Management
## 🔐 Profile & Authentication
Customers can:
- Register & Login
- Verify Email
- Reset Password
- Manage Account
- Secure Logout
---
## 📬 Communication Pages
### ℹ️ About Page
Provides:
- Store Information
- Business Details
- Company Overview
### 📞 Contact Page
Allows customers to submit inquiries directly to the store via email notifications.
### 🔒 Privacy Policy
Provides access to privacy and data protection information.
---
# 👨💼 Admin Dashboard
The Admin Dashboard enables centralized management of products, orders, and store operations.
---
## 🛍 Product Management
Administrators can manage:
- Product Images
- Product Title
- Description
- Category
- Subcategory
- Price
- Product Sizes
- Best Seller Flag
### CRUD Operations
| Operation | Description |
|------------|------------|
| Create | Add New Products |
| Read | View Existing Products |
| Update | Modify Product Information |
| Delete | Remove Products |
---
## 📦 Order Management
Administrators can:
- View All Orders
- Monitor Payments
- Review Customer Information
- Update Order Status
- Track Order Activity
### Order Information Includes
- Order Number
- Customer Information
- Ordered Products
- Product Quantities
- Shipping Address
- Payment Method
- Order Amount
- Order Status
---
# 📱 Pages & Screens
## Customer Frontend
| Page | Description |
|--------|------------|
| Register | Customer Registration |
| Login | Customer Authentication |
| Home | Store Homepage |
| Product Catalog | Browse Products |
| Product Detail | Individual Product Information |
| Cart | Shopping Cart |
| Checkout | Order Checkout |
| Orders | Order History |
| About | Store Information |
| Contact | Contact Form |
| Privacy Policy | Privacy Information |
| Forgot Password | Password Recovery |
| Verify Email | OTP Verification |
---
## Admin Dashboard
| Page | Description |
|--------|------------|
| Register | Admin Registration |
| Login | Admin Authentication |
| Add Product | Create New Product |
| Product List | Manage Products |
| Update Product | Edit Product Information |
| Orders | Manage Customer Orders |
| Forgot Password | Password Recovery |
| Password Reset | Reset Admin Password |
---
# 🌐 API Architecture
The backend follows a REST API architecture with separate routes for customer and admin operations.
## Base Routes
```js
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
```
---
## 👤 Customer APIs
### Base URL
```text
/api/v1/user
```
| Method | Endpoint | Description |
|----------|-------------|-------------|
| POST | /register | Customer Registration |
| POST | /login | Customer Login |
| GET | /verify | Verify Customer Session |
| GET | /profile | Get Customer Profile |
| POST | /logout | Customer Logout |
| GET | /send-verify-email-otp | Send Verification OTP |
| POST | /verify-email-otp | Verify Email |
| POST | /send-reset-password-otp | Send Password Reset OTP |
| POST | /verify-reset-password-otp | Verify Reset OTP |
| POST | /reset-password | Reset Password |
| GET | /products | Get Product Catalog |
| POST | /addtocart | Add Item to Cart |
| PATCH | /updatecart | Update Shopping Cart |
| GET | /cart | Get Shopping Cart |
| POST | /send-contact-message | Send Contact Message |
| POST | /placeorder | Place COD Order |
| POST | /placestripeorder | Create Stripe Checkout |
| POST | /verifystripeorder | Verify Stripe Payment |
| GET | /orders | Get Customer Orders |
---
## 👨💼 Admin APIs
### Base URL
```text
/api/v1/admin
```
| Method | Endpoint | Description |
|----------|-------------|-------------|
| POST | /register | Admin Registration |
| POST | /login | Admin Login |
| GET | /verify | Verify Admin Session |
| POST | /logout | Admin Logout |
| POST | /send-reset-password-otp | Send Password Reset OTP |
| POST | /verify-reset-password-otp | Verify Reset OTP |
| POST | /reset-password | Reset Password |
| POST | /addproduct | Add Product |
| GET | /products | Get Products |
| PATCH | /updateproduct/:id | Update Product |
| DELETE | /deleteproduct/:id | Delete Product |
| GET | /allorders | Get All Orders |
| PATCH | /updatestatus/:id | Update Order Status |
---
# ☁️ Database & Storage
## MongoDB Atlas
Stores:
- Customer Accounts
- Admin Accounts
- Products
- Orders
- Cart Data
- Shipping Addresses
- Authentication Data
- Product Metadata
- Image URLs
---
## Cloudinary
Used for storing:
- Product Images
- Media Content
- Uploaded Files
- PDF Assets
---
# 📧 Email Services
Uses **Nodemailer** with **SMTP**.
### Supported Email Operations
- Email Verification OTPs
- Password Reset OTPs
- Contact Form Messages
- Account Notifications
---
# ⚙️ Environment Variables
## Backend (.env)
```env
PORT=
ADMIN_EMAIL=
MONGODB_URI=
DB_NAME=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SENDER_EMAIL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_WEBHOOK_ENDPOINT=
```
---
## Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:8003
```
---
## Admin Dashboard (.env)
```env
VITE_BACKEND_URL=http://localhost:8003
```
> **Note:** Configure the correct backend URL, OAuth callback URLs, Stripe credentials, and webhook endpoint before deployment.
---
# 🚀 Installation & Setup
## 1️⃣ Clone Repository
```bash
git clone https://github.com/Jabbirkhan/Full-Stack-ECommerce-Website.git
```
---
## 2️⃣ Install Dependencies
### Backend
```bash
cd backend
npm install
```
### Customer Frontend
```bash
cd frontend
npm install
```
### Admin Dashboard
```bash
cd admin
npm install
```
---
## 3️⃣ Configure Environment Variables
Create:
```text
backend/.env
frontend/.env
admin/.env
```
Configure credentials for:
- MongoDB Atlas
- Cloudinary
- SMTP
- Stripe
- Google OAuth
- GitHub OAuth
- Upstash Redis
---
## 4️⃣ Start Backend Server
```bash
cd backend
npm run server
```
---
## 5️⃣ Start Customer Frontend
```bash
cd frontend
npm run dev
```
---
## 6️⃣ Start Admin Dashboard
```bash
cd admin
npm run dev
```
✅ Customer Frontend, Backend, and Admin Dashboard will run as separate applications.
---
# 🔒 Security Features
- bcrypt Password Hashing
- JWT Cookie-Based Authentication
- Protected Routes
- Google OAuth Authentication
- GitHub OAuth Authentication
- Email Verification
- OTP-Based Password Recovery
- Input Validation
- Global Error Handling
- Secure File Upload Handling
- API Rate Limiting with Upstash Redis
---
# 📱 Responsive Design
Optimized for:
- 💻 Desktop Computers
- 💼 Laptops
- 📱 Mobile Devices
- 📟 Tablets
---
# ☁️ Deployment Architecture
| Component | Platform |
|------------|----------|
| Customer Frontend | Vercel |
| Admin Dashboard | Vercel |
| Backend REST API | Render |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |
---
# ✅ Testing Checklist
### Authentication
- [ ] Customer Registration
- [ ] Customer Login
- [ ] Customer Logout
- [ ] Email Verification
- [ ] Password Reset
- [ ] Google OAuth
- [ ] GitHub OAuth
### Product Management
- [ ] Create Product
- [ ] Update Product
- [ ] Delete Product
- [ ] Upload Product Images
- [ ] Configure Product Sizes
- [ ] Manage Best Sellers
### Shopping Experience
- [ ] Product Search
- [ ] Category Filtering
- [ ] Subcategory Filtering
- [ ] Product Sorting
- [ ] Server-Side Pagination
- [ ] Add to Cart
- [ ] Update Cart Quantity
- [ ] Remove Cart Items
### Orders & Payments
- [ ] COD Checkout
- [ ] Stripe Checkout
- [ ] Stripe Payment Verification
- [ ] Order History
- [ ] Order Status Updates
### Administration
- [ ] Single Admin Restriction
- [ ] Product Management
- [ ] Order Management
- [ ] Customer Information Review
### General
- [ ] Contact Form Email Delivery
- [ ] Responsive Layouts
- [ ] Production Environment Configuration
---
# 📄 License
This project is licensed under the **MIT License**.
---
# 👨💻 Author
Developed using:
- React.js
- Node.js
- Express.js
- MongoDB Atlas
- Cloudinary
- Stripe Payment Integration
- JWT Authentication
- Google & GitHub OAuth
- Tailwind CSS
---
