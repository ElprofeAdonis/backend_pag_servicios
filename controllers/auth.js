import pool from "../database/keys";

const authentication = {};

authentication.signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (role == "superusuario") {
    try {
      await pool.query(
        "INSERT INTO superusuario (s_name, s_email, s_password) VALUES ($1, $2, $3)",
        [name, email, password]
      );
      res.status(200).json({
        message: "Muy bien super usuario creado",
        superusuario: { name, email, password },
      });
    } catch (error) {
      if (error.constraint == "superusuario_s_email_key") {
        res.status(500).json({
          message: "El correo digitado ya es parte de un SuperUsuario",
          error,
        });
      } else {
        res.status(500).json({
          message:
            "Hola Adonis no te rindas Dios esta contigo el error pasara animo",
          error,
        });
      }
    }
  } else {
    try {
      await pool.query(
        "INSERT INTO usuario (u_name, u_email, u_password) VALUES ($1, $2, $3)",
        [name, email, password]
      );
      res.status(200).json({
        message: "Muy bien lo se a creado un Usuario",
        usuario: { name, email, password },
      });
    } catch (error) {
      if (error.constraint == "usuario_u_email_key") {
        res.status(500).json({
          message: "El correo digitado ya es parte de un Usuario",
          error,
        });
      } else {
        res.status(500).json({
          message:
            "Hola Adonis no te rindas Dios esta contigo el error pasara animo",
          error,
        });
      }
    }
  }
};

authentication.singIn = async (req, res) => {
  const { email, password, role } = req.body;
  if (role == "superusuario") {
    try {
      const superusuario = await (
        await pool.query(
          "SELECT * FROM superusuario WHERE s_email=$1 AND s_password=$2",
          [email, password]
        )
      ).rows;
      if (superusuario.length > 0) {
        res.status(200).json({
          id: superusuario[0].id_s,
          name: superusuario[0].s_name,
          email: superusuario[0].s_email,
          role: "superusuario",
        });
      } else {
        res.status(200).json({
          message: "El SuperUsuario fue creado con existe",
          NotFound: true,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ha ocurrido un error",
      });
    }
  } else {
    try {
      const usuario = await (
        await pool.query(
          "SELECT * FROM usuario WHERE u_email=$1 AND u_password=$2",
          [email, password]
        )
      ).rows;
      if (usuario.length > 0) {
        res.status(200).json({
          id: usuario[0].id_u,
          name: usuario[0].u_name,
          email: usuario[0].u_email,
          role: "usuario",
        });
      } else {
        res.status(200).json({
          message: "El Usuario no existe",
          NotFound: true,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ha ocurrido un error",
      });
    }
  }
};
module.exports = authentication;
