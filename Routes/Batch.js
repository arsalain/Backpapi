import express from "express";
import { addbatch } from "../Controllers/batch.js";

const router = express.Router();

router.post("/:id",addbatch)


export default router;