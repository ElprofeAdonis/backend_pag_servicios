import { json } from "express";
import pool from "../database/keys";

const superusuario = {};
// Comentarios

superusuario.createTweets = async (req, res) => {
  const { id, t_comentario, t_foto } = req.body;
  try {
    await pool.query(
      "INSERT INTO tweets (t_id, t_comentario, t_foto) VALUES ($1, $2, $3)",
      [id, t_comentario, t_foto]
    );
    res.status(200).json({
      message: "Se creo el tweets con exito",
      tweets: {
        id,
        t_comentario,
        t_foto,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo salio mal",
      error,
    });
  }
};

superusuario.readTweets = async (req, res) => {
  const id = req.params.id_t;
  try {
    const tweets = await await pool.query(
      "SELECT * FROM tweets WHERE id_t=$1",
      [id]
    );
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).json({
      message: "A ocurrido un error",
      error,
    });
  }
};

superusuario.updateTweets = async (req, res) => {
  const id = req.params.id_t;
  const { t_comentario, t_foto } = req.body;
  try {
    await pool.query(
      "UPDATE tweets SET t_comentario$1, t_foto$2 WHERE id_t=$3",
      [t_comentario, t_foto, id],
      res.status(200).json({
        message: "Todo se actualiso con exito",
        tweets: [t_comentario, t_foto],
      })
    );
  } catch (error) {
    res.status(500).json({
      message: "Algo salio mal",
      error,
    });
  }
};

superusuario.deleteTweets = async (req, res) => {
  const id = req.params.id_t;
  try {
    await pool.query("DELETE FROM tweets WHERE id_t=$1", [id]);
    res.status(200).json({
      message: "Se elimino con exito el tweets",
    });
  } catch (error) {
    res.status(500).json({
      message: "Un error a ocurrido",
      error,
    });
  }
};

superusuario.getTweets = async (req, res) => {
  const { id } = req.body;
  try {
    const tweets = await (
      await pool.query("SELECT * FROM tweets WHERE t_id=$1", [id])
    ).rows;
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({
      message: "Algo salio mal al mostrar los tweets",
      error,
    });
  }
};

//comentario al tweets
superusuario.createComentario = async (req, res) => {
  const id_t = req.params.id_t;
  const { c_comentario, c_foto } = req.body;
  try {
    await pool.query(
      "INSERT INTO comentario (t_id, c_comentario, c_foto) VALUES ($1, $2, $3)",
      [id_t, c_comentario, c_foto]
    );
    res.status(200).json({
      message: "El comentario de asigno con exito",
      comentario: { c_comentario, c_foto },
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo salio mal",
      error,
    });
  }
};

superusuario.getComentario = async (req, res) => {
  const id_t = req.params.id_t;
  try {
    const comentario = await (
      await pool.query("SELECT * FROM comentario WHERE t_id=$1", [id_t])
    ).rows;
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({
      message: "Algo salio mal",
      error,
    });
  }
};

module.exports = superusuario;
