import { Request, Response } from "express";
import hall from "./halldetails.service";

interface Hall {
  id: number;
  capacity: number;
  date: string;
  amount: number;
  areaId: number;
  userId: string;
  isAvailable: boolean;
  session?: string;
}

let hallOne: Hall[] = [];
let currentId = 1;

export const add = async (req: any, res: Response) => {
  try {
    let { capacity, amount, areaId, userId, date, session } = req.body;

    const areaExists = await hall.findOneUser(areaId);
    if (!areaExists) {
      return res.status(404).json({ message: "Area not found" });
    }


    if (session === "Morning" || session === "Both") {
      hallOne.push({
        id: currentId++,
        capacity,
        date,
        session: "Morning",
        amount,
        areaId,
        userId: req.user.id,
        isAvailable: true,
      });
    }
    if (session === "Evening" || session === "Both") {
      hallOne.push({
        id: currentId++,
        capacity,
        date,
        session: "Evening",
        amount,
        areaId,
        userId: req.user.id,
        isAvailable: true,
      });
    }

    const days = 7;
    const start = new Date(date);

    for (let i = 1; i <= days; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      const formattedDate = currentDate.toISOString().split("T")[0];

      if (session === "Morning" || session === "Both") {
        hallOne.push({
          id: currentId++,
          capacity,
          date: formattedDate,
          session: "Morning",
          amount,
          areaId,
          userId: req.user.id,
          isAvailable: true,
        });
      }
      if (session === "Evening" || session === "Both") {
        hallOne.push({
          id: currentId++,
          capacity,
          date: formattedDate,
          session: "Evening",
          amount,
          areaId,
          userId: req.user.id,
          isAvailable: true,
        });
      }
    }

    res.status(201).json({
      message: `Hall details added successfully for today and the next ${days} days.`,
      data: hallOne,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export { hallOne };
