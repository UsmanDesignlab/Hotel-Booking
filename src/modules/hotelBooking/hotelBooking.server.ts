import { hotelBooking} from "./hotelBooking.Model"
import { Hotel } from "../Hotel/hotel.Model"


export default class appointment {

  public static async findAll() {
    return await hotelBooking.findAll({})
  }

  public static async findOne(id: any) {
    return await hotelBooking.findOne({ where: { id } })
  }

  public static async Create(data: any) {
    return await hotelBooking.create(data)
  }


  public static async Update(updated: any, query: any) {
    return await hotelBooking.update(updated, query)
  }

  public static async destroy(deleted: any) {
    return await hotelBooking.destroy(deleted)
  }

  public static async findOneDoctor(id: any) {
    return await Hotel.findOne({ where: { id } })
  }

}