import express from "express";
import {
    createTrek,
    getTrekrecom,
    getTreks,
    getTreklong,
    getTrekshort,
    getTrekwaterfall
} from "../Controllers/trek.js"
import {upload } from "../Middleware/upload.js"
const router = express.Router();

router.post("/createtrek",upload.single('testimage'),createTrek);
router.get("/gettreks",getTreks)
router.get("/gettrekrecom",getTrekrecom)
router.get("/gettreklong",getTreklong)
router.get("/gettrekshort",getTrekshort)
router.get("/gettrekwaterfall",getTrekwaterfall)

export default router;