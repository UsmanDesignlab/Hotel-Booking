import { Request, Response } from "express";
import BookingArea from "./bookingService";



export const all = async (req: Request, res: Response) => {
  try {
    const data = await BookingArea.findALL();
    if (!data) {
      return res.status(404).json({ message: "No Hotel found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};  

export const oneAll = async (req: Request, res: Response) => {
  try {
    let {areaId} = req.params
    const booking = await BookingArea.find({where:{areaId}})
    if (!booking) { 
      return res.status(404).json({ message: "No Halls" });
    }
    res.status(200).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
}; 