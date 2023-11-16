import express from "express";
import {upload } from "../Middleware/upload.js"
import { createBlog, getBlogByName } from "../Controllers/blog.js";
const router = express.Router();

router.post("/createblog",upload.fields([  ...Array.from({ length: 10 }, (_, i) => ({ name: `blogImage[${i}]` })) ] ),createBlog);
router.get("/:name",getBlogByName)

export default router;