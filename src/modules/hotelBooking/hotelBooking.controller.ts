import { Request, Response } from "express";
import booking from "./hotelBooking.server";
import { hallOne } from "../HallDetails/halldetails.controller";

export const all = async (req: Request, res: Response) => {
  try {
    const data = await booking.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Booking found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export const one = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await booking.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export const add = async (req: any, res: Response) => {
  try {
    const { name, phoneNumber, bookingDate, amount, hallId } = req.body;

    // Find the hall by hallId
    const hall = hallOne.find(h => h.id === hallId);
    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }

      // const existingBooking = await booking.findTwo(hallId);
      // if (existingBooking) {
      //   return res.status(400).json({ message: "This hall is already booked" });
      // }

    // Create a new booking entry
    const bookingEntry = await booking.Create({
      name,
      phoneNumber,
      bookingDate,
      amount,
      hallId,
      userId: req.user.id,
    });

    hall.isAvailable = false;

    res.status(201).json({
      message: "Booking successful",
      data: bookingEntry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { name, phoneNumber, bookingDate, amount, hallId } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing id parameter" });
    }

    const data = await booking.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const hall = hallOne.find(h => h.id === hallId);
    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    const updated = await booking.Update(
      { name, phoneNumber, bookingDate, amount, hallId },
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update booking" });
    }

    res.status(200).json({ message: "Booking updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the booking", error: err });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await booking.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.destroy({ where: { id } });

    // Optionally, mark the hall as available again
    const hall = hallOne.find(h => h.id === eventToDelete.hallId);
    if (hall) {
      hall.isAvailable = true;
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};
