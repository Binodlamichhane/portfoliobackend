import express from "express";
import { getBlog, postBlog,getComment,postComment } from "../controllers/blogController.js";
import { verifytoken } from "../middleware/verifytoken.js";
const router =express.Router();
router.route("/").get(getBlog).post(postBlog);
router.route('/comment').post(verifytoken, postComment);
router.route('/comment/:id').get(getComment);
export default router;
