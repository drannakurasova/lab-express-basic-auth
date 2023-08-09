const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//STEP 1. CONNECTING INDEX TO AUTH.ROUTES and shortening the /-name
const authRouter = require("./auth.routes.js")
router.use ("/auth", authRouter)

const userRouter = require ("./user.routes.js")
router.use("/user", userRouter)

module.exports = router;
