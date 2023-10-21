import express from "express";
import {
    createTour,
    getTours,
    getTourrecom,
    getTourlong,
    getTourweekend,
    getTourById
} from "../Controllers/tour.js"
import {upload } from "../Middleware/upload.js"
const router = express.Router();

router.post("/createtour",upload.fields([{name: 'testimage'}, { name: 'coverimage' }, {name : "planimg1"}, {name : "planimg2"}, {name : "planimg3"}, {name : "planimg4"}, {name : "planimg5"}, {name : "planimg6"}, {name : "planimg7"}, {name : "planimg8"} , {name : "planimg9"}, {name : "planimg10"},{name : "similarimg1"} , {name : "similarimg2"}, {name : "similarimg3"} ,{name : "reviewimg1"} , {name : "reviewimg2"}, {name : "reviewimg3"}   ] ),createTour);
router.put("/updatetour/:id",upload.fields([{name: 'testimage'}, { name: 'coverimage' }, {name : "planimg1"}, {name : "planimg2"}, {name : "planimg3"}, {name : "planimg4"}, {name : "planimg5"}, {name : "planimg6"}, {name : "planimg7"}, {name : "planimg8"}, {name : "planimg9"}, {name : "planimg10"},{name : "similarimg1"} , {name : "similarimg2"}, {name : "similarimg3"},{name : "reviewimg1"} , {name : "reviewimg2"}, {name : "reviewimg3"}      ] ),getTourById);
router.get("/gettours",getTours)
router.get("/gettourrecom",getTourrecom)
router.get("/gettourlong",getTourlong)
router.get("/gettourweekend",getTourweekend)

export default router;