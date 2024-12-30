import { Request, Response } from "express";
import allHotel from "./all.service";
import { hallOne } from "../HallDetails/halldetails.controller";


export const one = async (req: Request, res: Response) => {
  try {
    let {id:userId} = req.params 
    const data = await allHotel.findAll(userId);
    if (!data) {
      return res.status(404).json({ message: "No Hotel found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};  

export const all = async (req: Request, res: Response) => {
  try {
    if (!hallOne) { 
      return res.status(404).json({ message: "No available halls found" });
    }
    res.status(200).json(hallOne);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};    