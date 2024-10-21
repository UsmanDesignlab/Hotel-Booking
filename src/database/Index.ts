import { Sequelize } from "sequelize-typescript";
import { Users } from "../modules/User/User.Model";
import { Hotel } from "../modules/Hotel/hotel.Model";
import { hotelBooking } from "../modules/hotelBooking/hotelBooking.Model";
import { Booking } from "../modules/Booking/Booking.Model";


import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" });

const sequelize = new Sequelize(process.env.db_NAME as string, process.env.db_USER as string, process.env.db_PASSWORD, {
  host: process.env.db_HOST,
  logging: false,
  dialect: 'mysql',
  models: [Users,Hotel,hotelBooking,Booking]
});

Users.hasOne(Hotel, { foreignKey: "userId" })
Users.hasOne(hotelBooking, { foreignKey: "userId" })
Users.hasOne(Booking, { foreignKey: "userId" })
Hotel.hasOne(hotelBooking,{foreignKey:"hotelId"})

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;