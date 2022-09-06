import express from "express";
import superusuario from "../controllers/superusuario";

const router = express.Router();

router.post("/tweets", superusuario.createTweets);

router.get("/tweets/:id_t", superusuario.readTweets);

router.put("/tweets/:id_t", superusuario.updateTweets);

router.delete("/tweets/:id_t", superusuario.deleteTweets);

// Muestra todos los tweets que puedad tener el superusuario
router.post("/my-tweets", superusuario.getTweets);

//Comentarios al tweets
router.post("/comentario/:id_t", superusuario.createComentario);

router.get("/tweets-comentario/:id_t", superusuario.getComentario);

module.exports = router;
