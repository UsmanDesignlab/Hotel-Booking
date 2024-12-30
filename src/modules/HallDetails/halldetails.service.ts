import { Area } from "../Area/area.model"
import { Hall } from "./halldetails.model"


export default class hall {

  public static async findAll() {
    return await Hall.findAll({})
  }

  public static async findOne(id: any) {
    return await Hall.findOne({ where: { id } })
  }

  public static async Create(all: any) {
    return await Hall.create(all)
  }

  public static async Update(updated: any, query: any) {
    return await Hall.update(updated, query)
  }

  public static async Destroy(deleted: any) {
    return await Hall.destroy(deleted)
  }

  public static async findOneUser(id: any) {
    return await Area.findOne({ where: { id } })
  }

  public static async bulkCreateWithDateRange(hallDetails: any, days: number) {
    const { capacity, category, floor, amount, areaId, userId, date } = hallDetails;

    // Create an array to store hall details for each date and session
    const hallDetailsArray = [];
    const start = new Date(date);

    // Validate the start date
    if (isNaN(start.getTime())) {
        throw new Error(`Invalid startDate: ${date}`);
    }

    for (let i = 0; i < days; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i); 
        const formattedDate = currentDate.toISOString().split("T")[0];
        hallDetailsArray.push(
            {
                capacity,
                category:"Simple",
                date: formattedDate,
                floor:"First",
                amount,
                areaId,
                userId,
                session: "Morning"
            },
            {
                capacity,
                category:"Simple",
                date: formattedDate,
                floor:"First",
                amount,
                areaId,
                userId,
                session: "Evening"
            },
            {
              capacity,
              category:"Premium",
              date: formattedDate,
              floor:"Second",
              amount,
              areaId,
              userId,
              session: "Morning"
          },
          {
              capacity,
              category:"Premium",
              date: formattedDate,
              floor:"Second",
              amount,
              areaId,
              userId,
              session: "Evening"
          }
        );
    }

    return await Hall.bulkCreate(hallDetailsArray);
}

}


