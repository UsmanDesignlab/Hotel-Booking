import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import image from "./hotelImages.service";


export const all = async (req: Request, res: Response) => {
  try {
    const data = await image.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Diagnosis found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await image.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Images not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const add = async (req: any, res: Response,imagePath:any) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
    if (decoded) {
      let {hotelImages} = req.body;
      if(req.file){
        imagePath=req.file.path
      }
    }
      const data = await image.AllCreates({
         hotelImages:imagePath,
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
    let {hotelImages} = req.body;
    const { id } = req.params;

    const data = await image.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "diagnosis not found" });
    }
      if(req.file){
        imagePath=req.file.path
      }

    const updated = await image.Update(
      { hotelImages:imagePath},
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update images" });
    }

    res.status(200).json({ message: "Images updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await image.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Images not found" });
    }

    const deleted = await image.Destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete event" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

