import express from "express";
import {
    createTour,
    getTours,
    getTourrecom,
    getTourlong,
    getTourweekend
} from "../Controllers/tour.js"
import {upload } from "../Middleware/upload.js"
const router = express.Router();

router.post("/createtour",upload.single('testimage'),createTour);
router.get("/gettours",getTours)
router.get("/gettourrecom",getTourrecom)
router.get("/gettourlong",getTourlong)
router.get("/gettourweekend",getTourweekend)

export default router;