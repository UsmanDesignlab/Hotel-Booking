import express from "express";
import { all, one, add, update, destroy,allHotel } from "./hotel.controller";
import { isOwner,isLoggedIn } from "../../helper/isloggedIn";



const router = express.Router({ mergeParams: true });

router.get("/all",allHotel)
router.get("/", all);
router.get("/:id", one);
router.post("/",isLoggedIn,isOwner, add);
router.patch('/:id',isLoggedIn,isOwner,update)
router.delete("/:id",isLoggedIn,isOwner,destroy)

export default router;