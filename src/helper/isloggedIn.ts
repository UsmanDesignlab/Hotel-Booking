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



export function isAdmin(req: any, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).send("Forbidden: Admins only");
  }
  next();
}

export function isUser(req: any, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'User') {
    return res.status(403).send("Forbidden: Staff only");
  }
  next();
}
