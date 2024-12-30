import { Hotel } from "../Hotel/hotel.Model";
import { Location } from "../Location/location.model";
import { Area } from "../Area/area.model";
import { Hall } from "../HallDetails/halldetails.model";


export default class allHotel {
  public static async findAll(id: any) {
    return await Hotel.findOne({
      where: { id },
      attributes: ['id', 'hotelName'],
      include: [
        {
          model: Location,
          attributes: ['id', 'location'], 
          include: [
            {
              model: Area,
              attributes: ['id', 'area'], // Only include the area ID
              include: [
                {
                  model: Hall,
                  attributes: ['id', 'category', 'capacity', 'session', 'floor'], // Include only these fields from the hall
                },
              ],
            },
          ],
        },
      ],
    });
  }

  public static async find() {
    return await Hotel.findAll()
  }

  public static async findAllHall() {
    return await Hall.findAll({where:{isAvailable:true}})
  }
}
