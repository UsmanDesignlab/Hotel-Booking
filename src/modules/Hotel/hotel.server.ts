import { Hotel } from "./hotel.Model"
import { Users } from "../User/User.Model"



export default class hotel {

  public static async findAll() {
    return await Hotel.findAll({})
  }

  public static async findOne(id: string) {
    return await Hotel.findOne({ where: { id } })
  }

  public static async AllCreates(all: any) {
    return await Hotel.create(all)
  }

  public static async Update(updated: any, query: any) {
    return await Hotel.update(updated, query)
  }

  public static async Destroy(deleted: any) {
    return await Hotel.destroy(deleted)
  }

  public static async findOneOne(userId: any) {
    return await Hotel.findOne({ where: { userId } })
  }


  public static async findOneUser(id: any) {
    return await Users.findOne({ where: { id } })
  }

  public static async findOnePatient(userId: any) {
    return await Hotel.findOne({ where: { userId } })
  }


}