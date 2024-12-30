import { hotelBooking} from "./hotelBooking.Model"
import { Hall } from "../HallDetails/halldetails.model"


export default class booking {

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

  public static async find(id:number) {
    return await Hall.findOne({ where: { id } })
  }

  public static async findTwo(hallId:number) {
    return await hotelBooking.findOne({where:{hallId}});
  }

 public static async availability(hallId: string, isAvailable: boolean){
    await Hall.update(
      { isAvailable },
      { where: { id: hallId } }
    );
  };
  
}