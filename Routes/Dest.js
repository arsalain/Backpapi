import express from "express";
import {upload } from "../Middleware/upload.js"
import { createDest, deleteDest, getDestByName, updateDestByName } from "../Controllers/dest.js";
const router = express.Router();


router.post("/createdest",upload.fields([{name: 'coverimage'},{name: 'blogimage1'}, {name: 'blogimage2'},{name: 'blogimage3'} ] ),createDest);
router.patch("/updatedest/:name",upload.fields([{name: 'coverimage'},{name: 'blogimage1'}, {name: 'blogimage2'},{name: 'blogimage3'}]  ),updateDestByName);
router.get("/:name",getDestByName)
router.delete("/:name",deleteDest)


export default router;