const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({
        users: users,
      });
    })
    .catch((err) => {
      res.status(404).json({
        error: "No users found!",
      });
    });
});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(404).json({
      error: "No user found!",
    });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({
      error: "unauthorized user!",
    });
  }
  const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
  res.header("auth-token", token);
  res.status(200).send({
    token: token,
  });
});

router.post("/signup", (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  bcrypt
    .hash(password, 10)
    .then((hashedPass) => {
      User.create({
        name: fullName,
        email: email,
        phone: phone,
        password: hashedPass,
      })
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) =>
          res.status(204).json({
            error: err,
          })
        );
    })
    .catch((err) =>
      res.status(204).json({
        error: err,
      })
    );
});

module.exports = router;
