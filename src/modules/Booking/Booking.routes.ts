import express from "express";
import { all, one, add, update, destroy, allDoctor } from "./Booking.controller";
import { isUser } from "../../helper/isloggedIn";

const router = express.Router({ mergeParams: true });


router.get("/all", allDoctor);
router.get("/", all);
router.get("/:id", one);
router.post("/", isUser, add);
router.patch('/:id', isUser, update)
router.delete("/:id", isUser, destroy)

export default router;