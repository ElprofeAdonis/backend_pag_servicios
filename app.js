import express from "express";
import morgan from "morgan";
import cors from "cors";
import history from "connect-history-api-fallback";
//fucniona para llmar el html
import path from "path";

const app = express();

//Middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.use("/", require("./routes/auth.routes"));
app.use("/superusuario", require("./routes/superusuario.routes"));
app.use("/usuario", require("./routes/usuario.routes"));
//Middlewares
app.use(history());
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

// Setting
app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), () =>
  console.log(`🚀 Example app listening on port ` + app.get("port"))
);
