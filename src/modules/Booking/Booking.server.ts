import { Booking } from "./Booking.Model"
import { Users } from "../User/User.Model"


export default class doctor {

  public static async findAll() {
    return await Booking.findAll({})
  }

  public static async findOne(id: string) {
    return await Booking.findOne({ where: { id } })
  }

  public static async find(email: any) {
    return await Users.findOne({ where: { email } })
  }

  public static async AllCreates(all: any) {
    return await Booking.create(all)
  }

  public static async Update(updated: any, query: any) {
    return await Booking.update(updated, query)
  }

  public static async Destroy(deleted: any) {
    return await Booking.destroy(deleted)
  }
  public static async findOneOne(userId: any) {
    return await Booking.findOne({ where: { userId } })
  }

  public static async findOneUser(id: any) {
    return await Users.findOne({ where: { id } })
  }


  public static async findAllDoctor(userId: any) {
    return await Booking.findAll({ where: { userId } })
  }
}