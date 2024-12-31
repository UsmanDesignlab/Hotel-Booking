import express from 'express';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import passport from 'passport';
import sequelize from './src/database/Index';
import hotelBooking from './src/modules/HotelBooking/hotelBooking.routes';
import Hotel from "./src/modules/Hotel/hotel.routes"
import User from "./src/modules/User/User.routes"
import hotelImages from "./src/modules/Hotel Images/hotelImages.routes"
import Location from "./src/modules/Location/location.routes"
import Area from "./src/modules/Area/area.routes"
import Hall from "./src/modules/HallDetails/halldetails.routes"
import All from "./src/modules/All Hall/all.routes"
import Booking from "./src/modules/All Booking/booking.routes"
import AllArea from "./src/modules/All Booking Area/bookingArea.routes"


dotenv.config({ path: '.env' });

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
app.use("/api/hotel", Hotel)
app.use("/api/location", Location)
app.use("/api/area", Area)
app.use("/api/hall", Hall)
app.use("/api/all", All)
app.use("/api/booking", hotelBooking)
app.use("/api/allBooking", Booking)
app.use("/api/images", hotelImages)
app.use("/api/allArea", AllArea)


// Open route for testing
app.get('/', (req, res) => {
  res.send('App is Running');

});

sequelize.sync({ force: false });
console.log('All models were synchronized successfully.');

app.listen(process.env.PORT || 4000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});