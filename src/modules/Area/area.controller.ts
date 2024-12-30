import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import area from "./area.service";


export const all = async (req: Request, res: Response) => {
  try {
    const data = await area.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Area found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await area.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: " Area not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const add = async (req: any, res: Response,imagePath:any) => {
  try {
       let { area:loc,locationId} = req.body;
      const one = await area.findOneUser(locationId)
      if(!one){
        return res.status(404).json({ message: "Location not found" });
      }
      const data = await area.Create({
        area:loc,
        locationId:locationId,
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
    let { locationId,area:loc} = req.body;
    const { id } = req.params;

    const data = await area.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Area not found" });
    }

    const one = await area.findOneUser(locationId)
      if(!one){
        return res.status(404).json({ message: "Location not found" });
      }
    
    const updated = await area.Update(
      {locationId,area:loc},
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update Area" });
    }

    res.status(200).json({ message: "Area updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await area.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Area not found" });
    }

    const deleted = await area.Destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete Area" });
    }

    res.status(200).json({ message: "Event Area successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

