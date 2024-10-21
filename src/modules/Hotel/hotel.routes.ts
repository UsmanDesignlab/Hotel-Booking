import express from "express";
import { all, one, add, update, destroy,allPatient } from "./hotel.controller";
import { isAdmin } from "../../helper/isloggedIn";



const router = express.Router({ mergeParams: true });

router.get("/all",allPatient)
router.get("/", all);
router.get("/:id",isAdmin, one);
router.post("/",isAdmin, add);
router.patch('/:id',isAdmin,update)
router.delete("/:id",isAdmin,destroy)

export default router;