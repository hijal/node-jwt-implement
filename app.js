const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/connection");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

app.use("/", postRoutes);
app.use("/users", userRoutes);

const port = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("server listen on port ", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
