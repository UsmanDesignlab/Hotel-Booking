import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';



export async function isLoggedIn(req:any, res: Response, next: NextFunction) {
  if (!req.cookies.token) {
    return res.status(401).send("You are not logged in");
  }
  try {
    const data: any = jwt.verify(req.cookies.token, "secret");
    req.user = data; 
    // This sets the user data, including role
    
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}



export function isOwner(req: any, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Owner') {
    return res.status(403).send("Forbidden: Owner only");
  }
  next();
}

export function isClient(req: any, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Client') {
    return res.status(403).send("Forbidden:Client only");
  }
  next();
}
