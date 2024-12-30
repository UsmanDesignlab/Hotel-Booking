import express from "express";
import { one,all} from "./all.controller"




const router = express.Router({ mergeParams: true });

router.get("/", all);
router.get("/:id", one);

export default router;  