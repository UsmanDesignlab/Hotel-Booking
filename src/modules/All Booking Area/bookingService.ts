import { Area } from "../Area/area.model"
import { hotelBooking } from "../HotelBooking/hotelBooking.Model"




export default class BookingArea {

  public static async findALL() {
    return await Area.findAll()
  }

  public static async find(id:any) {
    return await hotelBooking.findAll({where:{id}})
  }
}
