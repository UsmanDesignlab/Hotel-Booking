import express from "express";
import { one, all } from "./booking.controller"




const router = express.Router({ mergeParams: true });

router.get("/:id", one);
router.get("/", all);

export default router;  