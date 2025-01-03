"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_Model_1 = require("../modules/User/User.Model");
const hotel_Model_1 = require("../modules/Hotel/hotel.Model");
const hotelBooking_Model_1 = require("../modules/HotelBooking/hotelBooking.Model");
const hotelImages_model_1 = require("../modules/Hotel Images/hotelImages.model");
const user_emailmodel_1 = require("../modules/User/user.emailmodel");
const area_model_1 = require("../modules/Area/area.model");
const location_model_1 = require("../modules/Location/location.model");
require('dotenv').config();
console.log('DB Host:', process.env.db_Host);
console.log('DB Name:', process.env.db_Name);
console.log('DB User:', process.env.db_USER);
const sequelize = new sequelize_typescript_1.Sequelize(process.env.db_Name, process.env.db_USER, process.env.db_PASSWORD, {
    host: process.env.db_Host,
    logging: false,
    port: 3306,
    dialect: 'mysql',
    models: [User_Model_1.Users, hotel_Model_1.Hotel, hotelBooking_Model_1.hotelBooking, hotelImages_model_1.Image, user_emailmodel_1.Email, area_model_1.Area, location_model_1.Location]
});
User_Model_1.Users.hasOne(hotel_Model_1.Hotel, { foreignKey: "userId" });
User_Model_1.Users.hasOne(hotelBooking_Model_1.hotelBooking, { foreignKey: "userId" });
User_Model_1.Users.hasOne(hotelImages_model_1.Image, { foreignKey: "userId" });
User_Model_1.Users.hasOne(location_model_1.Location, { foreignKey: "userId" });
User_Model_1.Users.hasOne(area_model_1.Area, { foreignKey: "userId" });
hotel_Model_1.Hotel.hasMany(location_model_1.Location, { foreignKey: "hotelId" });
location_model_1.Location.hasMany(area_model_1.Area, { foreignKey: "locationId" });
hotel_Model_1.Hotel.hasOne(hotelBooking_Model_1.hotelBooking, { foreignKey: "hotelId" });
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
exports.default = sequelize;
