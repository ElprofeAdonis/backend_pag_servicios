import express from "express";
import authentication from "../controllers/auth";
const router = express.Router();

router.post("/signup", authentication.signUp);

router.post("/signin", authentication.singIn);

module.exports = router;
