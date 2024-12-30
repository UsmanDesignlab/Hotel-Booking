import express from "express";
import {all,oneAll} from "./bookingArea.controller"




const router = express.Router({ mergeParams: true });

router.get("/", all);
router.get("/:id", oneAll);

export default router;  