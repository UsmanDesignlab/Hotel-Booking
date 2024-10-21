import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import hotel from "./hotel.server";
import { sendEmail } from "./hotel.email";



export const all = async (req: Request, res: Response) => {
  try {
    const data = await hotel.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Patient found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await hotel.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const add = async (req:any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    console.log(decoded)
    req.user = decoded;
    console.log(req.user.email)



    if (decoded) {
      const { hotelName, phoneNumber,capacity,location,category,amount,availableDate,session} = req.body;
 

      const existingDoctor = await hotel.findOneOne(req.user.id);
      if (existingDoctor) {
        return res.status(409).json({ message: "Hotel Already Exists" });
      }
    

      // Create new doctor entry
      const newDoctor = await hotel.AllCreates({
        hotelName,
        phoneNumber,
        location,
        capacity,
        category,
        session,
        availableDate,
        amount,
        userId: req.user.id
      });
      

      if (decoded.email)  
       {
        const subject = `Welcome to the Registration for Hotel ${newDoctor.hotel_Name}`;
        const text = `You have successfully registered as a Hotel.\n
          PhoneNumber: ${newDoctor.phoneNumber}\n
          location: ${newDoctor.location}\n
          category: ${newDoctor.category}\n
          `;

    
        try {
          await sendEmail(decoded.email, subject, text);
        } catch (emailErr) {
          console.error('Failed to send email:', emailErr);
          return res.status(500).json({ message: "Failed to send email" });
        }
      } else {
        return res.status(400).json({ message: "User email is not available" });
      }

      // Return successful response
      return res.status(201).json(newDoctor);
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const update = async (req: Request, res: Response) => {
  try {
    let {hotelName,phoneNumber,location,capacity,category,availableDate,amount,session} = req.body;
    const { id } = req.params;

    const data = await hotel.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const updated = await hotel.Update(
      { hotelName, phoneNumber,location,capacity,category,session,availableDate,amount},
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update Hotel" });
    }

    res.status(200).json({ message: "Hotel updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await hotel.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const deleted = await hotel.Destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Hotel to delete event" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export const allPatient = async (req: any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
       let User = await hotel.findOneUser(req.user.id)
       if(!User){
        return res.status(401).json({message:"No User found"})
      }
        let Patient = await hotel.findOnePatient(req.user.id)
      if(!Patient){
        return res.status(401).json({message:"NO DATA AVAILABLE"})
      }


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};