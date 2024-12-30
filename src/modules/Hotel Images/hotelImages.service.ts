import { Image } from "./hotelImages.model"



export default class image {

  public static async findAll() {
    return await Image.findAll({})
  }

  public static async findOne(id: string) {
    return await Image.findOne({ where: { id } })
  }

  public static async AllCreates(all: any) {
    return await Image.create(all)
  }

  public static async Update(updated: any, query: any) {
    return await Image.update(updated, query)
  }

  public static async Destroy(deleted: any) {
    return await Image.destroy(deleted)
  }

  public static async findOneOne(userId: any) {
    return await Image.findOne({ where: { userId } })
  }


  public static async findOneUser(id: any) {
    return await Image.findOne({ where: { id } })
  }

}