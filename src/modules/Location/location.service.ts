import { Location } from "./location.model"
import { Hotel } from "../Hotel/hotel.Model"

export default class location {

  public static async findAll() {
    return await Location.findAll({})
  }

  public static async findOne(id: any) {
    return await Location.findOne({ where: { id } })
  }

  public static async Create(all: any) {
    return await Location.create(all)
  }

  public static async Update(updated: any, query: any) {
    return await Location.update(updated, query)
  }

  public static async Destroy(deleted: any) {
    return await Location.destroy(deleted)
  }

  public static async find(id:any) {
    return await Hotel.findOne({ where: { id } })
  }

}