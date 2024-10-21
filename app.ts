import express from 'express';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import passport from 'passport';
import sequelize from './src/database/Index';
import hotelBooking from "./src/modules/hotelBooking/hotelBooking.routes"
import Booking from "./src/modules/Booking/Booking.routes"
import Hotel from "./src/modules/Hotel/hotel.routes"
import User from "./src/modules/User/User.routes"
import { isAdmin,isUser, isLoggedIn } from "./src/helper/isloggedIn"

dotenv.config({ path: './config.env' });

const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: 'Too many attempts. Please wait for one hour.',
});

const app = express();

// Middleware setup
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Apply rate limiter to all API routes
app.use('/api', limiter);
app.use("/api", User)
app.use("/api/booking", isLoggedIn, Booking)
app.use("/api/hotel", isLoggedIn, Hotel)
app.use("/api/hotelBooking", isLoggedIn,hotelBooking)



// Open route for testing
app.get('/', (req, res) => {
  res.send('App is Running');
});

sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
