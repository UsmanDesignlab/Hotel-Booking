import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import location from "./location.service";


export const all = async (req: Request, res: Response) => {
  try {
    const data = await location.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Location found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await location.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: " Location not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const add = async (req: any, res: Response,imagePath:any) => {
  try {
       let { location:loc,hotelId} = req.body;
      const one = await location.find(hotelId)
      if(!one){
        return res.status(404).json({ message: "hotel not found" });
      }
      const data = await location.Create({
        location:loc,
        hotelId:hotelId,
        userId:req.user.id
      });

      res.status(201).json(data);
    }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const update = async (req: Request, res: Response,imagePath:any) => {
  try {
    let { location:loc,hotelId} = req.body;
    const { id } = req.params;

    const data = await location.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const one = await location.find(hotelId)
      if(!one){
        return res.status(404).json({ message: "Hotel not found" });
      }
    
    const updated = await location.Update(
      {location:loc,hotelId},
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update event" });
    }

    res.status(200).json({ message: "Location updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await location.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Location not found" });
    }

    const deleted = await location.Destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete Location" });
    }

    res.status(200).json({ message: "Event Location successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

