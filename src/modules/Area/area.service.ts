import { Location } from "../Location/location.model"
import { Area } from "./area.model"

export default class area {

  public static async findAll() {
    return await Area.findAll({})
  }

  public static async findOne(id: any) {
    return await Area.findOne({ where: { id } })
  }

  public static async Create(all: any) {
    return await Area.create(all)
  }

  public static async Update(updated: any, query: any) {
    return await Area.update(updated, query)
  }

  public static async Destroy(deleted: any) {
    return await Area.destroy(deleted)
  }

  public static async findOneUser(id: any) {
    return await Location.findOne({ where: { id } })
  }

}