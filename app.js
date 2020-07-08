const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/connection");
const morgan = require("morgan");
const cors = require('cors')

const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//       return res.status(200).json({});
//   }
//   next();
// });

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



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
