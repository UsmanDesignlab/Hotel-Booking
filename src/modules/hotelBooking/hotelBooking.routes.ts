import express from "express";
import { all, one, add, update, destroy } from "./hotelBooking.controller";
import { isClient,isLoggedIn } from "../../helper/isloggedIn";



const router = express.Router({ mergeParams: true });

router.get("/", all);
router.get("/:id", one);
router.post("/",isLoggedIn,isClient, add);
router.patch('/:id',isLoggedIn,isClient,update)
router.delete("/:id",isLoggedIn,isClient,destroy)

export default router;