import { Sequelize } from "sequelize-typescript";
import { Users } from "../modules/User/User.Model";
import { Hotel } from "../modules/Hotel/hotel.Model";
import { hotelBooking } from "../modules/HotelBooking/hotelBooking.Model";
import { Image } from "../modules/Hotel Images/hotelImages.model";
import { Email } from "../modules/User/user.emailmodel";
import { Area } from "../modules/Area/area.model";
import { Location } from "../modules/Location/location.model";


import dotenv from 'dotenv';

dotenv.config({ path: "../../.env" });

console.log('DB Host:', process.env.db_HOST);
const sequelize = new Sequelize(process.env.db_NAME as string, process.env.db_USER as string, process.env.db_PASSWORD, {
  host: process.env.db_HOST,
  logging: false,
  port: 3306,
  dialect: 'mysql',
  models: [Users, Hotel, hotelBooking, Image, Email, Area, Location]
});

Users.hasOne(Hotel, { foreignKey: "userId" })
Users.hasOne(hotelBooking, { foreignKey: "userId" })
Users.hasOne(Image, { foreignKey: "userId" })
Users.hasOne(Location, { foreignKey: "userId" })
Users.hasOne(Area, { foreignKey: "userId" })
Hotel.hasMany(Location, { foreignKey: "hotelId" })
Location.hasMany(Area, { foreignKey: "locationId" })
Hotel.hasOne(hotelBooking, { foreignKey: "hotelId" })



try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;