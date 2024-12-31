"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const method_override_1 = __importDefault(require("method-override"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const Index_1 = __importDefault(require("./src/database/Index"));
const hotelBooking_routes_1 = __importDefault(require("./src/modules/HotelBooking/hotelBooking.routes"));
const hotel_routes_1 = __importDefault(require("./src/modules/Hotel/hotel.routes"));
const User_routes_1 = __importDefault(require("./src/modules/User/User.routes"));
const hotelImages_routes_1 = __importDefault(require("./src/modules/Hotel Images/hotelImages.routes"));
const location_routes_1 = __importDefault(require("./src/modules/Location/location.routes"));
const area_routes_1 = __importDefault(require("./src/modules/Area/area.routes"));
const halldetails_routes_1 = __importDefault(require("./src/modules/HallDetails/halldetails.routes"));
const all_routes_1 = __importDefault(require("./src/modules/All Hall/all.routes"));
const booking_routes_1 = __importDefault(require("./src/modules/All Booking/booking.routes"));
const bookingArea_routes_1 = __importDefault(require("./src/modules/All Booking Area/bookingArea.routes"));
dotenv_1.default.config({ path: '.env' });
const limiter = (0, express_rate_limit_1.default)({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: 'Too many attempts. Please wait for one hour.',
});
const app = (0, express_1.default)();
// Middleware setup
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(passport_1.default.initialize());
// Apply rate limiter to all API routes
app.use('/api', limiter);
app.use("/api", User_routes_1.default);
app.use("/api/hotel", hotel_routes_1.default);
app.use("/api/location", location_routes_1.default);
app.use("/api/area", area_routes_1.default);
app.use("/api/hall", halldetails_routes_1.default);
app.use("/api/all", all_routes_1.default);
app.use("/api/booking", hotelBooking_routes_1.default);
app.use("/api/allBooking", booking_routes_1.default);
app.use("/api/images", hotelImages_routes_1.default);
app.use("/api/allArea", bookingArea_routes_1.default);
// Open route for testing
app.get('/', (req, res) => {
    res.send('App is Running');
});
Index_1.default.sync({ force: false });
console.log('All models were synchronized successfully.');
app.listen(process.env.PORT || 4000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});
