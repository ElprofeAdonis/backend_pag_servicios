import pool from "../database/keys";

const usuario = {};

// usuario;
usuario.getTweetss = async (req, res) => {
  try {
    const tweetss = await (
      await pool.query("SELECT * FROM superusuariovstweets")
    ).rows;
    res.status(200).json(tweetss);
  } catch (error) {
    res.status(500).json({
      messaage: "Algo salio mal getTweets",
      error,
    });
  }
};

// muestra  la union usuarios con los comentarios
usuario.joinTweets = async (req, res) => {
  const id = req.body.id;
  const id_t = req.params.id_t;
  try {
    await pool.query("INSERT INTO uservstweets VALUE ($1, $2)", [id, id_t]);
    res.status(200).json({
      message: "You joinnes the Tweets",
      tweets: { id_t },
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo salio aml",
      error,
    });
  }
};

// usuario.getMyTweets = async (req, res) => {
//   const id = req.body.id;
//   try {
//     const tweets = await (
//       await pool.query(
//         "SELECT * FROM superusuariovstweets JOIN uservstweets ON id_t=t_id"
//       )
//     ).rows;
//     res.status(200).json(tweets);
//   } catch (error) {
//     res.status(500).json({
//       message: "Al solio mal",
//       error,
//     });
//   }
// };

module.exports = usuario;
