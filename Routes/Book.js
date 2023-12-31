import express from "express";
import { initiatepayment, savepayment, verifypayment } from "../Controllers/Book.js";

const router = express.Router();

router.post("/initiatePayment",initiatepayment)
router.post("/verifyPayment",verifypayment)
router.post("/savePayment",savepayment)

export default router;