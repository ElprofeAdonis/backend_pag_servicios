import express from "express";
import usuario from "../controllers/usuario";

const router = express.Router();

router.get("/tweetss", usuario.getTweetss);

router.post("/tweet/:id_t", usuario.joinTweets);

// router.post("/my-tweetss", usuario.getMyTweetss);

module.exports = router;
