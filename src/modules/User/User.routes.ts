import express from "express";
import {loginRegister ,userRegister,userLogout,send} from "./User.controller";



const router = express.Router({ mergeParams: true });

router.post("/email",send)
router.post("/register",userRegister)
router.post("/logout",userLogout)
router.post("/login",loginRegister)




export default router;
