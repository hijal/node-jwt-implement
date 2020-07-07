const router = require("express").Router();
const auth = require("../validate/auth");

const todos = [
  {
    userId: 1,
    id: 1,
    title: " I have to have experience ",
    completed: true,
  },
  {
    userId: 1,
    id: 2,
    title: " Truth resultant choices  ",
    completed: true,
  },
];
router.get("/", auth, (req, res, next) => {
  res.json({
    todos: todos,
    user: req.user,
  });
});

module.exports = router;
