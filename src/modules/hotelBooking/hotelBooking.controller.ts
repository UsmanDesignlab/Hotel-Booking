import { Request, Response } from "express";
import appointment from "./hotelBooking.server";
import { Hotel } from "../Hotel/hotel.Model";


export const all = async (req: Request, res: Response) => {
  try {
    const data = await appointment.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Appointments found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    let {id} =req.params
    const data = await appointment.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "hotel not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const add = async (req: any, res: Response) => {
  try {
      let {name,phoneNumber,bookingDate,amount,hotelId} = req.body;

      const one = await appointment.findOneDoctor(hotelId)
      if (!one) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const data = await appointment.Create({
         name:name,
         phoneNumber:phoneNumber,
         bookingDate:bookingDate,
         amount:amount,
         hotelId:hotelId,
         userId:req.user.id
      });
      
      const existingBooking = await appointment.findOne({
        where: { hotelId },
      });
  
      if (existingBooking) {
        return res.status(400).json({ message: "This hotel is already booked by another user" });
      }
      res.status(201).json(data);
    }
   catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const update = async (req: Request, res: Response) => {
  try {
    let {name,phoneNumber,bookingDate,amount,hotelId} = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing id parameter" });
    }

    const data = await appointment.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const one = await appointment.findOneDoctor(hotelId)
    if (!one) {
      return res.status(404).json({ message: "doctor not found" });
    }


    const updated = await appointment.Update(
      {name,phoneNumber,bookingDate,amount,hotelId},
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update event" });
    }

    res.status(200).json({ message: "Appointment updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await appointment.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const deleted = await appointment.destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete event" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};
