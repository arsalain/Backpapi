import express from "express";
import {
    createTrek,
    getTrekrecom,
    getTreks,
    getTreklong,
    getTrekshort,
    getTrekwaterfall,
    getTrekById,
    updateTrekById
} from "../Controllers/trek.js"
import {upload } from "../Middleware/upload.js"
const router = express.Router();


router.post("/createtrek",upload.fields([{name: 'testimage'}, { name: 'image' }] ),createTrek);
router.put("/updatetrek/:id",upload.fields([{name: 'testimage'}, { name: 'coverimage' }, {name : "planimg1"}, {name : "planimg2"}, {name : "planimg3"}, {name : "planimg4"}, {name : "planimg5"}, {name : "planimg6"}, {name : "planimg7"}, {name : "planimg8"}, {name : "planimg9"}, {name : "planimg10"},{name : "similarimg1"} , {name : "similarimg2"}, {name : "similarimg3"},{name : "reviewimg1"} , {name : "reviewimg2"}, {name : "reviewimg3"}      ] ),updateTrekById);
router.get("/:id",getTrekById)
router.get("/gettreks",getTreks)
router.get("/gettrekrecom",getTrekrecom)
router.get("/gettreklong",getTreklong)
router.get("/gettrekshort",getTrekshort)
router.get("/gettrekwaterfall",getTrekwaterfall)

export default router;