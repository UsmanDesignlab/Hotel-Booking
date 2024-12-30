import { hotelBooking } from "../HotelBooking/hotelBooking.Model";



export default class allBooking {

  public static async findOne(userId:any) {
    return await hotelBooking.findAll({where:{userId}})
  }

  public static async findAll() {
    return await hotelBooking.findAll()
  }
}
