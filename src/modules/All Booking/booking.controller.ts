import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import allBooking from "./booking.service";


export const one = async (req: Request, res: Response) => {
  try {
    // Yes Changes
    let {id:userId} = req.params 
    const data = await allBooking.findOne(userId);
    if (!data) {
      return res.status(404).json({ message: "No Booking found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export const all = async (req: Request, res: Response) => {
  try {
    const data = await allBooking.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Booking found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


