import { Request, Response, NextFunction } from "express"
import users from "./User.service";
import { Email } from "./user.emailmodel";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendEmail } from "./User.email";


export const send = async (req: any, res: Response) => {
  try {
    const { email } = req.body;
    const existingUser = await Email.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    
    const link = `http://localhost:4000/api/register?token=${token}`;

    await sendEmail(email, 'Verify Your Email', `Please verify your email by clicking on this link: ${link}`);

    res.status(201).json({ message: 'Verification email sent.', link });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const userRegister = async (req: Request, res: Response) => {
  try {
    const { username, password, role, phoneNumber } = req.body;
    const token = req.query.token as string;
    if (!token) {
      return res.status(400).json({ message: "Token is missing from the request" });
    }
    const decodedToken: any = jwt.verify(token, "secret");
    const email = decodedToken.email; // Get the email from the token
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await users.AllCreates({
      email,
      username,
      password: hashedPassword,
      role,
      phoneNumber,
    });

    // Generate a token for the user after registration
    const userToken = jwt.sign({ id: newUser.id }, "secret", { expiresIn: "4h" });
    res.cookie("token", userToken);
    res.status(201).json({ message: "User registered successfully", token: userToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred during registration" });
  }
};

// User login
export const loginRegister = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne(email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, "secret", { expiresIn: "4h" });
    res.cookie("token", token);
    //${link}?token=${jwt}
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
export const userLogout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred during logout" });
  }
};

