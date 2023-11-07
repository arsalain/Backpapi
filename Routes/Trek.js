import express from "express";
import {
    createTrek,
    getTrekrecom,
    getTreks,
    getTreklong,
    getTrekshort,
    getTrekwaterfall,
    getTrekById,
    updateTrekById,
    getTreksall
} from "../Controllers/trek.js"
import {upload } from "../Middleware/upload.js"
const router = express.Router();


router.post("/createtrek", upload.fields([
    { name: 'testimage' },
    { name: 'lead1pimg' },
    { name: 'lead2pimg' },
    // Repeat this pattern for as many days as you support, the example shows up to dayImage[9]
    ...Array.from({ length: 10 }, (_, i) => ({ name: `dayImage[${i}]` })),
    // Similar for related images
    ...Array.from({ length: 3 }, (_, i) => ({ name: `relatedImage[${i}]` })),
  ]),createTrek);
router.patch("/updatetrek/:id",upload.fields([{name: 'testimage'},{name: 'lead1pimg'}, {name: 'lead2pimg'}, { name: 'dayImage[0]' },  { name: 'dayImage[1]' },  { name: 'dayImage[2]' },  { name: 'dayImage[3]' },  { name: 'dayImage[4]' },  { name: 'dayImage[5]' },  { name: 'dayImage[6]' },  { name: 'dayImage[7]' },  { name: 'dayImage[8]' },  { name: 'dayImage[9]' },  { name: 'relatedImage[0]' },  { name: 'relatedImage[1]' },  { name: 'relatedImage[2]' }]  ),updateTrekById);
router.get("/:id",getTrekById)
router.get("/",getTreksall)
router.get("/gettreks",getTreks)
router.get("/gettrekrecom",getTrekrecom)
router.get("/gettreklong",getTreklong)
router.get("/gettrekshort",getTrekshort)
router.get("/gettrekwaterfall",getTrekwaterfall)

export default router;